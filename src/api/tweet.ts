import axios from 'axios';

const baseUrl = 'https://arcane-beyond-08221.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl
})

type ResProp = {
  id: number,
  UserId: number,
  description: string,
  createdAt: string,
  updatedAt: string,
  Replies?:ReplyProps[]
}
type ReplyProps = {
    id: number,
    UserId: number,
    TweetId: number,
    comment: string,
    createdAt: string,
    updatedAt: string
}

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")
  
    config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImFjY291bnQiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9zZXBoaW5lIFNhdWVyIiwiYXZhdGFyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vMzIwLzMyMC9oZWFkc2hvdC8_cmFuZG9tPTkyLjM0NzE2MTM1MTMzMzU3IiwiY292ZXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS83MjAvMjQwL2xhbmRzY2FwZT9yYW5kb209OTQuMjEyNTg0ODgyMzg4NjQiLCJpbnRyb2R1Y3Rpb24iOiJ2b2x1cHRhdGlidXMgZHVjaW11cyBjb3JydXB0aSBzdW50IGluIG1hZ25hbSBxdWFzIG9mZmljaWlzIGRvbG9ydW0gcmVwdWRpYW5kYWUiLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMjJUMDk6NTE6MDQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMjJUMDk6NTE6MDQuMDAwWiIsImlhdCI6MTY3OTQ4MDEyMiwiZXhwIjoxNjgyMDcyMTIyfQ.-kORHCr8DxgAmjZgvHJxT0-rpbxk0bh6ADLJrz_-zn0`
  
  return config
  }, (error) => {
    console.log("axios interceptors error", error)
  })

  //瀏覽全部推文
export const getTweets = async () => {
  try {
        const res =  await axiosInstance.get(`${baseUrl}/tweets`)
        return res.data as Array<ResProp> 
    } catch (error) {
        console.error('Get tweets failed:', error)
    }
}

//瀏覽單筆推文
export const getSingleTweet = async (id:number | string) => {
  try{
    const response = await axiosInstance.get(`${baseUrl}/tweets/${id}`)
    return response.data as ResProp 
  }catch(error){
    console.error("get to single tweet error: ", error)
  }
}


//發文
export const postTweet = async (post:string) => {
  try{
    const response = await axiosInstance.post(`${baseUrl}/tweets`, post)
    return response.data.data
  }catch(error){
    console.error("post tweet error: ", error)
  }
}

//瀏覽推文的回覆
export const getReplies = async (id:number | string) => {
  try{
    const response = await axiosInstance.get(`${baseUrl}/tweets/${id}/replies`)
    return response.data
  }catch(error){
    console.error("get replies error: ", error)
  }
}

//回覆貼文
export const replyTweet = async (id:number | string, comment:string) => {
  try{
    const response = await axiosInstance.post(`${baseUrl}/tweets/${id}/replies`,comment)
    return response.data.data 
  }catch(error){
    console.error("Reply tweet error: ", error)
  }
}

//喜歡貼文
export const likeTweet = async (id:number | string) => {
  try{
    const response = await axiosInstance.post(`${baseUrl}/tweets/${id}/like`)
    return response.data.status as string
  }catch(error){
    console.error("like tweet error: ", error)
  }
}

//取消喜歡貼文
export const unlikeTweet = async (id:number | string) => {
  try{
    const response = await axiosInstance.post(`${baseUrl}/tweets/${id}/unlike`)
    return response.data.status as string
  }catch(error){
    console.error("unlike tweet error: ", error)
  }
}