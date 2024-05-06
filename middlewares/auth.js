const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ error: "No authentication token provided" });

        const verified = jwt.verify(token, 'passwordKey');
        if (!verified) return res.status(401).json({ error: "Invalid authentication token" });

        req.user = verified.id;
        req.token = token;
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        res.status(500).json({ error: "Server authentication error" });
    }
}

module.exports = auth;
