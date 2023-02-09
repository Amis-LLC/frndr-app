const db = require('../models/frndrDbModel.js');

const dbController = {
  //add a new user from signup form:
  addUser: (req, res, next) => {
    console.log('in add User, ', req.body);
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
      password,
      location,
    } = req.body;

    const text = `
    INSERT INTO newuser ( "firstname", "lastname", "phonenumber", "email", "username", "password", "location")
    VALUES ('${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${userName}', '${password}', '${location}') RETURNING _id`;

    db.query(text, (err, data) => {
      if (err) {
        return next({
          log: 'Express error handler caught in dbController.addUser middleware',
          message: { err: 'An error occurred while adding user' },
        });
      }
      res.locals.userId = Number(data.rows[0]._id);
      console.log('CURRENT USER ID FROM ADDUSER IS : ', res.locals.userId);
      //returns user id from user table
      return next();
    });
  },

  getUserInfo: (req, res, next) => {
    console.log('req.body in getUserInfo: ', req.body);

    let userId = req.params.id || res.locals.userId;

    console.log('userID from welcome page', userId);
    const text = `SELECT
    newuser._id,
    newuser.firstName,
    newuser.lastName,
    newuser.phonenumber,
    newuser.email,
    newuser.username,
    newuser.location,
    newuser.profilepicture,
    newuser.acceptedhangoutsid
    FROM
      newuser
    WHERE
      newuser._id = '${userId}';`;

    //    Statuses.statusname, Pictures.picture - deleted from query for right now
    db.query(text, (err, data) => {
      if (err) {
        return next({
          log: 'Express error handler caught in dbController.getUserInfo middleware',
          message: { err: 'An error occurred while getting user information' },
        });
      }
      console.log('Here is your current user info: ', data.rows[0]);
      res.locals.userData = data.rows[0];
      return next();
    });
  },

  verifyUser: (req, res, next) => {
    const { userName, password } = req.body;

    console.log('this is the req body in verify user: ', req.body);

    const text = `SELECT * FROM newuser WHERE username = '${userName}' AND password = '${password}';`;
    // const tester = `SELECT * FROM newuser WHERE username = 'Jane' AND password = 'Doe';`;
    db.query(text, (err, data) => {
      if (err || data.rows.length === 0) {
        return next({
          log: 'Express error handler caught in dbController.verifyUser middleware',
          message: { err: 'Invalid username or password' },
        });
      } else {
        // console.log('VERIFY USER DATA IS : ', data.rows);
        res.locals.userId = Number(data.rows[0]._id);
        return next();
      }
      // if (data.rows.length === 0) res.locals.id = undefined;
      // else res.locals.id = data.rows[0]._id;
    });
  },

  // getHangouts: (req, res, next) => {
  //   const text = `SELECT * FROM newuser WHERE username = '${userName}' AND password = '${password}';`;
  //   // const tester = `SELECT * FROM newuser WHERE username = 'Jane' AND password = 'Doe';`;
  //   db.query(text, (err, data) => {
  //     if (err || data.rows.length === 0) {
  //       return next({
  //         log: 'Express error handler caught in dbController.verifyUser middleware',
  //         message: { err: 'Invalid username or password' },
  //       });
  //     } else {
  //       // console.log('VERIFY USER DATA IS : ', data.rows);
  //       res.locals.userId = Number(data.rows[0]._id);
  //       return next();
  //     }
  // },
};

module.exports = dbController;
