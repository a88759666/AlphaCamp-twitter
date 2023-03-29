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

type followStatus = {
    status:string,
    data?: follower,
    message?:string
  }
type follower = {
    followerId: number,
    followingId: number,
    updatedAt: string,
    createdAt: string
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

//追蹤別人
export const follow = async (id:number) => {
  try{
    const res = await axiosInstance.post(`${baseUrl}/followships`, {id})
    return res.data.data as follower
  }catch(error){
    console.error("follow error: ", error)
  }
}

export const unfollow = async (id:number) => {
  try{
    const res = await axiosInstance.delete(`${baseUrl}/followships/${id}`)
    return res.data.data as follower
  }catch(error){
    console.error("unfollow error:", error)
  }
}