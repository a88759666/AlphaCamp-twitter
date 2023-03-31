import axios from 'axios';
import { AdminTweetList, AdminUser } from 'type';

const baseUrl = 'https://arcane-beyond-08221.herokuapp.com/api/';

interface payloadType {
  account?: string,
  password?: string,
}


const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token")
  
    config.headers["Authorization"] = `Bearer ${authToken}`
  
    return config
  }, (error) => {
    console.log("axios interceptors error", error)
})

export async function adminLogin(payload:payloadType) {
    
  try {
      const { account, password } = payload
      const { data } = await axiosInstance.post(`${baseUrl}/signin`, {
          account,
          password
      })
      // console.log(data)
      const { token, user } = data.data
      const { id } = user
      
      if(token) {
          return {
              success: true,
              ...data.data,
              id
          }
      } else {
          return data.data
      }
  } catch (error) {
      console.error('login admin failed: 帳號未註冊', error)
      return error
  }
}


export async function adminLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}

export async function adminGetTweets() {
  try {
      const res =  await axiosInstance.get(`${baseUrl}/admin/tweets`)
      return res.data as AdminTweetList[]
      
  } catch (error) {
      console.error('Get tweets failed:', error)
  }
}

export async function adminDeleteTweets(id: number) {
  try {
      const res =  await axiosInstance.delete(`${baseUrl}/admin/tweets/${id}`)
      return res.data as AdminTweetList[]
  } catch (error) {
      console.error('delete tweets failed:', error)
  }
}


export const getUsers = async () => {
  try{
    const res = await axiosInstance.get(`${baseUrl}/admin/users`)
    return res.data as AdminUser[]
  }catch(error){
    console.error("get Users error: ", error)
  }
}
