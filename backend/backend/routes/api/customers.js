const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const {
  createCustomer,
  getCustomers,
  getCustomer
} = require('../../controllers/customerController');


router.post('/',
  // ensureAuth,
  createCustomer);

router.get('/',
  //  ensureAuth,
  getCustomers);


router.get('/:id',
  //  ensureAuth,
  getCustomer);

module.exports = router;