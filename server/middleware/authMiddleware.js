const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header (supports both x-auth-token and Authorization Bearer)
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

    // Check if no token
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'No token, authorization denied'
        });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to request (payload contains { id: user._id })
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            error: 'Token is not valid'
        });
    }
};
