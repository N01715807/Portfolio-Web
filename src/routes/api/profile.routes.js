const express = require('express');
const router = express.Router();
const c = require('../../controllers/profile.controller');

router.get('/', c.getProfile);
router.put('/', c.updateProfile);

module.exports = router;
