const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Please provide customer ID']
    },
    amount: {
        type: Number,
        required: [true, 'Please add order amount'],
        min: [0, 'Amount cannot be negative']
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    items: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update customer total spend after order is saved
OrderSchema.post('save', async function () {
    try {
        const Customer = this.model('Customer');
        const customer = await Customer.findById(this.customer);

        if (customer) {
            customer.totalSpend += this.amount;
            customer.lastVisitDate = this.orderDate;
            customer.visitCount += 1;
            await customer.save();
        }
    } catch (error) {
        console.error('Error updating customer data after order:', error);
    }
});

module.exports = mongoose.model('Order', OrderSchema);