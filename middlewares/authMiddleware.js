const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request
    req.user = { id: decoded.id }; // Better to avoid overwriting req.body

    next();
  } catch (error) {
    console.error("JWT Middleware Error:", error.message);

    const statusCode = error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ? 401 : 500;

    res.status(statusCode).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token expired"
          : error.name === "JsonWebTokenError"
          ? "Invalid token"
          : "Authentication failed",
    });
  }
};
