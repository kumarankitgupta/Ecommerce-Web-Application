const router = require('express').Router();
const { signin, showSignIn } = require('../controllers/miselleneousCon');
const User = require('../models/userModel')
router.get('/',showSignIn)
router.post("/",signin);
module.exports = router;
