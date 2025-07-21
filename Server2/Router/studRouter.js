const express = require('express');
const router = express.Router();

const authUser = require('../Middleware/auth.js');



const {Insert,UserSign,UserGet} = require('../Controller/UserController.js')

router.post('/insert', Insert);
router.post('/user',UserSign);
router.get('/get', authUser,UserGet);

module.exports = router