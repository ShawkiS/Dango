"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.giveAutoSignPermission = exports.revokeDomainPermission = exports.getAllDomainsPermissions = exports.setDomainPermission = exports.getDomainPermission = exports.isloggedIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _localforage = _interopRequireDefault(require("localforage"));

var isloggedIn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var ec, iv, key;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _localforage["default"].getItem('ec');

          case 2:
            ec = _context.sent;
            _context.next = 5;
            return _localforage["default"].getItem('iv');

          case 5:
            iv = _context.sent;
            _context.next = 8;
            return _localforage["default"].getItem('key');

          case 8:
            key = _context.sent;

            if (!(ec && iv && key)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", true);

          case 13:
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isloggedIn() {
    return _ref.apply(this, arguments);
  };
}();

exports.isloggedIn = isloggedIn;

var getDomainPermission = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(domain) {
    var domainPermissions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _localforage["default"].getItem('domains');

          case 2:
            domainPermissions = _context2.sent;

            if (!domainPermissions) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", domainPermissions.filter(function (x) {
              return x.domain === domain;
            })[0]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDomainPermission(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDomainPermission = getDomainPermission;

var setDomainPermission = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(domain, isAutoSigning) {
    var domainPermissions, dps;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _localforage["default"].getItem('domains');

          case 2:
            domainPermissions = _context3.sent;

            if (!domainPermissions) {
              _context3.next = 13;
              break;
            }

            dps = domainPermissions.filter(function (x) {
              return x.domain === domain;
            });

            if (!(dps.length === 0)) {
              _context3.next = 10;
              break;
            }

            domainPermissions.push({
              domain: domain,
              isAutoSigning: isAutoSigning
            });

            _localforage["default"].setItem('domains', domainPermissions);

            _context3.next = 11;
            break;

          case 10:
            return _context3.abrupt("return", 'domain already exist');

          case 11:
            _context3.next = 14;
            break;

          case 13:
            _localforage["default"].setItem('domains', [{
              domain: domain,
              isAutoSigning: isAutoSigning
            }]);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setDomainPermission(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setDomainPermission = setDomainPermission;

var getAllDomainsPermissions = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var all;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _localforage["default"].getItem('domains');

          case 2:
            all = _context4.sent;
            return _context4.abrupt("return", all);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getAllDomainsPermissions() {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllDomainsPermissions = getAllDomainsPermissions;

var revokeDomainPermission = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(domain) {
    var domainPermissions;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _localforage["default"].getItem('domains');

          case 2:
            domainPermissions = _context5.sent;
            _context5.next = 5;
            return _localforage["default"].setItem('domains', domainPermissions.filter(function (dp) {
              return dp.domain != domain;
            }));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function revokeDomainPermission(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.revokeDomainPermission = revokeDomainPermission;

var giveAutoSignPermission = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(domain) {
    var domainPermissions, newarr;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _localforage["default"].getItem('domains');

          case 2:
            domainPermissions = _context6.sent;
            newarr = domainPermissions.filter(function (dp) {
              return dp.domain != domain;
            });
            newarr.push({
              domain: domain,
              isAutoSigning: true
            });
            _context6.next = 7;
            return _localforage["default"].setItem('domains', newarr);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function giveAutoSignPermission(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.giveAutoSignPermission = giveAutoSignPermission;