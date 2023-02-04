const db = require('../models/frndrDbModel.js');

/**
 * ************************************
 *
 * @module  index.js
 * @author  zahara-aviv
 * @date    2023-02-04
 * @description interface to SQL database for FRNDR app
 *
 * ************************************
 */

/*
Join Table:
Table: Hangout
  _id
  statusRef
  userRef
  locationRef
  pictureRef

Reference Tables:
Table: Statuses
  _id
  statusName

Table: Pictures
  _id
  Picture
  emojiString

Table: Location
  _id
  location

Table: User
  _id
  firstName
  lastName
  phoneNumber
  email
  userName
  password
  locationRef
  statusRef
  pictureRef
  hangoutRef

  EXAMPLE: get all hangouts from database
    SELECT h._id, u.firstName AS name, s.statusName status, l.location as location, p.emojiString as emoji
    JOIN User u ON h.userRef = u._id
    JOIN Statuses s ON h.statusRef = s._id 
    JOIN Pictures p ON h.pictureRef = p._id
    JOIN Location l ON h.locationRef = l._id;
    _id | name  |                   status                        |        location   | emoji  |
    -----+--------------------------------------------------------+-------------------+--------+
      1 | Tomas |           Let's hangout tonight!                | 41.40338, 2.17403 |  :)    |
      2 | Tammi |           Let's hangout tonight!                | 41.40338, 2.17403 |  ;)    |
*/
const dbController = {
  /* input: req.body has a hangout object
      {user_id, status, location, emoji}
     
     INSERT the DB-statuses with the status (if not already in the DB)
     INSERT the DB-location with location
     INSERT new hangout into DB-hangout table...

     output: res.locals.hangout
       response is an array of hangout objs 
      [{_id, name, status, location, emoji}, {...}]
  */
  addHangout: (req, res, next) => {
     const createHangoutQuery = `INSERT INTO Hangout (locationRef, statusRef, pictureRef, userRef) VALUES (${res.locals.location}, 
      ${res.locals.status}, ${res.locals.picture}, ${req.params.id}) RETURNING _id;`

      db.query(createHangoutQuery, null, (err, data) =>{
        if(err){
          next({
            log: "Express error handler caught in dbController.addHangout middleware",
            message: { err: "An error occurred while adding a hangout" },
          })
        }
       res.locals.hangoutId = Number(data.rows[0]._id);
       console.log('DATA IS : ', data);
        return next();
      })
  },

  getHangout: (req, res, next) => {
    const hangoutId = req.params.id || res.locals.hangoutId;
     const createHangoutQuery = `SELECT Locations.location, Statuses.statusname, Pictures.picture, Users.username
     FROM Hangout 
     JOIN Locations ON Hangout.locationRef = Locations._id 
     JOIN Statuses ON Hangout.statusRef = Statuses._id 
     JOIN Pictures ON Hangout. pictureRef = Pictures._id 
     JOIN Users ON Hangout.userRef = Users._id
     WHERE Hangout._id = ${hangoutId};`

      db.query(createHangoutQuery, null, (err, data) =>{
        if(err){
          next({
            log: "Express error handler caught in dbController.addHangout middleware",
            message: { err: "An error occurred while adding a hangout" },
          })
        }
       res.locals.hangout = data.rows[0];
       console.log('DATA IS : ', data);
        return next();
      })
  },

  /* input: req.params with hangout _id 
      req.params.id = NUMBER
     
     DELETE * FROM User WHERE _id = req.params.id 
     
     output: none
     return if successful, otherwise error
  */
  deleteHangout: (req, res, next) => {
    console.log("delete hangout...");
    return next();
  },
  /* input: req.body with user info object 
      {fname, lname, location, picture, phone_number, email, user_name, password}
     
     INSERT the location into loaction table, RETURNING id
     INSERT the picture into the picture table, RETURNING id !!! This may not be in the MVP
     UPSERT new user into DB-User (if already there, update) RETURNING *

     output: res.locals.user
       response is the returned user from upsertion ... may not need? 
  */

  addLocation: (req, res, next) => {
    const addUsersLocationQuery = `INSERT INTO Locations (location) VALUES ('${req.body.location}') RETURNING _id;`

    db.query(addUsersLocationQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUser middleware",
          message: { err: "An error occurred while adding location" },
        })
      }
      res.locals.location = Number(data.rows[0]._id);
      return next();
    })
  },

  addUsersLocation: (req, res, next) => {
    const addUsersStatusQuery = `UPDATE Users SET locationref = ${res.locals.location} WHERE _id = ${req.params.id};`
    db.query(addUsersStatusQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUsersLocation middleware",
          message: { err: "An error occurred while adding a location to a user" },
        })
      }
      return next();
    })
  },

  addPicture: (req, res, next) => {
    const addUsersPictureQuery = `INSERT INTO Pictures (picture) VALUES ('${req.body.picture}') RETURNING _id;`

    db.query(addUsersPictureQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addPicture middleware",
          message: { err: "An error occurred while adding a picture" },
        })
      }
      res.locals.picture = Number(data.rows[0]._id);
      return next();
    })
  },
  addUsersPicture: (req, res, next) => {
    const addUsersPictureQuery = `UPDATE Users SET pictureref = ${res.locals.picture} WHERE _id = ${req.params.id};`
    db.query(addUsersPictureQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUsersPicture middleware",
          message: { err: "An error occurred while adding a picture to a user" },
        })
      }
      return next();
    })
  },

  addStatus: (req, res, next) => {
    //need to update the status and then update the user
    const addUsersStatusQuery = `INSERT INTO Statuses (statusname) VALUES ('${req.body.status}') RETURNING _id;`

    db.query(addUsersStatusQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addStatus middleware",
          message: { err: "An error occurred while adding a status" },
        })
      }
      res.locals.status = Number(data.rows[0]._id);
      return next();
    })
  },

  addUsersStatus: (req, res, next) => {
    console.log('Adding this status number: ', res.locals.status)
    const addUsersStatusQuery = `UPDATE Users SET statusRef = ${res.locals.status} WHERE _id = ${req.params.id};`

    db.query(addUsersStatusQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUsersStatus middleware",
          message: { err: "An error occurred while adding a status to a user" },
        })
      }
      return next();
    })
  },
  addUser: (req, res, next) => {
    const userOnlyTable = `INSERT INTO Users ( firstName, lastName, phoneNumber, email, userName, password, locationRef)
    VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.phoneNumber}', '${req.body.email}', '${req.body.userName}', 
    '${req.body.password}', ${res.locals.location})  RETURNING _id;`

    db.query(userOnlyTable, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUser middleware",
          message: { err: "An error occurred while adding user" },
        })
      }
     res.locals.userId = Number(data.rows[0]._id);
     console.log('DATA IS : ', data);
      return next();
    })
  },
  deleteUser: (req, res, next) => {
    const deleteUserQuery = `DELETE FROM Users WHERE _id = ${req.params.id};`

    db.query(deleteUserQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.deleteUser middleware",
          message: { err: "An error occurred while deleting a user" },
        })
      }
      return next();
    })
  },

  getUserInfo: (req, res, next) => {
    let userId = req.params.id || res.locals.userId;
    const getUserQuery = `SELECT
    Users._id,
    Users.statusName,
    Users.firstName,
    Users.lastName,
    Users.phoneNumber,
    Users.email,
    Users.userName,
    Users.password,
    Locations.location,
    Statuses.statusname,
    Pictures.picture
  FROM
    Users
    LEFT JOIN Locations ON Users.locationRef = Locations._id
    LEFT JOIN Statuses ON Users.statusRef = Statuses._id
    LEFT JOIN Pictures ON Users.pictureRef = Pictures._id
  WHERE
    Users._id = ${userId};`

    db.query(getUserQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.getUserInfo middleware",
          message: { err: "An error occurred while getting user information" },
        })
      }
     // console.log('Here is all the info: ', data);
      res.locals.userData = data.rows[0];
      return next();
    })


  },
  /* input: req.body with 
      {user_name, password}
     
     SELECT * FROM User u WHERE u.name = name AND u.password = password

     output: res.locals.id set to found user _id from query
    
     NOTE: if successful redirect to getUserInfo route -> "api/user/${id}" see routes
  */
  verifyUser: (req, res, next) => {
    console.log("verifying user...");
    return next(); //TBD
  },
};

module.exports = dbController;
