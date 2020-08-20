function getToken(){
  return localStorage.getItem('token');
};

async function getUserByToken(token){
  try{
    const res = await axios.get('https://api.marktube.tv/v1/me',{
      headers:{
      Authorization:`Bearer ${token}`
      }
    });
     return res.data;
  }catch(error){
    console.log(error);
    return null;
  }
}

async function getBook(bookId){
  const token = getToken();
  if(token === null){
    location.assign('/login');
    return;
  }
  try{
    const res = await axios.get(`https://api.marktube.tv/v1/book/${bookId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return res.data;
  }catch(error){
    console.log('getBook error',error);
    return null
  }
}


//edit하여 책의 내용을 수정하는 함수 
async function updateBook(bookId){

  const titleElement = document.querySelector('#title');
  const messageElement = document.querySelector('#message');
  const authorElement = document.querySelector('#author');
  const urlElement = document.querySelector('#url');

  const title = titleElement.value;
  const message = messageElement.value;
  const author = authorElement.value;
  const url = urlElement.value;

  if(title === '' || message === '' || author === '' || url === ''){
    return;
  }

  const token = getToken();
  if(token === null){
    location.assign('/login');
    return;
  }
   await axios.patch(`https://api.marktube.tv/v1/book/${bookId}`,{
    title,
    message,
    author,
    url
 },{
   headers:{
    Authorization:`Bearer ${token}`
   }
 });
 
}

function render(book){
  const titleElement = document.querySelector('#title');
  titleElement.value = book.title;
  const messageElement = document.querySelector('#message');
  messageElement.value = book.message;
  const authorElement = document.querySelector('#author');
  authorElement.value = book.author;
  const urlElement = document.querySelector('#url');
  urlElement.value = book.url;

  const form = document.querySelector('#form-edit-book');
  form.addEventListener('submit',async (e)=>{

    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('was-validated');

    try{
      await updateBook(book.bookId);
      location.href = `book?id=${book.bookId}`;
    }catch(error){
      console.log(error);
    }
  });
  const cancelElement = document.querySelector('#btn-cancel');

  cancelElement.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    location.href = `book?id=${book.bookId}`;

  })
} 

//메인 함수 
async function main(){
  //브라우저에서 id가져오기
  const bookId = new URL(location.href).searchParams.get('id');

  //토큰 체크하기
  const token = getToken();
  if(token === null){
    location.href = '/login';
    return;
  }

  //토큰에서 나의 정보가져오기
  const user = await getUserByToken(token);
  if(user === null){
    localStorage.clear();
    location = '/login';
    return;
  }

  //책 서버에서 받아오기
  const book =await getBook(bookId);
  if(book === null){
    alert('책을 가져오는데 실패했습니다.');
    return;
  }
  //받아온 책 그리기
  render(book);

}
document.addEventListener('DOMContentLoader',main);
