import axios from 'axios';
import { Follower, Following, Like, RepliedTweet, Tweet } from 'type';
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
  const authToken = localStorage.getItem("token")
  
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

//取得使用者貼文
export async function getUserTweets(id:string) {
    try {
      const { data } =  await axiosInstance.get(`${baseUrl}/users/${id}/tweets`)
      // console.log(data)
      return data as Tweet[]
    } catch (error) {
      console.error('Get User tweets failed:', error)
    }
}

//取得使用者喜歡的內容
export async function getUserLikes(id:string) {
  try {
    const { data } =  await axiosInstance.get(`${baseUrl}/users/${id}/likes`)
    // console.log(data)
    return data as Like[]
  } catch (error) {
    console.error('Get User likes  failed:', error)
  }
}

//取得使用者回復
export async function getUserRepliedTweets(id:string) {
  try {
    const { data } =  await axiosInstance.get(`${baseUrl}/users/${id}/replied_tweets`)
    // console.log(data)
    return data as RepliedTweet[]
  } catch (error) {
    console.error('Get User likes  failed:', error)
  }
}

//取得使用者追蹤中
export async function getUserFollowing(id:string) {
  try {
    const { data } =  await axiosInstance.get(`${baseUrl}/users/${id}/followings`)
    // console.log(data)
    return data as Following[]
  } catch (error) {
    console.error('Get User Following  failed:', error)
  }
}

//取得追隨使用者人
export async function getUserFollower(id:string) {
  try {
    const { data } =  await axiosInstance.get(`${baseUrl}/users/${id}/followers`)
    // console.log(data)
    return data as Follower[]
  } catch (error) {
    console.error('Get User Follower failed:', error)
  }
}

