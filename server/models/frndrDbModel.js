const { Pool } = require('pg');

const PG_URI = 'postgres://hclmijik:ei1cJ_UMDY6jQtXJ7V6hS2DmZEW0GflO@salt.db.elephantsql.com/hclmijik'; 


const pool = new Pool({
  connectionString: PG_URI
});

// Schema can be found in the attachements: https://yeti-crabs.atlassian.net/browse/SP-6

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
