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

var _DangoProxy = _interopRequireDefault(require("./DangoProxy.js"));

var _postmsgRpc = require("postmsg-rpc");

var DANGO_IFRAME_URL = 'http://localhost:3000/';
var HIDE = 'display: none; position: fixed; width:0; height:0; border:0; border:none !important';

var hide = function hide(iframe) {
  return function () {
    return iframe.style = HIDE;
  };
};

var display = function display(iframe) {
  var mobile = false;
  iframe.style = 'border:none border:0; z-index: 500; position: fixed; max-width: 100%;'.concat(" width: ", '440px', "; height: ", '245px', "; ", mobile ? "bottom: 0px; left: 0px;" : "top: 10px; right: 10px");
};

var DangoConnect = /*#__PURE__*/function () {
  function DangoConnect() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, DangoConnect);
    this.iframe = document.createElement('iframe');
    this.iframe.src = DANGO_IFRAME_URL;
    this.iframe.style = HIDE;
    this.iframe.allowTransparency = true;
    this.iframe.frameBorder = 0;
    this.iframeLoadedPromise = new Promise(function (resolve, reject) {
      _this.iframe.onload = function () {
        resolve();
      };
    });
    document.body.appendChild(this.iframe);
    this.postMessage = this.iframe.contentWindow.postMessage.bind(this.iframe.contentWindow);
    this.proxy = new _DangoProxy["default"](this.postMessage);
  }

  (0, _createClass2["default"])(DangoConnect, [{
    key: "_display",
    value: function _display() {
      (0, _postmsgRpc.expose)('display', display(this.iframe));
      (0, _postmsgRpc.expose)('hide', hide(this.iframe));
    }
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._display();

                _context.next = 3;
                return this.iframeLoadedPromise;

              case 3:
                _context.next = 5;
                return this.proxy.sendRPC({
                  method: 'connect'
                });

              case 5:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "getAccountData",
    value: function () {
      var _getAccountData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.iframeLoadedPromise;

              case 2:
                _context2.next = 4;
                return this.proxy.sendRPC({
                  method: 'getAccountData'
                });

              case 4:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAccountData() {
        return _getAccountData.apply(this, arguments);
      }

      return getAccountData;
    }()
  }, {
    key: "signCast",
    value: function () {
      var _signCast = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cast) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._display();

                _context3.next = 3;
                return this.iframeLoadedPromise;

              case 3:
                _context3.next = 5;
                return this.proxy.sendRPC({
                  method: 'sign',
                  cast: cast
                });

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function signCast(_x) {
        return _signCast.apply(this, arguments);
      }

      return signCast;
    }()
  }]);
  return DangoConnect;
}();

var _default = DangoConnect;
exports["default"] = _default;