const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  // Check token exists
  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    // Remove "Bearer "
    token = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, "mysecretkey123");

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = { protect };