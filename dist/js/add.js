"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToken() {
  return localStorage.getItem('token');
}

function getUserByToken(_x) {
  return _getUserByToken.apply(this, arguments);
}

function _getUserByToken() {
  _getUserByToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.get('https://api.marktube.tv/v1/me', {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 3:
            res = _context.sent;
            return _context.abrupt("return", res.data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log('getUserByToken error', _context.t0);
            return _context.abrupt("return", null);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getUserByToken.apply(this, arguments);
}

function save(_x2) {
  return _save.apply(this, arguments);
}

function _save() {
  _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var titleElement, messageElement, authorElement, urlElement, title, message, author, url, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.add('was-validated');
            titleElement = document.querySelector('#title');
            messageElement = document.querySelector('#message');
            authorElement = document.querySelector('#author');
            urlElement = document.querySelector('#url');
            title = titleElement.value;
            message = messageElement.value;
            author = authorElement.value;
            url = urlElement.value;

            if (!(title === '' || message === '' || author === '' || url === '')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return");

          case 13:
            token = getToken();

            if (!(token === null)) {
              _context2.next = 17;
              break;
            }

            location.href = '/login';
            return _context2.abrupt("return");

          case 17:
            _context2.prev = 17;
            _context2.next = 20;
            return axios.post('https://api.marktube.tv/v1/book', {
              title: title,
              message: message,
              author: author,
              url: url
            }, {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 20:
            location.href = '/';
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](17);
            console.log('save error', _context2.t0);
            alert('책 추가 실패');

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[17, 23]]);
  }));
  return _save.apply(this, arguments);
}

function bindSaveButton() {
  var form = document.querySelector('#form-add-book');
  form.addEventListener('submit', save);
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var token, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 버튼에 이벤트 연결
            bindSaveButton(); // 토큰 체크

            token = getToken();

            if (!(token === null)) {
              _context3.next = 5;
              break;
            }

            location.href = '/login';
            return _context3.abrupt("return");

          case 5:
            _context3.next = 7;
            return getUserByToken(token);

          case 7:
            user = _context3.sent;

            if (!(user === null)) {
              _context3.next = 12;
              break;
            }

            localStorage.clear();
            location.href = '/login';
            return _context3.abrupt("return");

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _main.apply(this, arguments);
}

document.addEventListener('DOMContentLoaded', main);