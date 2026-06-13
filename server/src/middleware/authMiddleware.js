import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (_err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;

export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        console.warn('[adminMiddleware] No req.user found — authMiddleware may not have run.');
        return res.status(401).json({ message: "Unauthorized: No user session" });
    }
    if (req.user.role === 'admin') {
        next();
    } else {
        console.warn(`[adminMiddleware] Access denied. User role: "${req.user.role}", expected "admin"`);
        res.status(403).json({ message: "Access denied: Admin only" });
    }
};
