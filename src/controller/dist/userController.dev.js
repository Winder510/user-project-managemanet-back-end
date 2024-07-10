"use strict";

var _userApiService = _interopRequireDefault(require("../service/userApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var readFunc = function readFunc(req, res) {
  var page, limit, data, _data;

  return regeneratorRuntime.async(function readFunc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(req.query.page && req.query.limit)) {
            _context.next = 10;
            break;
          }

          page = req.query.page;
          limit = req.query.limit;
          _context.next = 6;
          return regeneratorRuntime.awrap(_userApiService["default"].getUserWithPagination(+page, +limit));

        case 6:
          data = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            EM: data.EM,
            //error message
            EC: data.EC,
            //eroor code
            DT: data.DT //data

          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_userApiService["default"].getAllUser());

        case 12:
          _data = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            EM: _data.EM,
            //error message
            EC: _data.EC,
            //eroor code
            DT: _data.DT //data

          }));

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var createFunc = function createFunc(req, res) {
  var data;
  return regeneratorRuntime.async(function createFunc$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userApiService["default"].createUser(req.body.userData));

        case 3:
          data = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            EM: data.EM,
            //error message
            EC: data.EC,
            //eroor code
            DT: data.DT //data

          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var updateFunc = function updateFunc(req, res) {
  var data;
  return regeneratorRuntime.async(function updateFunc$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_userApiService["default"].updateUser(req.body.userData));

        case 3:
          data = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            EM: data.EM,
            //error message
            EC: data.EC,
            //eroor code
            DT: data.DT //data

          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteFunc = function deleteFunc(req, res) {
  var data;
  return regeneratorRuntime.async(function deleteFunc$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_userApiService["default"].deleteUser(req.body.id));

        case 3:
          data = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            EM: data.EM,
            //error message
            EC: data.EC,
            //eroor code
            DT: data.DT //data

          }));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          }));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getUserAccount = function getUserAccount(req, res) {
  return regeneratorRuntime.async(function getUserAccount$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", res.status(200).json({
            EM: "ok",
            //error message
            EC: 0,
            //eroor code
            DT: _objectSpread({
              access_token: req.token
            }, req.user) //data

          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  readFunc: readFunc,
  createFunc: createFunc,
  updateFunc: updateFunc,
  deleteFunc: deleteFunc,
  getUserAccount: getUserAccount
};