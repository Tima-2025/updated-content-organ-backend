 const { body, param, validationResult } = require('express-validator');
 const validateProductCreate = [
 body('name').isString().isLength({ min: 1 }),
 body('price').isFloat({ gt: 0 }),
 (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) return res.status(400).json({ success: false,
 errors: errors.array() });
 next();
 }
 ];
 const validateInquiry = [
 body('name').isString().notEmpty(),
 body('email').isEmail(),
 body('message').isString().notEmpty(),
 (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) return res.status(400).json({ success: false,
 errors: errors.array() });
 next();
 }
 ];
 module.exports = { validateProductCreate, validateInquiry };