const express=require('express');
const router=express.Router();

const {Insert} = require('../Controller/OnlinePayctrl')

router.post('/in', Insert)

module.exports = router;
