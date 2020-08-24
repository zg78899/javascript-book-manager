// getToekn 로컬 스토리지로 부터 token이 존재하는지를 확인
function getToken() {
  return localStorage.getItem('token')
}

async function getUserByToken(token) {
  try {
    const res = await axios.get('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (error) {
    console.log('getUserByToken error', error);
    return null;
  }
}

//생성한 책 가져오기
async function getBooks(token) {
  try {
    const res = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log('getBooks error', error);
    return null;
  }
}

//책 목록을 보기
function render(books) {
  const listElement = document.querySelector('#list');

  let count = 0;
  for (let i = 0; i < books.length; i++) {
    var imageArray = new Array("./images/1.jpg","./images/2.jpg","./images/3.jpg",
    "./images/4.jpg","./images/5.jpg","./images/6.jpg",
    "./images/7.jpg","./images/8.jpg","./images/9.jpg",
    "./images/10.jpg","./images/11.jpg","./images/12.jpg",);
    var randomNum  = Math.round(Math.random() * 11);
    const defaultImage = imageArray[0];

    const book = books[i];
    const bookElement = document.createElement('div');
    bookElement.classList.value = 'col-md-4';
    
    bookElement.innerHTML = `
     <div class="card mb-4 shadow-sm">
     <img id="img ${count++}" src=${defaultImage} class="bd-placeholder-img card-img-top" width="100%" height="225" border="0" backrgound-size="100%"/>
       <div class="card-body">
         <p class="card-text">${book.title === '' ? '제목 없음' : book.title}</p>
         <div class="d-flex justify-content-between align-items-center">
           <div class="btn-group">
            <a href="/book?id=${book.bookId}">
              <button 
              type="button" 
              class="btn btn-sm btn-outline-secondary">
              View</button>
            </a>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary btn-delete"
              data-book-id="${book.bookId}"
            >
              Delete
            </button>
           </div>
           <small class="text-muted">${new Date(book.createdAt).toLocaleString()}</small>
         </div>
       </div>
     </div>
     `;
    
    listElement.append(bookElement);
    
    [...bookElement.children].forEach((ele)=>{
     ele.querySelector('.card-img-top').src = imageArray[randomNum];
    });
  }
  
  document.querySelectorAll('.btn-delete').forEach(element => {
    element.addEventListener('click', async e => {
      const bookId = e.target.dataset.bookId;
      try {
        await deleteBook(bookId);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  });
}

//책 삭제 
async function deleteBook(bookId) {
  //토큰 확인을 한번 더 해줌
  const token = getToken();
  if (token === null) {
    location.assign('/login');
    return;
  }
  await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return;
}
//로그아웃을 할때
async function logout() {
  const token = getToken();
  if (token == null) {
    location.assign('/login');
    return;
  }
  try {
    await axios.delete(`https://api.marktube.tv/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log('logout Error', error);
  } finally {
    localStorage.clear();
    location.assign('/login')
  }
}

//로그아웃 버튼 클릭하였을때 이벤트 핸들러 
function bindLogoutbutton() {
  const btnLogout = document.querySelector('#btn_logout');
  btnLogout.addEventListener('click', logout);
}
//메인 함수
async function main() {
  
  //버튼에 연결
  bindLogoutbutton();
  //토큰 체크
  const token = getToken();
  if (token == null) {
    //token이 없다면 로그아웃이 된것이고 login 화면으로 이동한다.
    location.assign('/login');
    return;
  }
  //토큰에서 나의 정보 가져오기 
  const user = await getUserByToken(token);
  if (user === null) {
    localStorage.clear();
    location.assign('/login');
    return;
  }
  //나의 책을 서버에서 가져오기 
  const books = await getBooks(token);
  if (books === null) {
    return;
  }
  // console.log(books);
  // 받아온 책 그리기
  render(books);

}
document.addEventListener('DOMContentLoaded', main);

