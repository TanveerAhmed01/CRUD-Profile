const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach decoded user data to request object
        req.user = decoded;
        
        // Call next middleware
        next();
    } catch (error) {
        // Handle token verification errors
        console.error('Error verifying token:', error.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
