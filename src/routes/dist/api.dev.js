"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _apiController = _interopRequireDefault(require("../controller/apiController"));

var _userController = _interopRequireDefault(require("../controller/userController"));

var _groupController = _interopRequireDefault(require("../controller/groupController"));

var _JWTAction = require("../middleware/JWTAction");

var _RoleController = _interopRequireDefault(require("../controller/RoleController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var initApiRoutes = function initApiRoutes(app) {
  // rest api
  // get - R , Post - c , put -u , delete- d
  //router.all("*", checkUserJWT, checkPermission);
  router.get("/account", _userController["default"].getUserAccount); // check lai token moi lan refresh

  router.post("/register", _apiController["default"].handleRegister);
  router.post("/logout", _apiController["default"].handleLogout);
  router.post("/login", _apiController["default"].handleLogin); // usser

  router.get("/user/read", _userController["default"].readFunc); // de lay duoc page & limit sai req.querry

  router.post("/user/create", _userController["default"].createFunc);
  router.put("/user/update", _userController["default"].updateFunc);
  router["delete"]("/user/delete", _userController["default"].deleteFunc); //role

  router.get("/role/read", _RoleController["default"].readFunc);
  router.post("/role/create", _RoleController["default"].createFunc);
  router.put("/role/update", _RoleController["default"].updateFunc);
  router["delete"]("/role/delete", _RoleController["default"].deleteFunc); // group

  router.get("/group/read", _groupController["default"].readFunc);
  return app.use("/api/v1/", router);
};

var _default = initApiRoutes;
exports["default"] = _default;