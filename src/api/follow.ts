import axios from "axios"

const baseUrl = 'https://arcane-beyond-08221.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl
})

type followProps = {
  id: number,
  name: string,
  account: string,
  avatar: string,
  followingNum: number
}


axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token")
  
    config.headers["Authorization"] = `Bearer ${authToken}`
  
    return config
  }, (error) => {
    console.log("axios interceptors error", error)
  })

//前十大追蹤
export const getTopFollow = async () => {
  try{
    const res = await axiosInstance.get(`${baseUrl}/followships/topFollow`)
    return res.data.data as followProps[]
  }catch(error){
    console.error("get top follows error: ", error)
  }
}