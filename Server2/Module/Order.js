const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    Uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Itemid: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    NoItem: {  // ✅ Fixed naming consistency (was Noitem)
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""  // ✅ Ensures no undefined values
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true }); // ✅ Enables createdAt and updatedAt fields

module.exports = mongoose.model("Order", OrderSchema);
