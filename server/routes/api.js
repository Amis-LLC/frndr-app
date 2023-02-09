/**
 * ************************************
 *
 * @module  index.js
 * @author  zahara-aviv
 * @date    2023-02-04
 * @description API router for FRNDR request to database
 *
 * ************************************
 */
const express = require('express');

const dbController = require('../controllers/dbController.js');

const router = express.Router();
// create a hangout
// router.post(
//   '/hangout/:id',
//   dbController.addStatus,
//   dbController.addPicture,
//   dbController.addLocation,
//   dbController.addHangout,
//   dbController.getHangout,
//   (req, res) => res.status(200).json(res.locals.hangout)
// );
// // get a hangout
// router.get('/hangouts', dbController.getHangout, (req, res) =>
//   res.status(200).json(res.locals.hangout)
// );
// // delete a hangout
// router.delete('/hangout/:id', dbController.deleteHangout, (req, res) =>
//   res.sendStatus(204)
// );
// // accept a hangout
// router.post('/accept', dbController.joinHangout, (req, res) =>
//   res.status(200).json(res.locals.hangoutResponse)
// );
// cancel a hangout
// router.delete("/accept/:id", dbController.leaveHangout, (req, res) =>
//   res.status(200).json(res.locals.hangoutResponse)
// );&²
// router.patch(
//   "/user/:id",
//   dbController.updateUser,
//   dbController.getUserInfo,
//   (req, res) => res.status(201).json(res.locals.userData)
// );
// update user's status
// router.post(
//   "/user/:id/status",
//   dbController.addStatus,
//   dbController.addUsersStatus,
//   dbController.getUserInfo,
//   (req, res) => res.status(201).json(res.locals.userData)
// );
// update user's picture
// router.post(
//   "/user/:id/picture",
//   dbController.addPicture,
//   dbController.addUsersPicture,
//   dbController.getUserInfo,
//   (req, res) => res.status(201).json(res.locals.userData)
// );
// update user's location
// router.post(
//   "/user/:id/location",
//   dbController.addLocation,
//   dbController.addUsersLocation,
//   dbController.getUserInfo,
//   (req, res) => res.status(201).json(res.locals.userData)
// );
// delete a user
// router.delete("/user/:id", dbController.deleteUser, (req, res) =>
//   res.sendStatus(200)
// );

//AUTH ROUTES-----------------------------------------------------------------------
// add a user
//req.body is signUpInfo in state. Looks like this: {
//   firstName: '',
//   lastName: '',
//   phoneNumber: '8165551234',
//   email: '',
//   userName: '',
//   password: '',
// },
router.post(
  '/user',
  dbController.addUser,
  dbController.getUserInfo,
  (req, res) => res.status(201).json(res.locals.userData)
);
// verify username / password
router.post(
  '/login',
  dbController.verifyUser,
  dbController.getUserInfo,
  (req, res) => res.status(200).json(res.locals.userData)
);

//workaround welcome page populate
router.get('/login/:id', dbController.getUserInfo, (req, res) =>
  res.status(200).json(res.locals.userData)
);
// get user info
// router.get('/user/:id', dbController.getUserInfo, (req, res) =>
//   res.status(200).json(res.locals.userData)
// );
// // get user info
// router.get('/users', dbController.getUsers, (req, res) =>
//   res.status(200).json(res.locals.userData)
// );

module.exports = router;

//New tables for iteration project:
// CREATE TABLE NewUser (
//   _id SERIAL PRIMARY KEY,
//   firstName varchar(255) NOT NULL,
//   lastName varchar(255) NOT NULL,
//   phoneNumber varchar(255),
//   email varchar(255) NOT NULL,
//   userName varchar(255) NOT NULL,
//   password varchar(255) NOT NULL,
//   location varchar(255) NOT NULL,
//   profilePicture varchar(255),
//   acceptedHangoutsId INT,
//   FOREIGN KEY (acceptedHangoutsId) REFERENCES NewHangouts ("_id")
// )
