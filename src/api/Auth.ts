import axios from 'axios'
interface payloadType {
    account?: string,
    password?: string,
    email?: string
    name?: string
    checkPassword?: string
}
interface editUserSettingType {
    account?: string,
    name?: string,
    password?: string,
    email?: string,
    checkPassword?: string
    userId?: string
}
interface editUserType {
    name?: string
    avatar?: string
    cover?: string
    introduction?: string 
    userId?: string

}

const authUrl = 'https://arcane-beyond-08221.herokuapp.com/api' as string

const axiosInstance = axios.create({
    baseURL: authUrl,
})
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
    },
)

export async function login(payload:payloadType) {
    
    try {
        const { account, password } = payload
        const { data } = await axiosInstance.post(`${authUrl}/signin`, {
            account,
            password
        })
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
        console.error('login failed: 帳號未註冊', error)
        return error
    }
}

export async function register(payload:payloadType) {
    try {
        const { account, name, password, email, checkPassword } = payload
        const { data } = await axiosInstance.post(`${authUrl}/users`,{
            account,
            name,
            password,
            email,
            checkPassword
        })
        const { status } = data
        
        if(status){
            return { 
                success:true, 
                ...data.data 
            }
        } else {
            return data.data
        }
    } catch (error: any) {
        const errorMsg = error.response.data.message
        localStorage.setItem('errorMsg', errorMsg)
        return error
    }
   
}

export async function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
}
export async function checkPermissionUser(id: string) {
    try {
        const { data } = await axiosInstance.get(`${authUrl}/users/${id}`)
        const { account, name, avatar, cover, introduction, followingCount, followerCounts } = data
        return [ id, account, name, avatar, cover, introduction, followingCount, followerCounts ]
    } catch (error) {
        console.error('check permissionUser failed:', error)
    }
    
}

export async function editUserSetting(payload:editUserSettingType) {
    try {
        const { account, name, password, email, checkPassword, userId } = payload
        console.log(userId)
        const { data } = await axiosInstance.put(`${authUrl}/users/${userId}`,{
            account,
            name,
            password,
            email,
            checkPassword
        })
        const { status } = data
        if(status){
            return { 
                success:true, 
                ...data.data 
            }
        } else {
            return data.data
        }
    } catch (error: any) {
        const errorMsg = error.response.data.message
        localStorage.setItem('errorMsg', errorMsg)
        return error
    }
}

export async function editUserModal(payload:editUserType) {
    try {
        const { name, avatar, cover, introduction, userId } = payload
        const { data } = await axiosInstance.put(`${authUrl}/users/${userId}`,{
            name,
            avatar,
            cover,
            introduction
        })
        const { status } = data
        if(status){
            return { 
                success:true, 
                ...data.data 
            }
        } else {
            return data.data
        }
    } catch (error) {
        console.error('edit User Setting failed:', error)
    }
}


