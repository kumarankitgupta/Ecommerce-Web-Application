const router = require('express').Router();
const { emailVerification,setVerified} = require('../controllers/miselleneousCon');
router.get('/',emailVerification)
router.post('/',setVerified)
module.exports = router;