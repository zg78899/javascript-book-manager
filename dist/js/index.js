"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// getToekn 로컬 스토리지로 부터 token이 존재하는지를 확인
function getToken() {
  return localStorage.getItem('token');
}

function getUserByToken(_x) {
  return _getUserByToken.apply(this, arguments);
} //생성한 책 가져오기


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

function getBooks(_x2) {
  return _getBooks.apply(this, arguments);
} //책 목록을 보기


function _getBooks() {
  _getBooks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
    var res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return axios.get('https://api.marktube.tv/v1/book', {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 3:
            res = _context3.sent;
            return _context3.abrupt("return", res.data);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log('getBooks error', _context3.t0);
            return _context3.abrupt("return", null);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _getBooks.apply(this, arguments);
}

function render(books) {
  var listElement = document.querySelector('#list');
  var count = 0;

  for (var i = 0; i < books.length; i++) {
    var imageArray = new Array("./src/images/1.jpg", "./src/images/2.jpg", "./src/images/3.jpg", "./src/images/4.jpg", "./src/images/5.jpg", "./src/images/6.jpg", "./src/images/7.jpg", "./src/images/8.jpg", "./src/images/9.jpg", "./src/images/10.jpg", "./src/images/11.jpg", "./src/images/12.jpg");
    var randomNum = Math.round(Math.random() * 11);
    var defaultImage = imageArray[0];
    var book = books[i];
    var bookElement = document.createElement('div');
    bookElement.classList.value = 'col-md-4';
    bookElement.innerHTML = "\n     <div class=\"card mb-4 shadow-sm\">\n     <img id=\"img ".concat(count++, "\" src=").concat(defaultImage, " class=\"bd-placeholder-img card-img-top\" width=\"100%\" height=\"225\" border=\"0\" backrgound-size=\"100%\"/>\n       <div class=\"card-body\">\n         <p class=\"card-text\">").concat(book.title === '' ? '제목 없음' : book.title, "</p>\n         <div class=\"d-flex justify-content-between align-items-center\">\n           <div class=\"btn-group\">\n            <a href=\"/book?id=").concat(book.bookId, "\">\n              <button \n              type=\"button\" \n              class=\"btn btn-sm btn-outline-secondary\">\n              View</button>\n            </a>\n            <button\n              type=\"button\"\n              class=\"btn btn-sm btn-outline-secondary btn-delete\"\n              data-book-id=\"").concat(book.bookId, "\"\n            >\n              Delete\n            </button>\n           </div>\n           <small class=\"text-muted\">").concat(new Date(book.createdAt).toLocaleString(), "</small>\n         </div>\n       </div>\n     </div>\n     ");
    listElement.append(bookElement);

    _toConsumableArray(bookElement.children).forEach(function (ele) {
      ele.querySelector('.card-img-top').src = imageArray[randomNum];
    });
  }

  document.querySelectorAll('.btn-delete').forEach(function (element) {
    element.addEventListener('click', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var bookId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bookId = e.target.dataset.bookId;
                _context.prev = 1;
                _context.next = 4;
                return deleteBook(bookId);

              case 4:
                location.reload();
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }());
  });
} //책 삭제 


function deleteBook(_x4) {
  return _deleteBook.apply(this, arguments);
} //로그아웃을 할때


function _deleteBook() {
  _deleteBook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(bookId) {
    var token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //토큰 확인을 한번 더 해줌
            token = getToken();

            if (!(token === null)) {
              _context4.next = 4;
              break;
            }

            location.assign('/login');
            return _context4.abrupt("return");

          case 4:
            _context4.next = 6;
            return axios["delete"]("https://api.marktube.tv/v1/book/".concat(bookId), {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 6:
            return _context4.abrupt("return");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteBook.apply(this, arguments);
}

function logout() {
  return _logout.apply(this, arguments);
} //로그아웃 버튼 클릭하였을때 이벤트 핸들러 


function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var token;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = getToken();

            if (!(token == null)) {
              _context5.next = 4;
              break;
            }

            location.assign('/login');
            return _context5.abrupt("return");

          case 4:
            _context5.prev = 4;
            _context5.next = 7;
            return axios["delete"]("https://api.marktube.tv/v1/me", {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](4);
            console.log('logout Error', _context5.t0);

          case 12:
            _context5.prev = 12;
            localStorage.clear();
            location.assign('/login');
            return _context5.finish(12);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 9, 12, 16]]);
  }));
  return _logout.apply(this, arguments);
}

function bindLogoutbutton() {
  var btnLogout = document.querySelector('#btn_logout');
  btnLogout.addEventListener('click', logout);
} //메인 함수


function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var token, user, books;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //버튼에 연결
            bindLogoutbutton(); //토큰 체크

            token = getToken();

            if (!(token == null)) {
              _context6.next = 5;
              break;
            }

            //token이 없다면 로그아웃이 된것이고 login 화면으로 이동한다.
            location.assign('/login');
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
            location.assign('/login');
            return _context6.abrupt("return");

          case 12:
            _context6.next = 14;
            return getBooks(token);

          case 14:
            books = _context6.sent;

            if (!(books === null)) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return");

          case 17:
            // console.log(books);
            // 받아온 책 그리기
            render(books);

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _main.apply(this, arguments);
}

document.addEventListener('DOMContentLoaded', main);