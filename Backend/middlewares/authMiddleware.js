const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, please login");
    }

    // Verify token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!verifyToken) {
      res.status(401);
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized, please login");
  }
};

module.exports = protect;
