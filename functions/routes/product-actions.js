const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');

const {
    join,
    leave,
    notify
} = require('../api/product-action');

router.get('/:id/join', join);
router.get('/:id/leave', leave);
router.post('/:id/notification', authGuard, notify);


module.exports = router