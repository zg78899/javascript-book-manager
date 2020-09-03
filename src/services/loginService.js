import axios from 'axios';

const USER_API_URL  = 'http;//api.marktube.tv.v1/me';

export default class loginService{
  static async login(user){
    return await axios.post(USER_API_URL,user
    )
  };
  static async logout(token){
    return await axios.delete(USER_API_URL,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
}