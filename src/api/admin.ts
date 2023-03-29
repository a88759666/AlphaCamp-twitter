import axios from 'axios';

const baseUrl = 'https://arcane-beyond-08221.herokuapp.com/api/admin';

interface User  {
  id: number,
  account: string,
  email: string,
  name: string,
  avatar: string,
  cover: string,
  introduction: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  tweetsCount: number,
  followersCount: number,
  followingsCount: number,
  tweetsLikedCount: number
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

export const getUsers = async () => {
  const res = await axiosInstance.get(`${baseUrl}/users`)
  return res.data as User[]
}