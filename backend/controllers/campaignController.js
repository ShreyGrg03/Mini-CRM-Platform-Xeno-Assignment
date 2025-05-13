const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');
const segmentService = require('../services/segmentService');
const dummyVendorService = require('../services/dummyVendorService');

/**
 * @desc    Get audience size for given rules
 * @route   POST /api/campaigns/preview
 * @access  Private
 */
exports.previewAudience = async (req, res) => {
    try {
        const { rules, logicOperator } = req.body;

        // Basic validation
        if (!rules || !Array.isArray(rules) || rules.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Please provide at least one rule'
            });
        }

        // Get matching customers
        const matchingCustomers = await segmentService.findMatchingCustomers(rules, logicOperator || 'AND');

        res.status(200).json({
            success: true,
            audienceSize: matchingCustomers.length
        });
    } catch (error) {
        console.error(`Error previewing audience: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Create new campaign and deliver messages
 * @route   POST /api/campaigns
 * @access  Private
 */
exports.createCampaign = async (req, res) => {
    try {
        const { name, rules, logicOperator, messageTemplate } = req.body;

        // Basic validation
        if (!name || !rules || !messageTemplate) {
            return res.status(400).json({
                success: false,
                error: 'Please provide campaign name, rules, and message template'
            });
        }

        // Get matching customers
        const matchingCustomers = await segmentService.findMatchingCustomers(rules, logicOperator || 'AND');

        // Create campaign
        const campaign = await Campaign.create({
            name,
            rules,
            logicOperator: logicOperator || 'AND',
            messageTemplate,
            audienceSize: matchingCustomers.length,
            createdBy: req.user._id
        });

        // Create communication logs and send messages
        const deliveryPromises = matchingCustomers.map(async (customer) => {
            // Create personalized message
            const personalizedMessage = messageTemplate.replace('[Customer Name]', customer.name);

            // Create log entry
            const log = await CommunicationLog.create({
                campaign: campaign._id,
                customer: customer._id,
                messageContent: personalizedMessage,
                status: 'PENDING'
            });

            // Send message via dummy vendor service
            await dummyVendorService.sendMessage(
                log._id,
                customer.email,
                personalizedMessage
            );
        });

        // Wait for all delivery attempts to complete
        await Promise.all(deliveryPromises);

        res.status(201).json({
            success: true,
            data: campaign
        });
    } catch (error) {
        console.error(`Error creating campaign: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get all campaigns
 * @route   GET /api/campaigns
 * @access  Private
 */
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: campaigns.length,
            data: campaigns
        });
    } catch (error) {
        console.error(`Error getting campaigns: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Get campaign details including logs
 * @route   GET /api/campaigns/:id
 * @access  Private
 */
exports.getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!campaign) {
            return res.status(404).json({
                success: false,
                error: 'No campaign found'
            });
        }

        // Get communication logs for this campaign
        const logs = await CommunicationLog.find({ campaign: req.params.id })
            .populate('customer', 'name email')
            .sort({ sentAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                campaign,
                logs
            }
        });
    } catch (error) {
        console.error(`Error getting campaign: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

/**
 * @desc    Update delivery receipt
 * @route   POST /api/delivery-receipt
 * @access  Public (called by vendor API)
 */
exports.updateDeliveryReceipt = async (req, res) => {
    try {
        const { logId, status } = req.body;

        // Basic validation
        if (!logId || !status) {
            return res.status(400).json({
                success: false,
                error: 'Please provide log ID and status'
            });
        }

        // Check status is valid
        if (!['SENT', 'FAILED'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Status must be either SENT or FAILED'
            });
        }

        // Update log status
        const log = await CommunicationLog.findById(logId);

        if (!log) {
            return res.status(404).json({
                success: false,
                error: 'No log found with this ID'
            });
        }

        log.status = status;
        log.updatedAt = Date.now();
        await log.save();

        res.status(200).json({
            success: true,
            data: log
        });
    } catch (error) {
        console.error(`Error updating delivery receipt: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};