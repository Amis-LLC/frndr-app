/**
 * ************************************
 *
 * @module  index.js
 * @author  zahara-aviv
 * @date    2023-02-04
 * @description Express Server
 *
 * ************************************
 */
const path = require("path");
const express = require("express");
const app = express();

// const someRouter = require("./routes/something")
const PORT = process.env.PORT || 3000; // to extend functionality

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 * Serve up static files for production
 */
if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../build/index.html"));
  });
}

/**
 * define route handlers
 */
//TBD for next commit...

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send("Page Not Found...Sorry Pal"));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
