const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    field: {
        type: String,
        required: true,
        enum: ['totalSpend', 'visitCount', 'lastVisitDate']
    },
    operator: {
        type: String,
        required: true,
        enum: ['>', '<', '>=', '<=', '==', '!=']
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a campaign name'],
        trim: true
    },
    rules: {
        type: [RuleSchema],
        required: [true, 'Please define at least one rule']
    },
    logicOperator: {
        type: String,
        enum: ['AND', 'OR'],
        default: 'AND'
    },
    messageTemplate: {
        type: String,
        required: [true, 'Please add a message template']
    },
    audienceSize: {
        type: Number,
        default: 0
    },
    sentCount: {
        type: Number,
        default: 0
    },
    failedCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);