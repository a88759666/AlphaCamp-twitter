import TweetCard from "components/TweetCard";
import ProfileCard from "./ProfileCard";
import ReplyCard from "./ReplyCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfoEditModal from "./UserInfoEditModal";
import { getUserLikes, getUserRepliedTweets, getUserTweets } from "api/tweet";
import { Like, RepliedTweet, Tweet, User } from "type";
import { checkPermissionUser } from "api/Auth";


const MainHeader = (props:{currentUserName: string, currentUserTweetsCount:number}) => {
  const {currentUserName, currentUserTweetsCount} = props
  return(
    <div className="flex py-3 ">
      <BackBtn />
      <div>
        <h5 className=" font-bold ">{currentUserName}</h5>
        <p className="text-[13px] text-[#6C757D]">{currentUserTweetsCount}則推文</p>
      </div>
    </div>
  )
}

export const BackBtn = () => {
  const navigate = useNavigate()
  return(
    <button 
      className=" px-6 hover:opacity-50 cursor-pointer"
      onClick={() => navigate("/home")}>&#8592;
    </button>)
}

type userState = 'user1' | 'user2' 

const MainSector = () => {
  const [currentTab, setCurrentTab] = useState("tweets")
  const [ user, setUser ] = useState<userState>('user1')
  // const [ userData, setUserData ] = useState([])
  const [ show, setShow ] = useState(false)
  const [ ringBell, setRingBell ] = useState(false)
  const [ tweets, setTweets ] = useState<Tweet[]>([])
  const [ repliedTweets, setRepliedTweets ] = useState<RepliedTweet[]>([])
  const [ likes, setLikes ] = useState<Like[]>([])

  const go = useNavigate()

  function handleCloseModal() {
      setShow(false)
  }
  function handleEditModal() {
      setShow(true)
  }
  function handleBellIcon() {
      setRingBell(!ringBell)
  }
  async function getTweetsAsync() {
    try {
      const userId = localStorage.getItem('userId') as string
      const tweets = await getUserTweets(userId)
      if (tweets) {
        setTweets(tweets)
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function getRepliedTweetsAsync() {
    try {
      const userId = localStorage.getItem('userId') as string
      const repliedTweets = await getUserRepliedTweets(userId)
      if (repliedTweets) {
        setRepliedTweets(repliedTweets)
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function getLIkesAsync() {
    try {
      const userId = localStorage.getItem('userId') as string
      const likes = await getUserLikes(userId)
      if (likes) {
        setLikes(likes)
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function checkTokenIsValid() {
    const token = localStorage.getItem('token');
    if (!token) {
      go('/login')
    }
    const userId = localStorage.getItem('userId')
    if(userId) {
      const userData = await checkPermissionUser(userId);
      if (!userData) {
        go('/login')
      } else {
        // setUserData(userData)
        // console.log(userData)
      }
    }
  }
  
  useEffect(() => {
    checkTokenIsValid()
    getTweetsAsync()
    getLIkesAsync()
    getRepliedTweetsAsync()
  },[go])
  
  return <>
    <main className="basis-5/7 border-x ">
      <MainHeader currentUserName="John Doe" currentUserTweetsCount={25} />
      <ProfileCard 
        currentUserName="John Doe" 
        currentUserAccount="JohnDoe" 
        currentUserBio="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." 
        currentUserFollow={34} 
        currentUserFollowed={29}
        coverUrl="https://picsum.photos/300/300?text=1"
        handleEdit={handleEditModal}
        type={user} 
        ringBell={ringBell}
        handleBellIcon={handleBellIcon}
      />
      <div className="flex border-b">
        <button autoFocus className="userPageTab" onClick={() => setCurrentTab("tweets")}>推文</button>
        <button className="userPageTab" onClick={() => setCurrentTab("replies")}>回覆</button>
        <button className="userPageTab" onClick={() => setCurrentTab("likes")}>喜歡的內容</button>
      </div>
      <div className="overflow-scroll">
        {currentTab === "tweets" && Array.isArray(tweets) &&
          tweets.map(tweet => {
            return(
              <TweetCard 
                key={tweet.id}
                postTime={tweet.createdAt}
                tweet={tweet.description}
                likeCount={tweet.likeNum}
                replyCount={tweet.replyNum}
                account={tweet.User?.account}
                avatar={tweet.User?.avatar}
                userName={tweet.User?.name}
              /> 
            )
          })
        }
        {currentTab === "replies" && 
          repliedTweets.map(reply => {
            return(
              <ReplyCard 
                key={reply.Tweet?.TweetId}
                postTime={reply.createdAt}
                tweet={reply.comment}
                account={reply.Tweet?.User?.account}
                avatar={reply.Tweet?.User?.avatar}
                userName={reply.Tweet?.User?.name}
                replyAccount={reply.User?.name}
              /> 
            )
          })
        }
        {currentTab === "likes" && 
          likes.map(like => {
            return(
              <TweetCard 
                key={like.Tweet?.id}
                postTime={like.Tweet?.createdAt}
                tweet={like.Tweet?.description}
                likeCount={like.Tweet?.likeNum}
                isLiked={true}
                replyCount={like.Tweet?.replyNum}
                account={like.Tweet?.User?.account}
                avatar={like.Tweet?.User?.avatar}
                userName={like.Tweet?.User?.name}
              /> 
            )
          })
        }
      </div>
      {show && (
          <UserInfoEditModal 
            onClose={handleCloseModal}
          />
      )}
    </main>
  </>
} 
export default MainSector;
