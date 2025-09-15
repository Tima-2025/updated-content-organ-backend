 const express = require('express');
 const router = express.Router();
 const ProductController = require('../controllers/productController');
 const { authenticate, authorizeAdmin } = require('../middlewares/auth');
 const { validateProductCreate } = require('../middlewares/validation');
 // Public read
 router.get('/', ProductController.list);
 router.get('/:id', ProductController.get);
 // Protected - admin only
 router.post('/', authenticate, authorizeAdmin, validateProductCreate,
 ProductController.create);
 router.put('/:id', authenticate, authorizeAdmin, ProductController.update);
 router.delete('/:id', authenticate, authorizeAdmin, ProductController.remove);
 module.exports = router;