const express = require('express');
const router = express.Router();
const multer = require('multer');
const { View, SingleView, CreateOrder,UpdateOrderStatus,GetUserNotifications } = require('../Controller/OrderCtrl.js');
const Order = require('../Module/Order.js'); // Ensure correct path

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure 'uploads/' exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const authUser = require("../Middleware/auth.js"); // Ensure auth middleware is applied


const upload = multer({ storage: storage }); // ✅ Define `upload` properly

router.get('/get', View); // Fetch all orders
router.get('/get/:id', SingleView); // Fetch specific order
router.post('/create', upload.single('image'), CreateOrder); // ✅ Corrected usage
router.put('/update/:id', UpdateOrderStatus);
router.get('/user-notifications', authUser, GetUserNotifications);



module.exports = router;
