const express=require('express');
const router=express.Router();

const {Insert,View} = require('../Controller/CategoryCtrl')

router.post('/cate',Insert)
router.get('/get', View);

module.exports=router