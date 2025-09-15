/*const express = require('express');
 const router = express.Router();
 const InquiryController = require('../controllers/inquiryController');
 const { validateInquiry } = require('../middlewares/validation');
 const { authenticate, authorizeAdmin } = require('../middlewares/auth');
 // public endpoint for service request
 router.post('/', validateInquiry, InquiryController.create);
 // admin can list inquiries
 router.get('/', authenticate, authorizeAdmin, InquiryController.list);
 module.exports = router;*/
 const express = require('express');
const router = express.Router();
const InquiryController = require('../controllers/inquiryController');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

// Public: submit inquiry
router.post('/', InquiryController.create);

// Admin: view all
router.get('/', authenticate, authorizeAdmin, InquiryController.list);

// Admin: update status
router.put('/:id/status', authenticate, authorizeAdmin, InquiryController.updateStatus);

module.exports = router;
