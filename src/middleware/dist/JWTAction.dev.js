"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var nonSecurePaths = ["/register", "/login", "/logout"];

var createJWT = function createJWT(payload) {
  var key = process.env.JWT_SECRET;

  try {
    var token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRESIN
    });

    return token;
  } catch (e) {}

  return "";
};

var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;

  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
  } catch (e) {}

  return decoded;
};

var checkUserJWT = function checkUserJWT(req, res, next) {
  if (nonSecurePaths.includes(req.path)) return next();
  var cookies = req.cookies;
  var tokenFromHeader = extractToken(req);

  if (cookies && cookies.jwt || tokenFromHeader) {
    var token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    var decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated"
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated"
    });
  }
};

var checkPermission = function checkPermission(req, res, next) {
  if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();

  if (req.user) {
    var email = req.user.email;
    var roles = req.user.groupWithRole.Roles;
    var currentUrl = req.path;

    if (roles && roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont help permission to access this resources."
      });
    }

    var canAcess = roles.some(function (item) {
      return item.url === currentUrl || currentUrl.includes(item.url);
    });

    if (canAcess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont help permission to access this resources"
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated"
    });
  }
};

var extractToken = function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

module.exports = {
  createJWT: createJWT,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkPermission: checkPermission,
  extractToken: extractToken
};