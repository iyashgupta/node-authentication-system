var jwt = require('jsonwebtoken');

const UserAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if the header exists
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized: No token provided", status: false });
  }

  // Token is usually in the format "Bearer <token>", so split it by space
  const token = authHeader.split(" ")[1]; // Extract the token

  // Check if the token is present
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Invalid token format", status: false });
  }

  // Verify the token using the secret from the environment variable
  jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token", status: false });
    }

    console.log("Decoded token:", decoded)
    req.body = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = UserAuthMiddleware;
