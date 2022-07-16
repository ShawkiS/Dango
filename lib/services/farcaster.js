"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDirectory = exports.isFarcasterUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var isFarcasterUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(address) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _axios["default"].get("https://guardian.farcaster.xyz/origin/directory/".concat(address)).then(function () {
              return true;
            })["catch"](function () {
              return false;
            });
            return _context.abrupt("return", result);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isFarcasterUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isFarcasterUser = isFarcasterUser;

var getUserDirectory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(address) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _axios["default"].get("https://guardian.farcaster.xyz/origin/directory/".concat(address));

          case 2:
            _context2.next = 4;
            return _context2.sent.data;

          case 4:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserDirectory(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserDirectory = getUserDirectory;