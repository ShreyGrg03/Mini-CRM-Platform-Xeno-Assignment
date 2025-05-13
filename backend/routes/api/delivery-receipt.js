const express = require('express');
const router = express.Router();
const { updateDeliveryReceipt } = require('../../controllers/campaignController');


router.post('/', updateDeliveryReceipt);

module.exports = router;