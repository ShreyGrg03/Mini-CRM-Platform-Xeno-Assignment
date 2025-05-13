const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const {
    previewAudience,
    createCampaign,
    getCampaigns,
    getCampaign
} = require('../../controllers/campaignController');

router.post('/preview',
    //  ensureAuth,
    previewAudience);

router.post('/',
    //  ensureAuth,
    createCampaign);


router.get('/',
    //  ensureAuth,
    getCampaigns);

router.get('/:id',
    //  ensureAuth,
    getCampaign);

module.exports = router;