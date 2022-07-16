"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signCast = exports.importWallet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ethers = require("ethers");

var _localforage = _interopRequireDefault(require("localforage"));

var _utils = require("../utils");

var _farcaster = require("./farcaster");

var _keccak = require("@ethersproject/keccak256");

var _require = require("@ethersproject/strings"),
    toUtf8Bytes = _require.toUtf8Bytes;

var _createWCKey = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var key;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return window.crypto.subtle.generateKey({
              name: "AES-CBC",
              length: 256
            }, true, ["encrypt", "decrypt"]);

          case 2:
            key = _context.sent;

            _localforage["default"].setItem('key', key);

            return _context.abrupt("return", key);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _createWCKey() {
    return _ref.apply(this, arguments);
  };
}();

var importWallet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(seedphrase) {
    var key, account, address, isFcUser, privateKey, enc, iv, encryptedPrivateKey;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _createWCKey();

          case 2:
            key = _context2.sent;
            account = _ethers.Wallet.fromMnemonic(seedphrase, "m/44'/60'/0'/0/1230940800");
            address = account.address;
            _context2.next = 7;
            return (0, _farcaster.isFarcasterUser)(address);

          case 7:
            isFcUser = _context2.sent;

            if (!isFcUser) {
              _context2.next = 21;
              break;
            }

            _localforage["default"].setItem('address', address);

            privateKey = account.privateKey;
            enc = new TextEncoder();
            iv = window.crypto.getRandomValues(new Uint8Array(16));

            _localforage["default"].setItem('iv', iv);

            _context2.next = 16;
            return window.crypto.subtle.encrypt({
              name: "AES-CBC",
              iv: iv
            }, key, enc.encode(privateKey));

          case 16:
            encryptedPrivateKey = _context2.sent;

            _localforage["default"].setItem('ec', window.btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedPrivateKey))));

            return _context2.abrupt("return", true);

          case 21:
            return _context2.abrupt("return", false);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function importWallet(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.importWallet = importWallet;

var signCast = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cast) {
    var key, ec, iv, decrypted, dec, signer, merkleRoot, signedCast;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _localforage["default"].getItem('key');

          case 2:
            key = _context3.sent;
            _context3.next = 5;
            return _localforage["default"].getItem('ec');

          case 5:
            ec = _context3.sent;
            _context3.next = 8;
            return _localforage["default"].getItem('iv');

          case 8:
            iv = _context3.sent;
            _context3.next = 11;
            return window.crypto.subtle.decrypt({
              name: "AES-CBC",
              iv: iv
            }, key, (0, _utils.str2ab)(window.atob(ec)));

          case 11:
            decrypted = _context3.sent;
            dec = new TextDecoder();
            signer = new _ethers.Wallet(dec.decode(decrypted));
            merkleRoot = (0, _keccak.keccak256)(toUtf8Bytes(JSON.stringify(cast)));
            _context3.t0 = cast;
            _context3.t1 = merkleRoot;
            _context3.next = 19;
            return signer.signMessage(merkleRoot);

          case 19:
            _context3.t2 = _context3.sent;
            signedCast = {
              body: _context3.t0,
              merkleRoot: _context3.t1,
              signature: _context3.t2
            };
            return _context3.abrupt("return", signedCast);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function signCast(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.signCast = signCast;