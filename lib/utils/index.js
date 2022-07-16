"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCast = exports.getIframeParentUrl = exports.classNames = exports.str2ab = void 0;

var str2ab = function str2ab(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);

  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

exports.str2ab = str2ab;

var classNames = function classNames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(Boolean).join(' ');
};

exports.classNames = classNames;

var getIframeParentUrl = function getIframeParentUrl() {
  var url = window.location != window.parent.location ? document.referrer : document.location.href;
  url = url.replace(/.+\/\/|www.|\..+/g, '');
  return url.substring(0, url.length - 1);
};

exports.getIframeParentUrl = getIframeParentUrl;

var verifyCast = function verifyCast(cast) {
  if (Object.hasOwn(cast, 'type') && Object.hasOwn(cast, 'publishedAt') && Object.hasOwn(cast, 'sequence') && Object.hasOwn(cast, 'username') && Object.hasOwn(cast, 'address') && Object.hasOwn(cast, 'prevMerkleRoot') && Object.hasOwn(cast, 'data')) {
    return true;
  } else {
    return false;
  }
};

exports.verifyCast = verifyCast;