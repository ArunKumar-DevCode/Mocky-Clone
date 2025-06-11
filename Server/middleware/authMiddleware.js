import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Read token from cookies only
  const token = req.cookies?.accessToken;
  // Validate : Token valid or not
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export default authMiddleware;