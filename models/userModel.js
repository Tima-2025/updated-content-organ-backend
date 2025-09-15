 const { pool } = require('../db');
 const User = {
 async create({ name, email, password_hash, role = 'user' }) {
 const res = await pool.query(
 `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) 
RETURNING id, name, email, role, created_at`,
 [name, email, password_hash, role]
 );
 return res.rows[0];
 },
 async findByEmail(email) {
 const res = await pool.query('SELECT * FROM users WHERE email = $1',
 [email]);
 return res.rows[0];
 },
 async findById(id) {
 const res = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
 return res.rows[0];
 }
 };
 module.exports = User;