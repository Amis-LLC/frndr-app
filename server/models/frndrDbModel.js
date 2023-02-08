const { Pool } = require("pg");

const PG_URI =
  "postgres://wxoaqhrt:xEy9G57yU8OlRtwt_7eJ7U0SxnQYQ3lz@batyr.db.elephantsql.com/wxoaqhrt";

const pool = new Pool({
  connectionString: PG_URI,
});

// Schema can be found in the attachements: https://yeti-crabs.atlassian.net/browse/SP-6

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
