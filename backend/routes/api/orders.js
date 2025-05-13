const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const {
  createOrder,
  getOrders,
  getCustomerOrders
} = require('../../controllers/orderController');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/',
  //  ensureAuth,
  createOrder);

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/',
  //  ensureAuth,
  getOrders);

// @route   GET /api/orders/customer/:customerId
// @desc    Get orders for a specific customer
// @access  Private
router.get('/customer/:customerId',
  // ensureAuth,
  getCustomerOrders);

module.exports = router;