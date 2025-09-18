const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,      // must match docker-compose service name 'db'
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

async function initDB() {
  const initSql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'init.sql'), 'utf8');
  await pool.query(initSql);  // run init script once
  console.log('Initialized DB (tables & triggers)');
}

module.exports = { pool, initDB };
