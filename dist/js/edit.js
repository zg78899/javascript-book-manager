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
  _getUserByToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.get('https://api.marktube.tv/v1/me', {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 3:
            res = _context2.sent;
            return _context2.abrupt("return", res.data);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log('getUserByToken error', _context2.t0);
            return _context2.abrupt("return", null);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getUserByToken.apply(this, arguments);
}

function logout() {
  return _logout.apply(this, arguments);
}

function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var token;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = getToken();

            if (!(token === null)) {
              _context3.next = 4;
              break;
            }

            location = '/login';
            return _context3.abrupt("return");

          case 4:
            _context3.prev = 4;
            _context3.next = 7;
            return axios["delete"]('https://api.marktube.tv/v1/me', {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](4);
            console.log('logout error', _context3.t0);

          case 12:
            _context3.prev = 12;
            localStorage.clear();
            window.location.href = '/login';
            return _context3.finish(12);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 9, 12, 16]]);
  }));
  return _logout.apply(this, arguments);
}

function getBook(_x2) {
  return _getBook.apply(this, arguments);
}

function _getBook() {
  _getBook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(bookId) {
    var token, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = getToken();

            if (!(token === null)) {
              _context4.next = 4;
              break;
            }

            location.href = '/login';
            return _context4.abrupt("return", null);

          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return axios.get("https://api.marktube.tv/v1/book/".concat(bookId), {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 7:
            res = _context4.sent;
            return _context4.abrupt("return", res.data);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](4);
            console.log('getBook error', _context4.t0);
            return _context4.abrupt("return", null);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 11]]);
  }));
  return _getBook.apply(this, arguments);
}

function updateBook(_x3) {
  return _updateBook.apply(this, arguments);
}

function _updateBook() {
  _updateBook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(bookId) {
    var titleElement, messageElement, authorElement, urlElement, title, message, author, url, token;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            titleElement = document.querySelector('#title');
            messageElement = document.querySelector('#message');
            authorElement = document.querySelector('#author');
            urlElement = document.querySelector('#url');
            title = titleElement.value;
            message = messageElement.value;
            author = authorElement.value;
            url = urlElement.value;

            if (!(title === '' || message === '' || author === '' || url === '')) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return");

          case 10:
            token = getToken();

            if (!(token === null)) {
              _context5.next = 14;
              break;
            }

            location = '/login';
            return _context5.abrupt("return");

          case 14:
            _context5.next = 16;
            return axios.patch("https://api.marktube.tv/v1/book/".concat(bookId), {
              title: title,
              message: message,
              author: author,
              url: url
            }, {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateBook.apply(this, arguments);
}

function bindLogoutButton() {
  var btnLogout = document.querySelector('#btn_logout');
  btnLogout.addEventListener('click', logout);
}

function render(book) {
  var titleElement = document.querySelector('#title');
  titleElement.value = book.title;
  var messageElement = document.querySelector('#message');
  messageElement.value = book.message;
  var authorElement = document.querySelector('#author');
  authorElement.value = book.author;
  var urlElement = document.querySelector('#url');
  urlElement.value = book.url;
  var form = document.querySelector('#form-edit-book');
  form.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              event.stopPropagation();
              event.target.classList.add('was-validated');
              _context.prev = 3;
              _context.next = 6;
              return updateBook(book.bookId);

            case 6:
              location.href = "book?id=".concat(book.bookId);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 9]]);
    }));

    return function (_x4) {
      return _ref.apply(this, arguments);
    };
  }());
  var cancelButtonElement = document.querySelector('#btn-cancel');
  cancelButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    location.href = "book?id=".concat(book.bookId);
  });
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var bookId, token, user, book;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // 브라우저에서 id 가져오기
            bookId = new URL(location.href).searchParams.get('id'); // 토큰 체크

            token = getToken();

            if (!(token === null)) {
              _context6.next = 5;
              break;
            }

            location.href = '/login';
            return _context6.abrupt("return");

          case 5:
            _context6.next = 7;
            return getUserByToken(token);

          case 7:
            user = _context6.sent;

            if (!(user === null)) {
              _context6.next = 12;
              break;
            }

            localStorage.clear();
            location = '/login';
            return _context6.abrupt("return");

          case 12:
            _context6.next = 14;
            return getBook(bookId);

          case 14:
            book = _context6.sent;

            if (!(book === null)) {
              _context6.next = 18;
              break;
            }

            alert('서버에서 책 가져오기 실패');
            return _context6.abrupt("return");

          case 18:
            // 받아온 책을 그리기
            render(book);

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _main.apply(this, arguments);
}

document.addEventListener('DOMContentLoaded', main);