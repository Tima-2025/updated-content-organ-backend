 const { pool } = require('../db');
 const Product = {
 async create({ name, description, price, category, stock_quantity,
 image_url }) {
 const text = `INSERT INTO products (name, description, price, category, 
stock_quantity, image_url)
                  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
 const values = [name, description, price, category, stock_quantity || 0,
 image_url];
 const res = await pool.query(text, values);
 return res.rows[0];
 },
 async findAll({ limit = 100, offset = 0 } = {}) {
 const res = await pool.query(`SELECT * FROM products ORDER BY created_at 
DESC LIMIT $1 OFFSET $2`, [limit, offset]);
 return res.rows;
 },
 async findById(id) {
 const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
 return res.rows[0];
 },
 async update(id, fields) {
 // build dynamic SET clause safely
 const keys = Object.keys(fields);
 const setClauses = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
 const values = [id, ...keys.map((k) => fields[k])];
 const text = `UPDATE products SET ${setClauses} WHERE id = $1 RETURNING *`;
 const res = await pool.query(text, values);
 return res.rows[0];
},
 async delete(id) {
 const res = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
 return res.rows[0];
 }
 };
 module.exports = Product;