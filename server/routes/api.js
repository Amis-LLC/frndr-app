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
router.post("/hangout", dbController.addHangout, (req, res) =>
  res.status(200).json(res.locals.hangouts)
);
// delete a hangout
router.delete("/hangout", dbController.deleteHangout, (req, res) =>
  res.sendStatus(204)
);
// add a user
router.post("/user", dbController.addLocation, dbController.addUser, dbController.getUserInfo, (req, res) =>
  res.sendStatus(201)
);
// delete a user
router.delete("/user", dbController.deleteUser, (req, res) =>
  res.sendStatus(200).json(res.locals.user)
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
