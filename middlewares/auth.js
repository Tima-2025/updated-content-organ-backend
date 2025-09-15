const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');
 function generateToken(user) {
 const payload = { id: user.id, email: user.email, role: user.role };
 return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:
 process.env.JWT_EXPIRES_IN || '7d' });
 }
 async function authenticate(req, res, next) {
 try {
 const header = req.headers.authorization;
 if (!header) return res.status(401).json({ success: false, message:
 'Missing authorization header' });
 const token = header.replace('Bearer ', '');
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 const user = await User.findById(decoded.id);
 if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });
 req.user = user;
 next();
 } catch (err) {
 res.status(401).json({ success: false, message: 'Unauthorized', error:
 err.message });
 }
 }
 function authorizeAdmin(req, res, next) {
 if (!req.user) return res.status(401).json({ success: false, message:
 'Unauthorized' });
 if (req.user.role !== 'admin') return res.status(403).json({ success: false,
 message: 'Forbidden: admin only' });
 next();
 }
 module.exports = { authenticate, authorizeAdmin, generateToken };