"use strict";

var _lib = require("./lib");

var _bookService = _interopRequireDefault(require("../services/bookService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_bookService["default"].getBook());
console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar);