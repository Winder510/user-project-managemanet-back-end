"use strict";

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createNewRoles = function createNewRoles(roles) {
  var curRoles, persists;
  return regeneratorRuntime.async(function createNewRoles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_index["default"].Role.findAll({
            attributes: ["url", "description"],
            raw: true
          }));

        case 3:
          curRoles = _context.sent;
          persists = roles.filter(function (_ref) {
            var url1 = _ref.url;
            return !curRoles.some(function (_ref2) {
              var url2 = _ref2.url;
              return url1 === url2;
            });
          });

          if (!(persists.length === 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            EM: "Nothing to save",
            //error message
            EC: "0",
            //eroor code
            DT: []
          });

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_index["default"].Role.bulkCreate(persists));

        case 9:
          return _context.abrupt("return", {
            EM: "Create success: ".concat(persists.length, " roles"),
            //error message
            EC: "0",
            //eroor code
            DT: [] //data

          });

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var getRoleWithPagination = function getRoleWithPagination(page, limit) {
  var offset, _ref3, count, rows, plainRows, totalPages, data;

  return regeneratorRuntime.async(function getRoleWithPagination$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          offset = (page - 1) * limit;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_index["default"].Role.findAndCountAll({
            offset: offset,
            limit: +limit,
            attributes: ["id", "url", "description"]
          }));

        case 4:
          _ref3 = _context2.sent;
          count = _ref3.count;
          rows = _ref3.rows;
          plainRows = rows.map(function (row) {
            return row.get({
              plain: true
            });
          });
          totalPages = Math.ceil(+count / +limit);
          data = {
            totalRows: count,
            totalPages: totalPages,
            data: plainRows
          };
          return _context2.abrupt("return", {
            EM: "success",
            //error message
            EC: 0,
            //eroor code
            DT: data //data

          });

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var deleteRole = function deleteRole(id) {
  return regeneratorRuntime.async(function deleteRole$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_index["default"].Role.destroy({
            where: {
              id: id
            }
          }));

        case 3:
          return _context3.abrupt("return", {
            EM: "delete success",
            //error message
            EC: "0",
            //eroor code
            DT: "" //data

          });

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            EM: "Error from server",
            //error message
            EC: "-1",
            //eroor code
            DT: "" //data

          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = {
  createNewRoles: createNewRoles,
  getRoleWithPagination: getRoleWithPagination,
  deleteRole: deleteRole
};