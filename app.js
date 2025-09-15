 require('dotenv').config();
 const express = require('express');
 const helmet = require('helmet');
 const cors = require('cors');
 const morgan = require('morgan');
 const rateLimit = require('express-rate-limit');
 const authRoutes = require('./routes/auth');
 const productRoutes = require('./routes/products');
 const inquiryRoutes = require('./routes/inquiries');
 const { initDB } = require('./db');
 const app = express();
 const PORT = process.env.PORT || 4000;
 // Basic production hardening
 app.use(helmet());
 app.use(cors({ origin: true }));
 app.use(express.json({ limit: '10mb' }));
 
app.use(morgan('combined'));
 // Rate limiting
 const limiter = rateLimit({
 windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
 max: Number(process.env.RATE_LIMIT_MAX) || 100
 });
 app.use(limiter);
 // Health
 app.get('/health', (req, res) => res.json({ success: true, uptime:
 process.uptime() }));
 // Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/products', productRoutes);
 app.use('/api/inquiries', inquiryRoutes);
 // Global error handler
 app.use((err, req, res, next) => {
 console.error(err);
 res.status(err.status || 500).json({ success: false, message: err.message ||
 'Internal server error' });
 });
 // Start server after DB init
 initDB()
 .then(() => {
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 })
 .catch((err) => {
 console.error('Failed to initialize DB:', err);
 process.exit(1);
 });