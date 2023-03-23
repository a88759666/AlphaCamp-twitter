import { createContext, useContext } from "react"

const dummydata = [
  {
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  avatar:"https://picsum.photos/300/300?text=2"
  },
  {
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  avatar:"https://picsum.photos/300/300?text=2"
  }
]

export const TweetContext = createContext(dummydata)
export function useTweetContext(){ return useContext(TweetContext)}

interface Props {children: React.ReactNode}

const TweetContextProvider:React.FC<Props> = ({children}) => {
  return(
    <TweetContext.Provider value={dummydata}>
      {children}
    </TweetContext.Provider>
  )
}

export default TweetContextProvider