const mongoose = require('mongoose');

const CommunicationLogSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED'],
        default: 'PENDING'
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update campaign stats when log status changes
CommunicationLogSchema.post('save', async function () {
    try {
        const Campaign = this.model('Campaign');
        const campaign = await Campaign.findById(this.campaign);

        if (campaign) {
            const logs = await this.model('CommunicationLog').find({ campaign: this.campaign });

            campaign.sentCount = logs.filter(log => log.status === 'SENT').length;
            campaign.failedCount = logs.filter(log => log.status === 'FAILED').length;

            await campaign.save();
        }
    } catch (error) {
        console.error('Error updating campaign stats:', error);
    }
});

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema);