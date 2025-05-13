const Order = require('../models/Order');
const Customer = require('../models/Customer');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res) => {
    try {
        const { customer: customerId, amount, orderDate, items } = req.body;

        // Basic validation
        if (!customerId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Please provide customer ID and amount'
            });
        }

        // Check if customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found with this ID'
            });
        }

        // Create order
        const order = await Order.create({
            customer: customerId,
            amount,
            orderDate: orderDate || Date.now(),
            items: items || []
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(`Error creating order: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private
 */
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .sort({ orderDate: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error(`Error getting orders: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get orders for a specific customer
 * @route   GET /api/orders/customer/:customerId
 * @access  Private
 */
exports.getCustomerOrders = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        // Check if customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found with this ID'
            });
        }

        const orders = await Order.find({ customer: customerId }).sort({ orderDate: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error(`Error getting customer orders: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};