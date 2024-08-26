import User from "../controllers/users/user.model.js";
import JWT from "../utils/jwt.js";

export default {
  UserAuth: async (req, res,next) => {
    try {
      const token = req.headers.token; // Expecting 'Bearer TOKEN'
      if (!token) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Verify token
      const decoded = JWT.VERIFY(token);

      // Find the user by decoded ID
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach user to request object
      req.user = user;
      req.id = decoded.id;
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  },
  UserModifyAuth: async (req, res, next) => {
    try {
      
      if (req.id.toString() !== req.params.id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to modify this data" });
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
