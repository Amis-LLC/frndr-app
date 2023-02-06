const db = require("../models/frndrDbModel.js");

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
    const { location, status, picture } = res.locals;
    const { id } = req.params;
    const createHangoutQuery = `
    INSERT INTO Hangout (locationRef, statusRef, pictureRef, userRef) 
    VALUES ($1, $2, $3, $4) RETURNING _id;`;

    db.query(
      createHangoutQuery,
      [location, status, picture, id],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.addHangout middleware",
            message: { err: "An error occurred while adding a hangout" },
          });
        }
        res.locals.hangoutId = Number(data.rows[0]._id);
        //console.log("DATA IS : ", data);
        return next();
      }
    );
  },
  // update the association list of users to a hangout
  joinHangout: (req, res, next) => {
    const { _id, user_id } = req.body;
    //console.log("request body=", req.body);
    const getConnectionList = `
    SELECT connectionList FROM Hangout WHERE _id = $1`;
    db.query(getConnectionList, [_id], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.updateHangout middleware",
          message: { err },
        });
      }
      //console.log("DATA IS : ", data);
      let connectionList = user_id + ",";
      if (data.rows !== 0) {
        if (
          data.rows[0].connectionlist !== undefined &&
          data.rows[0].connectionlist !== null
        ) {
          if (data.rows[0].connectionlist.length !== 0) {
            connectionList = data.rows[0].connectionlist + user_id + ",";
          }
        }
      }
      // console.log("connectionList IS : ", connectionList);
      const updateConnectionList = `
        UPDATE Hangout SET 
        connectionList = $1
        WHERE Hangout._id = $2
        RETURNING *;`;
      db.query(updateConnectionList, [connectionList, _id], (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.updateHangout middleware",
            message: { err: "An error occurred while updating a hangout" },
          });
        }
        // console.log("DATA IS : ", data.rows[0]);

        res.locals.hangoutResponse = {
          _id,
          cl: String(data.rows[0].connectionlist),
        };
        return next();
      });
    });
  },
  // update the association list of users to a hangout
  leaveHangout: (req, res, next) => {
    const { _id, user_id } = req.body;
    const getConnectionList = `
      SELECT connectionList FROM Hangout WHERE _id = $1`;
    db.query(getConnectionList, [_id], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.updateHangout middleware",
          message: { err: "An error occurred while updating a hangout" },
        });
      }
      let connectionList = "";
      if (data.rows !== 0) {
        if (!data.rows[0].connectionlist) {
          if (data.rows[0].connectionlist.length !== 0) {
            connectionList = data.rows[0].connectionlist
              .split(",")
              .filter((el, i) => el == user_id);
            if (connectionList.length !== 0) connectionList.join(",");
            else connectionList = "";
          }
        }
      }

      // console.log("connectionList IS : ", connectionList);
      const updateConnectionList = `
        UPDATE Hangout SET 
        connectionList = $1
        WHERE Hangout._id = $2
        RETURNING *;`;
      db.query(updateConnectionList, [connectionList, _id], (err, data) => {
        if (err) {
          next({
            log: "Express error handler caught in dbController.updateHangout middleware",
            message: { err },
          });
        }
        console.log("DATA IS : ", data);

        res.locals.hangoutResponse = {
          _id,
          cl:
            !data || !("rows" in data) || data.rows.length === 0
              ? data.rows[0].connectionlist === ""
              : null,
        };
        console.log("Resp IS : ", res.locals.hangoutResponse);

        return next();
      });
    });
  },
  // gets an hangout or all of them if nothing is provided...
  getHangout: (req, res, next) => {
    const hangoutId = req.params.id || res.locals.hangoutId;
    const createHangoutQuery =
      `SELECT h._id, Locations.location, Statuses.statusname, Pictures.picture, 
              Users.username, Users._id AS user_id, h.connectionlist
     FROM Hangout h
     JOIN Locations ON h.locationRef = Locations._id 
     JOIN Statuses ON h.statusRef = Statuses._id 
     JOIN Pictures ON h. pictureRef = Pictures._id 
     JOIN Users ON h.userRef = Users._id ` +
      (hangoutId !== undefined ? `WHERE Hangout._id = ${hangoutId}};` : `;`);

    db.query(createHangoutQuery, null, (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.addHangout middleware",
          message: { err: "An error occurred while adding a hangout" },
        });
      }
      res.locals.hangout = hangoutId !== undefined ? data.rows[0] : data.rows;
      //console.log("DATA IS : ", data);
      return next();
    });
  },

  /* input: req.params with hangout _id 
      req.params.id = NUMBER
     
     DELETE * FROM User WHERE _id = req.params.id 
     
     output: none
     return if successful, otherwise error
  */
  deleteHangout: (req, res, next) => {
    const hangoutId = req.params.id || res.locals.hangoutId;
    const createHangoutQuery = `DELETE FROM Hangout h WHERE h._id = $1 RETURNING *;`;

    db.query(createHangoutQuery, [hangoutId], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.deleteHangout middleware",
          message: { err: "An error occurred while deleting a hangout" },
        });
      }
      //console.log("DATA IS : ", data);
      // delete any unnecessary references...
      Promise.all([
        db.query(
          `INSERT INTO Users u (hangoutref) 
           VALUES (NULL) WHERE u._id = $1;`,
          [data.rows[0].userref]
        ),
        db.query(
          `DELETE FROM Locations 
           WHERE _id NOT IN (
            SELECT locationref
            FROM Hangout
            UNION 
            SELECT locationref
            FROM Users);`
        ),
        db.query(
          `DELETE FROM Pictures 
           WHERE _id NOT IN (
            SELECT pictureref
            FROM Hangout
            UNION 
            SELECT pictureref
            FROM Users);`
        ),
        db.query(
          `DELETE FROM Statuses 
           WHERE _id NOT IN (
            SELECT statusref
            FROM Hangout
            UNION 
            SELECT statusref
            FROM Users);`
        ),
      ])
        .then((data) => {
          //console.log("DATA IS : ", data);
          return next();
        })
        .catch((err) =>
          next({
            log: "Express error handler caught in dbController.deleteHangout middleware",
            message: { err: "An error occurred while deleting a hangout" },
          })
        );
    });
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
    const addUsersLocationQuery = `
    INSERT INTO Locations (location) 
    VALUES ($1) RETURNING _id;`;

    db.query(addUsersLocationQuery, [req.body.location], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.addUser middleware",
          message: { err: "An error occurred while adding location" },
        });
      }
      res.locals.location = Number(data.rows[0]._id);
      return next();
    });
  },

  addUsersLocation: (req, res, next) => {
    const addUsersStatusQuery = `
    UPDATE Users SET locationref = $1 
     WHERE _id = $2;`;
    db.query(
      addUsersStatusQuery,
      [res.locals.location, req.params.id],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.addUsersLocation middleware",
            message: {
              err: "An error occurred while adding a location to a user",
            },
          });
        }
        return next();
      }
    );
  },

  addPicture: (req, res, next) => {
    const addUsersPictureQuery = `
    INSERT INTO Pictures (picture) 
    VALUES ($1) RETURNING _id;`;

    db.query(addUsersPictureQuery, [req.body.picture], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.addPicture middleware",
          message: { err: "An error occurred while adding a picture" },
        });
      }
      res.locals.picture = Number(data.rows[0]._id);
      return next();
    });
  },
  addUsersPicture: (req, res, next) => {
    const addUsersPictureQuery = `
    UPDATE Users SET pictureref = $1
    WHERE _id = $2`;
    db.query(
      addUsersPictureQuery,
      [res.locals.picture, req.params.id],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.addUsersPicture middleware",
            message: {
              err: "An error occurred while adding a picture to a user",
            },
          });
        }
        return next();
      }
    );
  },

  addStatus: (req, res, next) => {
    //need to update the status and then update the user
    const addUsersStatusQuery = `
    INSERT INTO Statuses (statusname) VALUES ($1) RETURNING _id;`;

    db.query(addUsersStatusQuery, [req.body.status], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.addStatus middleware",
          message: { err: "An error occurred while adding a status" },
        });
      }
      res.locals.status = Number(data.rows[0]._id);
      return next();
    });
  },

  addUsersStatus: (req, res, next) => {
    //console.log("Adding this status number: ", res.locals.status);
    const addUsersStatusQuery = `
    UPDATE Users SET statusRef = $1 
    WHERE _id = $2;`;

    db.query(
      addUsersStatusQuery,
      [res.locals.status, req.params.id],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.addUsersStatus middleware",
            message: {
              err: "An error occurred while adding a status to a user",
            },
          });
        }
        return next();
      }
    );
  },
  updateUser: (req, res, next) => {
    const { firstName, lastName, phoneNumber, email, userName, password } =
      req.body;
    const updateUserQuery = `
    UPDATE Users
    SET firstName = COALESCE(NULLIF($1, ''), firstName),
        lastName = COALESCE(NULLIF($2, ''), lastName),
        phoneNumber = COALESCE(NULLIF($3, ''), phoneNumber),
        email = COALESCE(NULLIF($4, ''), email),
        username = COALESCE(NULLIF($5, ''), username),
        password = COALESCE(NULLIF($6, ''), password)
    WHERE _id = $7;
    `;
    console.log(
      "here is all the input values: ",
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
      password,
      req.params.id
    );
    db.query(
      updateUserQuery,
      [
        firstName,
        lastName,
        phoneNumber,
        email,
        userName,
        password,
        req.params.id,
      ],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.updateUser middleware",
            message: { err: "An error occurred while updating a user" },
          });
        }
        console.log("DATA IS : ", data);
        return next();
      }
    );
  },
  addUser: (req, res, next) => {
    const { firstName, lastName, phoneNumber, email, userName, password } =
      req.body;
    const userOnlyTable = `
    INSERT INTO Users ( firstName, lastName, phoneNumber, email, userName, password, locationRef)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING _id;`;

    db.query(
      userOnlyTable,
      [
        firstName,
        lastName,
        phoneNumber,
        email,
        userName,
        password,
        res.locals.location,
      ],
      (err, data) => {
        if (err) {
          return next({
            log: "Express error handler caught in dbController.addUser middleware",
            message: { err: "An error occurred while adding user" },
          });
        }
        res.locals.userId = Number(data.rows[0]._id);
        //console.log("DATA IS : ", data);
        return next();
      }
    );
  },
  deleteUser: (req, res, next) => {
    const deleteUserQuery = `DELETE FROM Users WHERE _id = ${req.params.id};`;

    db.query(deleteUserQuery, null, (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.deleteUser middleware",
          message: { err: "An error occurred while deleting a user" },
        });
      }
      return next();
    });
  },

  getUserInfo: (req, res, next) => {
    let userId = req.params.id || res.locals.userId;
    const getUserQuery = `SELECT
    Users._id,
    Users.statusname,
    Users.firstName,
    Users.lastName,
    Users.phonenumber,
    Users.email,
    Users.userName,
    Locations.location,
    Statuses.statusname,
    Pictures.picture
    FROM
      Users
      LEFT JOIN Locations ON Users.locationRef = Locations._id
      LEFT JOIN Statuses ON Users.statusRef = Statuses._id
      LEFT JOIN Pictures ON Users.pictureRef = Pictures._id
    WHERE
      Users._id = $1;`;

    db.query(getUserQuery, [userId], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.getUserInfo middleware",
          message: { err: "An error occurred while getting user information" },
        });
      }
      // //console.log('Here is all the info: ', data);
      res.locals.userData = data.rows[0];
      return next();
    });
  },
  getUsers: (req, res, next) => {
    let userId = req.params.id || res.locals.userId;
    const getUserQuery = `SELECT u._id,
    u.statusname,
    u.firstName,
    u.lastName,
    u.phonenumber,
    u.email,
    u.userName,
    l.location,
    s.statusname,
    p.picture
    FROM Users u
       JOIN Locations l ON u.locationRef = l._id 
       JOIN Statuses s ON u.statusRef = s._id 
       JOIN Pictures p ON u.pictureRef = p._id
       ;`;

    db.query(getUserQuery, (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.getUsers middleware",
          message: {
            err,
          },
        });
      }
      //console.log("Here is all the info: ", data);
      res.locals.userData = data.rows;
      return next();
    });
  },
  /* input: req.body with 
      {user_name, password}
     
     SELECT * FROM User u WHERE u.name = name AND u.password = password

     output: res.locals.id set to found user _id from query
    
     NOTE: if successful redirect to getUserInfo route -> "api/user/${id}" see routes
  */
  verifyUser: (req, res, next) => {
    const { userName, password } = req.body;
    const validateTheUserQuery = `SELECT * FROM Users u WHERE u.username = $1 AND u.password = $2;`;

    db.query(validateTheUserQuery, [userName, password], (err, data) => {
      if (err) {
        return next({
          log: "Express error handler caught in dbController.verifyUser middleware",
          message: { err: "Invalid username or password" },
        });
      }
      // res.locals.user = Number(data.rows[0]._id);
      console.log("DATA IS : ", data);
      if (data.rows.length === 0) res.locals.id = undefined;
      else res.locals.id = data.rows[0]._id;
      return next();
    });
  },
};

module.exports = dbController;
