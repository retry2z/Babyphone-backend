const express = require('express');
const router = express.Router();

const {
    join,
    leave,
} = require('../api/product-action');

router.get('/:id/join', join);
router.get('/:id/leave', leave);

module.exports = router