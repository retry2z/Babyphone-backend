const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');

const {
    join,
    leave,
} = require('../api/product-action');

router.get('/:id/join', join);
router.get('/:id/leave', leave);

module.exports = router