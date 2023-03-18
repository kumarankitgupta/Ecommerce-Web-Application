const router = require('express').Router();
const User = require('../models/userModel')
const { showSignUp, complteVerification, saveNewusers } = require('../controllers/miselleneousCon');
router.get('/',showSignUp)
router.post('/',saveNewusers)
module.exports = router;