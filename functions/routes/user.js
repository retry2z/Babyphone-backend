const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');


const {
    logout,
    profile,
    update,
    password,
    current,
    created,
} = require('../api/user');

router.get('/', authGuard, profile);
router.get('/rooms', authGuard, created);
router.patch('/', authGuard, update);
router.put('/password', authGuard, password);
router.get('/logout', authGuard, logout);
router.get('/current', authGuard, current);


module.exports = router