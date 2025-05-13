const Customer = require('../models/Customer');

/**
 * @desc    Create new customer
 * @route   POST /api/customers
 * @access  Private
 */
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, totalSpend, lastVisitDate, visitCount } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                error: 'Please provide name and email'
            });
        }

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                error: 'Customer with this email already exists'
            });
        }

        const customer = await Customer.create({
            name,
            email,
            totalSpend: totalSpend || 0,
            lastVisitDate: lastVisitDate || null,
            visitCount: visitCount || 0
        });

        res.status(201).json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(`Error creating customer: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get all customers
 * @route   GET /api/customers
 * @access  Private
 */
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        console.error(`Error getting customers: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get single customer
 * @route   GET /api/customers/:id
 * @access  Private
 */
exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found'
            });
        }

        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(`Error getting customer: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};