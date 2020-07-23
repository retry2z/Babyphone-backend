const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');

const {
    list,
    post,
    remove,
    edit,
    details,
} = require('../api/product');

router.get('/', list);
router.get('/:id', details);
router.post('/', authGuard, post);
router.patch('/:id', authGuard, edit);
router.delete('/:id', authGuard, remove);


module.exports = router