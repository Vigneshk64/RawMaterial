const mongoose = require('mongoose');
const OnlinePay = require('../Module/OnlinePay');

const Insert = async (req, res) => {
    try {
        const { encrypt } = require('../utils/encrypt');

        const { CardName, Cardid, Expiry, UpiId, UpiProvider } = req.body;

        if (CardName && Cardid && Expiry && !UpiId && !UpiProvider) {
            // Card processing logic
            if (!/^\d{13,19}$/.test(Cardid)) {
                return res.status(400).json({ message: "Invalid card number format." });
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(Expiry)) {
                return res.status(400).json({ message: "Invalid expiry date format. Use MM/YY." });
            }

            const encryptedCard = encrypt(Cardid.toString());
            const newOnlinePay = new OnlinePay({
                CardName,
                Cardid: encryptedCard.encryptedData,
                Expiry
            });
            await newOnlinePay.save();

            res.status(201).json({ message: "Card added successfully", payment: newOnlinePay });
        } else if (UpiId && UpiProvider && !CardName && !Cardid) {
            // UPI processing logic
            const fullUpiId = UpiId + UpiProvider.domain;
            if (!/^[\w.-]+@[\w.-]+$/.test(fullUpiId)) {
                return res.status(400).json({ message: "Invalid UPI ID format." });
            }

            const newOnlinePay = new OnlinePay({
                CardName: "",
                Cardid: "",
                Expiry: "",
                UpiId: fullUpiId,
                UpiProvider
            });
            await newOnlinePay.save();

            res.status(201).json({ message: "UPI added successfully", payment: newOnlinePay });
        } else {
            res.status(400).json({ message: "Invalid data." });
        }
    } catch (error) {
        console.error("Error in Insert:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { Insert };
