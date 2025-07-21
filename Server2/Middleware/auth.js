const jwt = require("jsonwebtoken");
const SECRETE_KEY = "NewDB"; // Use environment variables for security

const authUser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ message: "Token not found, access denied" });
    }

    try {
        const decoded = jwt.verify(token, SECRETE_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please log in again" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authUser;
