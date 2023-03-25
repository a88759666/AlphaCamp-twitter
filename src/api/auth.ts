import axios from "axios"

const baseURL = "https://arcane-beyond-08221.herokuapp.com/api"

interface PayloadType {
  account:string,
  password:string
}

export const login = async (payload:PayloadType) => {
  const {account, password} = payload
  try{
    const { data } = await axios.post(`${baseURL}/signin`, {account, password})
    console.log(data)

    const { authToken } = data

    if(authToken){
      return { success: true, ...data}
    }else{
      return data
    }

  }catch(error){
    console.log(error)
    return {success: false}
  }
}

const checkAuth = async () => {
  try{
    const res = await axios.get(`${baseURL}/users`)
  }catch(error){
    console.log(error)
  }
}


