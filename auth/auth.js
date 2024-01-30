import jwt from "jsonwebtoken";
import Blocklist from "../models/Blocklist.js";
export const checkToken = async (req, res, next) => {
  // bo qua login voi register
  if (
    req.url.toLowerCase().trim() == "users/login" ||
    req.url == "users/register"
  ) {
    next();
    return;
  }
  // other requests
  // get and validate token
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    // check xem token đã ở trong blacklist chưa nếu rồi thì bỏ qua
    const isTokenBlocked = await Blocklist.findOne({ token }).exec();
    if (isTokenBlocked) {
      res.status(401).json({
        message: "Token is blacklisted",
      });
    } else {
      // verify token
      const jwtObj = jwt.verify(token, process.env.JWT_SECRET);
      const isExpired = Date.now() >= jwtObj.exp * 1000;
      if (isExpired) {
        res.status(500).json({
          message: "Token is expired",
        });
      } else {
        // trả về userId và token để làm những việc tiếp xem
        req.userId = jwtObj.data.id;
        req.token = token;
        next();
        return;
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
