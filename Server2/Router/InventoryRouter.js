const express=require('express');
const router=express.Router();
const multer = require('multer');


const {Insert,View,Delete,Home, SingleView,Card} = require('../Controller/InventoryCtrl')

const storage = multer.diskStorage({
    //Destination function Specifies where to save  the uploadfiles
    destination: function(req, file, cb){
        cb(null, './files/');
    },
    //Filename function destination the name of the upload file 
    filename:function(req, file, cb){
        //Append a unique timestamp (date.now()) to the original file name
    const uniqueSuffix =Date.now() ;
    cb(null, uniqueSuffix +`-`+file.originalname);
    
}
})
  const files=multer({storage: storage});

        


router.post('/in',files.single('image'), Insert)
router.get('/getinventory', View);
router.delete('/delete/:id',Delete)
router.get('/Home',Home)
router.get('/singleview/:id',files.single('image'), SingleView)
router.get('/card',Card)



module.exports=router