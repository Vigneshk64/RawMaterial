const mongoose = require('mongoose');
const Order = require('../Module/Order'); // Ensure correct path

// ✅ Create a New Order
const CreateOrder = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging Step

        let { Uid, Itemid, image, NoItem, Price } = req.body;

        if (!Uid || !Itemid || !NoItem || !Price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ✅ Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(Uid) || !mongoose.Types.ObjectId.isValid(Itemid)) {
            return res.status(400).json({ message: "Invalid Uid or Itemid format" });
        }

        NoItem = Number(NoItem);
        Price = Number(Price);

        const newOrder = new Order({ 
            Uid,  // No need to convert
            Itemid: new mongoose.Types.ObjectId(Itemid),
            image: image || "",
            NoItem,
            Price,
            status: "Pending"
        });
        

        await newOrder.save();

        res.status(201).json({ message: "Order Created Successfully", order: newOrder });
    } catch (error) {
        console.error("Error in CreateOrder:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ View All Orders
const View = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('Uid', 'name email') // Populate User details
            .populate('Itemid', 'name description price') // Populate Inventory details
            .sort({ createdAt: -1 }); // Sort latest orders first

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ View Single Order by ID
const SingleView = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate Order ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Order ID format" });
        }

        const order = await Order.findById(id)
            .populate('Uid', 'name email')
            .populate('Itemid', 'name description price');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Order Status
const UpdateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // ✅ Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Order ID format" });
        }

        // ✅ Validate Status Value
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        console.error("Error updating order status:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get Notifications for a User (Approved/Rejected Orders)
const GetUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from decoded token in middleware

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const notifications = await Order.find({
            Uid: userId,
            status: { $in: ["Approved", "Rejected"] }
        })
        .populate('Itemid', 'name description price')
        .sort({ updatedAt: -1 }); // Sort by latest updates

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching user notifications:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { View, SingleView, CreateOrder, UpdateOrderStatus, GetUserNotifications };
