const express = require('express');
const router = express.Router();
const creatorController = require('../controllers/creatorController');

router.post('/signup', creatorController.signup);
router.get('/:id/dashboard', creatorController.getDashboard);
router.post('/:id/query', creatorController.queryAudience);

module.exports = router;
