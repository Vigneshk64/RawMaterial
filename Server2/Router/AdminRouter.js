const express = require('express');
const router = express.Router();

const {Insert, UserLogin} = require('../Controller/AdminController.js')

router.post('/insert', Insert);
router.post('/signup', UserLogin);




module.exports = router