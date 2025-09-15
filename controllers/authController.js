 const bcrypt = require('bcrypt');
 const User = require('../models/userModel');
 const { generateToken } = require('../middlewares/auth');
 const AuthController = {
 async register(req, res, next) {
 try {
 const { name, email, password, role } = req.body;
 if (!name || !email || !password) return res.status(400).json({ success:
 false, message: 'Missing fields' });
 const existing = await User.findByEmail(email);
 10
if (existing) return res.status(409).json({ success: false, message:
 'Email already used' });
 const hash = await bcrypt.hash(password, 12);
 const user = await User.create({ name, email, password_hash: hash,
 role });
 const token = generateToken(user);
 res.json({ success: true, user, token });
 } catch (err) { next(err); }
 },
 async login(req, res, next) {
 try {
 const { email, password } = req.body;
 if (!email || !password) return res.status(400).json({ success: false,
 message: 'Missing fields' });
 const user = await User.findByEmail(email);
 if (!user) return res.status(401).json({ success: false, message:
 'Invalid credentials' });
 const ok = await bcrypt.compare(password, user.password_hash);
 if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
 const token = generateToken(user);
 res.json({ success: true, user: { id: user.id, name: user.name, email:
 user.email, role: user.role }, token });
 } catch (err) { next(err); }
 }
 };
 module.exports = AuthController;