"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _postmsgRpc = require("postmsg-rpc");

var callbackOrThrow = function callbackOrThrow(callback, errMsg) {
  if (callback) {
    callback(errMsg);
  } else {
    throw errMsg instanceof Error ? errMsg : new Error(errMsg);
  }
};

var DangoProviderProxy = /*#__PURE__*/function () {
  function DangoProviderProxy(postMessage) {
    (0, _classCallCheck2["default"])(this, DangoProviderProxy);
    this.postMessage = postMessage;
    this.sendRPC = (0, _postmsgRpc.caller)('send', {
      postMessage: this.postMessage
    });
  }

  (0, _createClass2["default"])(DangoProviderProxy, [{
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, origin, callback) {
        var res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (typeof origin === 'function') {
                  callback = origin;
                  origin = null;
                }

                _context.prev = 1;
                _context.t0 = JSON;
                _context.next = 5;
                return this.sendRPC(req);

              case 5:
                _context.t1 = _context.sent;
                res = _context.t0.parse.call(_context.t0, _context.t1);
                if (callback) callback(undefined, res);
                return _context.abrupt("return", res);

              case 11:
                _context.prev = 11;
                _context.t2 = _context["catch"](1);
                callbackOrThrow(callback, _context.t2);
                return _context.abrupt("return");

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 11]]);
      }));

      function send(_x, _x2, _x3) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);
  return DangoProviderProxy;
}();

var _default = DangoProviderProxy;
exports["default"] = _default;