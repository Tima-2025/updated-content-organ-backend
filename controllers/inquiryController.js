//inquiryController.js
/*const Inquiry = require('../models/inquiryModel');
 const { sendServiceRequestEmail } = require('../utils/mailer');
 const InquiryController = {
 async create(req, res, next) {
 try {
 const { name, email, subject, message } = req.body;
 const inquiry = await Inquiry.create({ name, email, subject, message });
 // send mail but do not block response; catch errors
 sendServiceRequestEmail({ name, email, subject, message })
 .then(() => console.log('Service request emailed.'))
 .catch((err) => console.error('Failed to send service request email',
 err));
 res.status(201).json({ success: true, inquiry });
 } catch (err) { next(err); }
 },
 async list(req, res, next) {
 try {
 const inquiries = await Inquiry.findAll();
 res.json({ success: true, inquiries });
 } catch (err) { next(err); }
 }
 };
 module.exports = InquiryController;*/
 // controllers/inquiryController.js
const Inquiry = require('../models/inquiryModel');
const { sendServiceRequestEmail } = require('../utils/mailer');

const InquiryController = {
  // User submits a new inquiry
  async create(req, res, next) {
    try {
      const { name, email, subject, message } = req.body;
      const inquiry = await Inquiry.create({ name, email, subject, message });

      // send mail asynchronously
      sendServiceRequestEmail({ name, email, subject, message })
        .then(() => console.log('Service request emailed.'))
        .catch((err) => console.error('Failed to send service request email', err));

      res.status(201).json({ success: true, inquiry });
    } catch (err) {
      next(err);
    }
  },

  // Admin/user view inquiries
  async list(req, res, next) {
    try {
      const inquiries = await Inquiry.findAll();
      res.json({ success: true, inquiries });
    } catch (err) {
      next(err);
    }
  },

  // ✅ Admin updates inquiry status
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, message: 'Status is required' });
      }

      const inquiry = await Inquiry.updateStatus(id, status);
      if (!inquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }

      res.json({ success: true, inquiry });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = InquiryController;
