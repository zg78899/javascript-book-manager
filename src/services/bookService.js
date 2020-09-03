const BOOK_API_URL ="https://api.marktube.tv/v1/book";

function getToken(){
  return localStorage.get('token');
}
const token = getToken();
if(token === null){
  location.href = '/login';
  return;
}

export default class bookService{
  static async getBooks(token){
    return await axios.get(BOOK_API_URL,{
      headers:{
        Authorization:` Bearer ${token}`
      }
    });
  }
  static async getBook(token,bookId){
    return await axios.get(`${BOOK_API_URL}/${bookId}`,{
      headers:{
        Authorization:` Bearer ${token}`
      }
    });
  }
  static async deleteBook(token,bookId){
    return await axios.delete(`${BOOK_API_URL}/${bookId}`,{
      headers:{
        Authorization:` Bearer ${token}`
      }
    })
  }
  static async addBook(token,book){
    return await axios.post(BOOK_API_URL,book,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  static async updateBook(token,book,bookId){
    return await axios.patch(`${BOOK_API_URL}/${bookId}`,book,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
}