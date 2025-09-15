 const Product = require('../models/productModel');
 const ProductController = {
 async create(req, res, next) {
 try {
 const product = await Product.create(req.body);
 res.status(201).json({ success: true, product });
 } catch (err) { next(err); }
 },
 async list(req, res, next) {
 try {
 
const { limit, offset } = req.query;
 const products = await Product.findAll({ limit: Number(limit) || 100,
 offset: Number(offset) || 0 });
 res.json({ success: true, products });
 } catch (err) { next(err); }
 },
 async get(req, res, next) {
 try {
 const product = await Product.findById(req.params.id);
 if (!product) return res.status(404).json({ success: false, message: 'Not found' });
 res.json({ success: true, product });
 } catch (err) { next(err); }
 },
 async update(req, res, next) {
 try {
 const allowed =
 ['name','description','price','category','stock_quantity','image_url'];
 const fields = {};
 allowed.forEach((k) => { if (req.body[k] !== undefined) fields[k] =
 req.body[k]; });
 if (Object.keys(fields).length === 0) return res.status(400).json({
 success: false, message: 'No valid fields to update' });
 const updated = await Product.update(req.params.id, fields);
 if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
 res.json({ success: true, product: updated });
 } catch (err) { next(err); }
 },
 async remove(req, res, next) {
 try {
 const deleted = await Product.delete(req.params.id);
 if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
 res.json({ success: true, product: deleted });
 } catch (err) { next(err); }
 }
 };
 module.exports = ProductController;