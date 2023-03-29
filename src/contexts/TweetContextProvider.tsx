import { createContext, useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

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

const defaultAuthContext ={
  isAuthenticated: false,  
  currentUser: {} || null
}

const friends = [
  {
    id: 1,
    name: 'Apple',
    account: '@appl3',
    time: '3 小時',
    avatar: 'https://picsum.photos/300/300?text=1',
    showText: true,
    text: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum',
    showFollow: false,
    isFollowing: false,
    showIcon: true,
  },
  {
    id: 2,
    name: 'dfrre',
    account: '@rgtyl3',
    time: '3 小時',
    avatar: 'https://picsum.photos/300/300?text=2',
    showText: true,
    text: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum',
    showFollow: false,
    isFollowing: true,
    showIcon: true,
  },
]
const dummydata = [
  {
  id:1,
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  avatar:"https://picsum.photos/300/300?text=2"
  },
  {
  id:2,
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  avatar:"https://picsum.photos/300/300?text=2"
  }
]


export const TweetContext = createContext(defaultAuthContext)
export function useTweetContext() { 
  return useContext(TweetContext)
}

interface Props {children: React.ReactNode}

const TweetContextProvider:React.FC<Props> = ({children}) => {
  const [payload, setPayload] = useState<JWT | {} | null>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const authToken = localStorage.getItem("token")
    if(authToken){
      const tempPayload = jwt_decode(authToken) 
      if(tempPayload){
        setPayload(tempPayload)
      }
    }else{
      setIsAuthenticated(false);
      setPayload(null);
      return;
    }
  },[])


  return <>
        <TweetContext.Provider value={{isAuthenticated: isAuthenticated,  currentUser:payload}}>
            { children }
        </TweetContext.Provider>
    </>
}

export default TweetContextProvider
