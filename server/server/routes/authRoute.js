const express = require('express');
const router = express.Router();
const handleSignup = require('../api/auth/handleSignup');

router.post('/signup', handleSignup);

module.exports = router;

