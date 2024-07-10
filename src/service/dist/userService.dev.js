"use strict";

var _connectDB = _interopRequireDefault(require("../configs/connectDB"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var salt = _bcryptjs["default"].genSaltSync(10);

var hashUserPassword = function hashUserPassword(userPassword) {
  var hashPassword = _bcryptjs["default"].hashSync(userPassword, salt);

  return hashPassword;
};

var createNewUser = function createNewUser(email, password, username) {
  var hashPass;
  return regeneratorRuntime.async(function createNewUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hashPass = hashUserPassword(password);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_index["default"].User.create({
            username: username,
            email: email,
            password: password
          }));

        case 4:
          _context.next = 8;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](1);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 6]]);
};

var getUserList = function getUserList() {
  var users;
  return regeneratorRuntime.async(function getUserList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          users = [];
          _context2.next = 3;
          return regeneratorRuntime.awrap(_index["default"].User.findAll());

        case 3:
          users = _context2.sent;
          return _context2.abrupt("return", users);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var deleteUser = function deleteUser(userid) {
  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_index["default"].User.destroy({
            where: {
              id: userid
            }
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getUserById = function getUserById(userid) {
  var user;
  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = {};
          _context4.next = 3;
          return regeneratorRuntime.awrap(_index["default"].User.findOne({
            where: {
              id: userid
            }
          }));

        case 3:
          user = _context4.sent;
          return _context4.abrupt("return", user.dataValues);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var updateUserInfor = function updateUserInfor(id, email, username) {
  return regeneratorRuntime.async(function updateUserInfor$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_index["default"].User.update({
            username: username,
            email: email
          }, {
            where: {
              id: id
            }
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getUserList: getUserList,
  deleteUser: deleteUser,
  getUserById: getUserById,
  updateUserInfor: updateUserInfor
};