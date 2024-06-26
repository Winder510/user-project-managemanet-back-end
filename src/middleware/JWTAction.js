import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/register", "/login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  try {
    let token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    console.log(token);
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
  let tokenFromHeader = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
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
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
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
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkPermission,
  extractToken,
};
