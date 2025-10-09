middleware/auth.js
import jwt from 'jsonwebtoken';

export default function verifyJWT(req, res, next) {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.replace('Bearer ', '');
    jwt.verify(token, "random456", (err, decoded) => {
        if (err) {
            console.log("JWT verification failed:", err);
            return res.status(401).json({ message: "Invalid token" });
        }

        if (decoded) {
            req.user = decoded; // decoded should contain { id, role, ... }
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    });
}
