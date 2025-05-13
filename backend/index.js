const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');

dotenv.config();

const customerRoutes = require('./routes/api/customers');
const orderRoutes = require('./routes/api/orders');
const campaignRoutes = require('./routes/api/campaigns');
const deliveryReceiptRoutes = require('./routes/api/delivery-receipt');
const authRoutes = require('./routes/api/auth');

const connectDB = require('./config/db');
connectDB();

require('./config/auth');

const app = express();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/delivery-receipt', deliveryReceiptRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Mini CRM API is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});