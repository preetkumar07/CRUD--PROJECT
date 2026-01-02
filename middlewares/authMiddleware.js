const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Token verification
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('verifyToken error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ ROLE-BASED access (multiple roles supported)
exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: 'Unauthorized' });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden: insufficient role' });

    next();
  };
};
