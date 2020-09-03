"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//토큰을 가져옴
function getToken() {
  return localStorage.getItem('token');
} //로그인 


function login(_x) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var emailElement, passwordElement, email, password, res, token, data, state;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            e.stopPropagation();
            emailElement = document.querySelector('#email');
            passwordElement = document.querySelector('#password');
            email = emailElement.value;
            password = passwordElement.value;
            _context.prev = 6;
            _context.next = 9;
            return axios.post('https://api.marktube.tv/v1/me', {
              email: email,
              password: password
            });

          case 9:
            res = _context.sent;
            token = res.data.token;

            if (!(token === undefined)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return");

          case 13:
            localStorage.setItem('token', token);
            location.assign('/');
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](6);
            data = _context.t0.response.data;

            if (data) {
              state = data.error;

              if (state === 'USER_NOT_EXIST') {
                alert('사용자가 존재하지 않습니다.');
              } else if (state === 'PASSWORD_NOT_MATCH') {
                alert('패스워드가 일치하지 않습니다.');
              }
            }

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 17]]);
  }));
  return _login.apply(this, arguments);
}

function bindLoginButton() {
  var form = document.querySelector('#form-login');
  form.addEventListener('submit', login);
} //메인 함수


function main() {
  //버튼의 이벤트 연결
  bindLoginButton(); //토큰을 체크

  var token = getToken();

  if (token !== null) {
    location.assign('/');
    return;
  }
}

document.addEventListener('DOMContentLoaded', main);