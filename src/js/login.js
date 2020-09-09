//토큰을 가져옴
function getToken(){
  return localStorage.getItem('token');
}

//로그인 
async function login(e){
  e.preventDefault();
  e.stopPropagation();

const emailElement  = document.querySelector('#email');
const passwordElement = document.querySelector('#password');

const email = emailElement.value;
const password = passwordElement.value;
try{
 const res  = await axios.post('https://api.marktube.tv/v1/me',{
   email,
   password
 });
 const {token} = res.data;
 if(token === undefined){
   return;
 }
 localStorage.setItem('token',token);
 location.assign('/');

}catch(error){
  const data = error.response.data;
  if(data){
    const state = data.error;
    if(state === 'USER_NOT_EXIST'){
      alert('사용자가 존재하지 않습니다.');
    }else if(state === 'PASSWORD_NOT_MATCH'){
      alert('패스워드가 일치하지 않습니다.');
    }
  }
}
}

function bindLoginButton(){
const form  = document.querySelector('#form-login');
form.addEventListener('submit',login)
}
//메인 함수
function main(){
  //버튼의 이벤트 연결
  bindLoginButton();
  //토큰을 체크
  const token = getToken();
  if(token !== null){
    location.assign('/');
    return;
  }

}
document.addEventListener('DOMContentLoaded',main);


