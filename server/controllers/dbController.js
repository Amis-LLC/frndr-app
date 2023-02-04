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
    console.log("add hangout...");
    return next(); // TBD
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
  addUser: (req, res, next) => {
    // `` is used in order to make query flexible, single quotes don't wrap seemlesly for queries.
    let locationref;
  
    const addUsersLocationQuery = `INSERT INTO Locations (location) VALUES ('${req.body.location}') RETURNING _id;`

    db.query(addUsersLocationQuery, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUser middleware",
          message: { err: "An error occurred while adding location" },
        })
      }
      res.locals.location = data.rows[0]._id;
      locationRef = Number(data.rows[0]._id);
      return next();
    })

    
    const userOnlyTable = `INSERT INTO Users ( firstName, lastName, phoneNumber, email, userName, password, locationRef)
    VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.phoneNumber}', '${req.body.email}', '${req.body.userName}', 
    '${req.body.password}', ${locationref});`

    db.query(userOnlyTable, null, (err, data) =>{
      if(err){
        next({
          log: "Express error handler caught in dbController.addUser middleware",
          message: { err: "An error occurred while adding user" },
        })
      }
      console.log('DATA IS : ', data);
      return next();
    })
  },
  /* input: req.params with user _id 
      req.params.id = NUMBER
     
     DELETE * FROM User WHERE _id = req.params.id 
     
     output: none
     return if successful, otherwise error
  */
  deleteUser: (req, res, next) => {
    console.log("delete user...");
    return next();
  },
  /* input: req.params with user _id 
      req.params.id = NUMBER
     
     SELECT * FROM User WHERE _id = req.params.id 
     
     Get all user info from joining the ids from user table

     output: res.locals.user
       response is the returned user info
       {_id, fname, lname, location, picture, phone_number, email, user_name, password}
  */
  getUserInfo: (req, res, next) => {
    console.log("get user info...");
    return next(); // TBD
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
