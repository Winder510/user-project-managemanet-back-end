import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/register", "/login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  try {
    let token = jwt.sign(payload, key);
    return token;
  } catch (e) {
    console.log(e);
  }

  return "";
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {}
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;

  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated",
    });
  }
};
const checkPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next(); 
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRole.Roles;
    let currentUrl = req.path;
    console.log(req.path);
    if (roles && roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont help permission to access this resources.",
      });
    }
    let canAcess = roles.some((item) => item.url === currentUrl);
    if (canAcess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont help permission to access this resources",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated",
    });
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkPermission,
};
