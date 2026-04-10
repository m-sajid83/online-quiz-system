const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
        console.log("ERROR:", error);
        return res.status(401).json({ message: error.message });
      }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// 👑 Admin-only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { protect, adminOnly };