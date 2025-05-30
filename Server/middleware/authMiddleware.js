import jwt from "jsonwebtoken";

// For Express to read cookies, make sure to use cookie-parser middleware
// app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  // 1. Check Authorization header
  let token = null;

  const authHeader = req?.headers?.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Fallback to token from cookies
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

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
