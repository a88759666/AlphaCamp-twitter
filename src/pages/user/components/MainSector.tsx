import TweetCard from "components/TweetCard";
import ProfileCard from "./ProfileCard";
import ReplyCard from "./ReplyCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfoEditModal from "./UserInfoEditModal";
import { getUserLikes, getUserRepliedTweets, getUserTweets } from "api/tweet";
import { Like, RepliedTweet, Tweet, User } from "type";
import { checkPermissionUser } from "api/Auth";
import { useTweetContext } from "contexts/TweetContextProvider";


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

function getHoursFrom(time:string){
  //拿總共的毫秒差距
  let milliseconds = Date.parse(time) - Date.now()
  //相差的日期天數
  const days = Math.trunc(milliseconds / 86400000)
  milliseconds = days * 86400000 - milliseconds
  //扣掉天數之後剩下得小時差
  const hours = Math.trunc(milliseconds / 3600000)
  milliseconds = hours * 3600000 - milliseconds
  return {
      days,
      hours,
  };
  
}

const MainSector = () => {
  const [currentTab, setCurrentTab] = useState("tweets")
  const [ user, setUser ] = useState<userState>('user1')
  // const [ userData, setUserData ] = useState([])
  const [ show, setShow ] = useState(false)
  const [ ringBell, setRingBell ] = useState(false)
  const [ tweets, setTweets ] = useState<Tweet[]>([])
  const [ repliedTweets, setRepliedTweets ] = useState<RepliedTweet[]>([])
  const [ likes, setLikes ] = useState<Like[]>([])
  const {currentUser} = useTweetContext()

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
        currentUserName={currentUser.name} 
        currentUserAccount={currentUser.account} 
        currentUserBio={currentUser.introduction} 
        currentUserFollow={36} 
        currentUserFollowed={29}
        coverUrl={currentUser.cover}
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
          tweets?.map(tweet => {
            if(tweet.createdAt){
              const {hours, days} = getHoursFrom(tweet.createdAt)
            
              return(
                <TweetCard 
                  key={tweet.id}
                  postTimeHours={hours}
                  postTimeDate={days === 0 ? "" : days * -1 + "天"}
                  tweet={tweet.description}
                  likeCount={tweet.likeNum}
                  replyCount={tweet.replyNum}
                  account={tweet.User?.account}
                  avatar={tweet.User?.avatar}
                  userName={tweet.User?.name}
                  id={tweet.id}
                /> 
              )
            }
          })
        }
        {currentTab === "replies" && 
          repliedTweets.map(reply => {
            if(reply.createdAt){
              const {hours , days} = getHoursFrom(reply.createdAt)
              return(
                <ReplyCard 
                  key={reply.Tweet?.TweetId}
                  postTimeHours={hours}
                  postTimeDate={days === 0 ? "" : days * -1 + "天"}
                  tweet={reply.comment}
                  account={reply.Tweet?.User?.account}
                  avatar={reply.Tweet?.User?.avatar}
                  userName={reply.Tweet?.User?.name}
                  replyAccount={reply.User?.name}
                /> 
              )
            }
          })
        }
        {currentTab === "likes" && 
          likes.map(like => {
            if(like.Tweet?.createdAt){
              const {hours, days} = getHoursFrom(like.Tweet?.createdAt)
              return(
                <TweetCard 
                  key={like.Tweet?.id}
                  postTimeHours={hours}
                  postTimeDate={days === 0 ? "" : days * -1 + "天"}
                  tweet={like.Tweet?.description}
                  likeCount={like.Tweet?.likeNum}
                  isLiked={true}
                  replyCount={like.Tweet?.replyNum}
                  account={like.Tweet?.User?.account}
                  avatar={like.Tweet?.User?.avatar}
                  userName={like.Tweet?.User?.name}
                  id={like.Tweet?.id}
                /> 
              )
            }
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
