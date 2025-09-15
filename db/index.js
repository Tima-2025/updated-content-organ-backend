 const { Pool } = require('pg');
 const fs = require('fs');
 const path = require('path');
 const pool = new Pool({ connectionString: process.env.DATABASE_URL });
 async function initDB() {
 
const initSql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'init.sql'), 'utf8');
 // run init script once
 await pool.query(initSql);
 console.log('Initialized DB (tables & triggers)');
 }
 module.exports = { pool, initDB };