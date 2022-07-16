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

var _auth = require("./services/auth");

var _crypto = require("./services/crypto");

var _farcaster = require("./services/farcaster");

var _localforage = _interopRequireDefault(require("localforage"));

var _utils = require("./utils");

var Url = require('url-parse');

var DangoService = /*#__PURE__*/function () {
  function DangoService() {
    (0, _classCallCheck2["default"])(this, DangoService);
    this.display = (0, _postmsgRpc.caller)('display');
    this.hide = (0, _postmsgRpc.caller)('hide');
  }

  (0, _createClass2["default"])(DangoService, [{
    key: "start",
    value: function start(login, connect, sign, onClose) {
      this.login = login;
      this.connect = connect;
      this.sign = sign;
      this.onClose = onClose;
      (0, _postmsgRpc.expose)('send', this.providerRelay.bind(this), {
        postMessage: window.parent.postMessage.bind(window.parent)
      });
    }
  }, {
    key: "displayIframe",
    value: function () {
      var _displayIframe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.display());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function displayIframe() {
        return _displayIframe.apply(this, arguments);
      }

      return displayIframe;
    }()
  }, {
    key: "hideIframe",
    value: function () {
      var _hideIframe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var root;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                root = document.getElementById('__next').innerHTML = "";
                if (root) root.innerHTML = "";
                return _context2.abrupt("return", this.hide());

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hideIframe() {
        return _hideIframe.apply(this, arguments);
      }

      return hideIframe;
    }()
  }, {
    key: "providerRelay",
    value: function () {
      var _providerRelay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(message) {
        var _this = this;

        var domain, domainPermission, responsePromise;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                domain = new Url(document.referrer).host;
                _context7.next = 3;
                return (0, _auth.getDomainPermission)(domain);

              case 3:
                domainPermission = _context7.sent;
                responsePromise = new Promise( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
                    var isLogin, result, loadingFlag, checkInterval, _result, _result2, signature, _loadingFlag, _checkInterval;

                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!(message.method === 'connect')) {
                              _context6.next = 13;
                              break;
                            }

                            _context6.next = 3;
                            return (0, _auth.isloggedIn)();

                          case 3:
                            isLogin = _context6.sent;

                            if (isLogin) {
                              _context6.next = 12;
                              break;
                            }

                            loadingFlag = false;
                            _context6.next = 8;
                            return _this.login();

                          case 8:
                            window.addEventListener("storage", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                              var isLogin, isError;
                              return _regenerator["default"].wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      isLogin = localStorage.getItem('isLogin');
                                      isError = localStorage.getItem('isError');

                                      if (isLogin) {
                                        result = true;
                                      }

                                      if (isError) {
                                        result = false;
                                      }

                                      loadingFlag = true;

                                    case 5:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            })));
                            checkInterval = setInterval( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                              return _regenerator["default"].wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      if (loadingFlag) {
                                        _context4.next = 2;
                                        break;
                                      }

                                      return _context4.abrupt("return");

                                    case 2:
                                      clearInterval(checkInterval);
                                      (0, _auth.setDomainPermission)((0, _utils.getIframeParentUrl)(), false);
                                      localStorage.removeItem("isError");
                                      document.getElementById('__next').innerHTML = "";
                                      resolve(result);

                                    case 7:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4);
                            })), 1000);
                            _context6.next = 13;
                            break;

                          case 12:
                            _this.connect();

                          case 13:
                            if (!(message.method === 'getAccountData')) {
                              _context6.next = 26;
                              break;
                            }

                            if (!domainPermission) {
                              _context6.next = 25;
                              break;
                            }

                            _context6.t0 = _farcaster.getUserDirectory;
                            _context6.next = 18;
                            return _localforage["default"].getItem('address');

                          case 18:
                            _context6.t1 = _context6.sent;
                            _context6.next = 21;
                            return (0, _context6.t0)(_context6.t1);

                          case 21:
                            _result = _context6.sent;
                            resolve(_result);
                            _context6.next = 26;
                            break;

                          case 25:
                            resolve('Please use .coneect() first to get access to the user account');

                          case 26:
                            if (!(message.method === 'sign')) {
                              _context6.next = 48;
                              break;
                            }

                            if (!domainPermission) {
                              _context6.next = 45;
                              break;
                            }

                            if (!(0, _utils.verifyCast)(message.cast)) {
                              _context6.next = 42;
                              break;
                            }

                            if (!domainPermission.isAutoSigning) {
                              _context6.next = 36;
                              break;
                            }

                            _context6.next = 32;
                            return (0, _crypto.signCast)(message.cast);

                          case 32:
                            signature = _context6.sent;
                            resolve(signature);
                            _context6.next = 40;
                            break;

                          case 36:
                            _loadingFlag = false;
                            window.addEventListener("storage", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                              var signature, isError;
                              return _regenerator["default"].wrap(function _callee5$(_context5) {
                                while (1) {
                                  switch (_context5.prev = _context5.next) {
                                    case 0:
                                      signature = localStorage.getItem('signature');
                                      isError = localStorage.getItem('isError');

                                      if (signature) {
                                        _result2 = signature;
                                      }

                                      if (isError) {
                                        _result2 = false;
                                      }

                                      _loadingFlag = true;
                                      _context5.next = 7;
                                      return _this.hideIframe();

                                    case 7:
                                    case "end":
                                      return _context5.stop();
                                  }
                                }
                              }, _callee5);
                            })));

                            _this.sign(message.cast);

                            _checkInterval = setInterval(function () {
                              if (!_loadingFlag) return;
                              clearInterval(_checkInterval);
                              (0, _auth.setDomainPermission)(domain, false);
                              localStorage.removeItem("isError");
                              localStorage.removeItem("singture");
                              resolve(_result2);
                            }, 1000);

                          case 40:
                            _context6.next = 43;
                            break;

                          case 42:
                            resolve('You can only ask for cast singtures.');

                          case 43:
                            _context6.next = 46;
                            break;

                          case 45:
                            resolve('Please use .coneect() first.');

                          case 46:
                            _context6.next = 49;
                            break;

                          case 48:
                            resolve();

                          case 49:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context7.t0 = JSON;
                _context7.next = 8;
                return responsePromise;

              case 8:
                _context7.t1 = _context7.sent;
                return _context7.abrupt("return", _context7.t0.stringify.call(_context7.t0, _context7.t1));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function providerRelay(_x) {
        return _providerRelay.apply(this, arguments);
      }

      return providerRelay;
    }()
  }]);
  return DangoService;
}();

var _default = DangoService;
exports["default"] = _default;