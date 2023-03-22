
import { createContext } from "react"

const dummydata = [
  {
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  url:"https://picsum.photos/300/300?text=2"
  },
  {
  userName:"Apple", 
  account:"Apple", 
  postTime:"3", 
  tweet:"Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.", 
  likeCount:13, 
  replyCount:76,
  url:"https://picsum.photos/300/300?text=2"
  }
]

export const TweetContext = createContext(dummydata)

interface Props {children: React.ReactNode}

const TweetContextProvider:React.FC<Props> = ({children}) => {
  return(
    <TweetContext.Provider value={dummydata}>
      {children}
    </TweetContext.Provider>
  )
}

export default TweetContextProvider