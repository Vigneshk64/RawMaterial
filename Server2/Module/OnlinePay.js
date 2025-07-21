const mongoose = require('mongoose');
const { Schema } = mongoose;

const OnlinePaySchema = new Schema({
    CardName: { type: String, required: true },
    Cardid: { type: String, required: true },
    Expiry: { type: String, default: "" }
}, { timestamps: true });


// ✅ Exporting the model correctly
module.exports = mongoose.model('OnlinePay', OnlinePaySchema);
