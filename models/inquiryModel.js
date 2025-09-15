/* const { pool } = require('../db');
 const Inquiry = {
 async create({ name, email, subject, message }) {
 const res = await pool.query(
 `INSERT INTO inquiries (name, email, subject, message) VALUES 
($1,$2,$3,$4) RETURNING *`,
 [name, email, subject, message]
 );
 return res.rows[0];
 },
 async findAll({ limit = 100, offset = 0 } = {}) {
 const res = await pool.query(`SELECT * FROM inquiries ORDER BY created_at 
DESC LIMIT $1 OFFSET $2`, [limit, offset]);
 return res.rows;
 }
 };
 module.exports = Inquiry;*/
 // models/inquiryModel.js
const { pool } = require('../db');

const Inquiry = {
  async create({ name, email, subject, message }) {
    const result = await pool.query(
      `INSERT INTO inquiries (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, subject, message]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT * FROM inquiries ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE inquiries
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }
};

module.exports = Inquiry;
