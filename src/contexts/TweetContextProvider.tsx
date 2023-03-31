import { createContext, useContext, useEffect, useState } from "react"
import jwt_decode, {JwtPayload} from "jwt-decode"

type JWT = {
  id: number,
  account: string,
  email: string,
  name: string,
  avatar: string,
  cover: string,
  introduction: string,
  createdAt: string,
  updatedAt: string,
  iat: number,
  exp: number
}

type defaultAuthContextType = {
  isAuthenticated: boolean,
  currentUser: JWT,
}



const defaultAuthContext ={
  isAuthenticated: false,  
  currentUser:  {
    account: "",
    avatar: "",
    cover: "",
    createdAt: "",
    email: "",
    exp:0,
    iat: 0,
    id: 0,
    introduction: "",
    name: "",
    updatedAt: ""
  }
}




export const TweetContext = createContext<defaultAuthContextType>(defaultAuthContext)
export function useTweetContext() { 
  return useContext(TweetContext)
}

interface Props {children: React.ReactNode}

const TweetContextProvider:React.FC<Props> = ({children}) => {
  const [payload, setPayload] = useState<JWT >(defaultAuthContext.currentUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const authToken = localStorage.getItem("token")
    if(authToken){
      const tempPayload = jwt_decode(authToken) as JWT
      if(tempPayload){
        setPayload(tempPayload)
        setIsAuthenticated(true)
      }
    }else{
      setIsAuthenticated(false);
      return;
    }
  },[])


  return <>
        <TweetContext.Provider value={{isAuthenticated: isAuthenticated,  currentUser:payload }}>
            { children }
        </TweetContext.Provider>
    </>
}

export default TweetContextProvider