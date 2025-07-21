const UserSchema = require('../Module/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "NewDB";

const Insert = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const user = new UserSchema({
            name: name,
            email: email,
            password: secPass,
        });

        const savestud = await user.save();
        res.send(savestud);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const UserSign = async (req, res) => {
    try {
        let success = false;
        const { email, password } = req.body;
        let user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ success, error: "Try to login with correct credentials" });
        }

        console.log("User Data:", user);
        console.log("Received Password:", password);
        console.log("Stored Hashed Password:", user.password);

        const data = { id: user.id };
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const UserGet = async (req, res) => {
    try {
        const uid =req.user.id
        console.log(uid,"............")
        const data = await UserSchema.findById(uid);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { Insert, UserSign,UserGet };
