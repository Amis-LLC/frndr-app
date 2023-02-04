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
const express = require("express");

const dbController = require("../controllers/dbController.js");

const router = express.Router();
// create a hangout
router.post("/hangout/:id", dbController.addStatus, dbController.addPicture, dbController.addLocation, dbController.addHangout,
dbController.getHangout, (req, res) =>
  res.status(200).json(res.locals.hangout)
);
// delete a hangout
router.delete("/hangout", dbController.deleteHangout, (req, res) =>
  res.sendStatus(204)
);
// add a user
router.post("/user", dbController.addLocation, dbController.addUser, dbController.getUserInfo, (req, res) =>
  res.status(201).json(res.locals.userData)
);
// update user's status
router.post("/user/:id/status", dbController.addStatus, dbController.addUsersStatus, dbController.getUserInfo, (req, res) =>
  res.status(201).json(res.locals.userData)
);
// update user's picture
router.post("/user/:id/picture", dbController.addPicture, dbController.addUsersPicture, dbController.getUserInfo, (req, res) =>
res.status(201).json(res.locals.userData)
);
// update user's location
router.post("/user/:id/location", dbController.addLocation, dbController.addUsersLocation, dbController.getUserInfo, (req, res) =>
res.status(201).json(res.locals.userData)
);
// delete a user
router.delete("/user/:id", dbController.deleteUser, (req, res) =>
  res.sendStatus(200)
);

// get user info
router.get("/user/:id", dbController.getUserInfo, (req, res) =>
  res.status(200).json(res.locals.userData)
);
// verify username / password
router.post("/login", dbController.verifyUser, (req, res) =>
  res.redirect("/api/user/" + res.locals.id)
);

module.exports = router;
