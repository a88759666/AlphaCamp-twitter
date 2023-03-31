import TweetCard from "components/TweetCard";
import ProfileCard from "./ProfileCard";
import ReplyCard from "./ReplyCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfoEditModal from "./UserInfoEditModal";
import { getUserLikes, getUserRepliedTweets, getUserTweets } from "api/tweet";
import { Like, RepliedTweet, Tweet } from "type";
import { checkPermissionUser } from "api/Auth";
import { useTweetContext } from "contexts/TweetContextProvider";
import { getHoursFrom } from "pages/home/components/MainPage";
import "styles/scrollbar.css"

const MainHeader = (props:{currentUserName?: string, currentUserTweetsCount:number}) => {
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
  const { currentUser } = useTweetContext()
  function goBackUser() {
    const currentUserId = currentUser.id as unknown as string
    console.log(currentUserId)
    navigate("/home")
    localStorage.setItem('userId', currentUserId)
  }
  return(
    <button 
      className=" px-6 hover:opacity-50 cursor-pointer"
      onClick={goBackUser}>&#8592;
    </button>)
}

type userState = 'user1' | 'user2' 

type userData = {
  UserId?: string,
  account?: string,
  name?: string,
  avatar?: string,
  description?: string,
  followingCount?: number, 
  followerCounts?: number
}
const MainSector = () => {
  const [currentTab, setCurrentTab] = useState("tweets")
  const [ user, setUser ] = useState<userState>('user2')
  const [ userData, setUserData ] = useState<userData | null>(null)
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
  
  useEffect(() => {
    async function checkTokenIsValid() {
      const token = localStorage.getItem('token');
      if (!token) {
        go('/login')
      }
      const userId = localStorage.getItem('userId')
      if(userId) {
        const res = await checkPermissionUser(userId)
        if (!res) {
          go('/login')
        } else {
          const userdata = {
            UserId: res[0],
            account: res[1],
            name: res[2],
            avatar: res[3],
            description: res[5],
            followingCount: res[6],
            followerCounts: res[7]
          }
          setUserData(userdata) 
          console.log(userData)
        }
      }
    }
    checkTokenIsValid()
    getTweetsAsync()
    getLIkesAsync()
    getRepliedTweetsAsync()
  },[go, userData])

  function getTimeTransForm(tragetTime:string){
  //timestamp跟現在時間差
    let time;
    if(tragetTime){
      const {hours, days} = getHoursFrom(tragetTime)
      if(hours !== 0){
        time = days === 0 ?  (hours + "小時") : days + "天" + hours + "小時"
      }else if(hours === 0 && days === 0){
        time = "就在最近"
      }else if(hours === 0){
        time = days + "天"
      }
    }
    return time
  }
  
  return <>
    <main className="basis-5/7 border-x overflow-auto">
      <MainHeader currentUserName={userData?.name} currentUserTweetsCount={25} />
      <ProfileCard 
        currentUserName={userData?.name} 
        currentUserAccount={userData?.account} 
        currentUserBio={userData?.description} 
        currentUserFollow={userData?.followingCount} 
        currentUserFollowed={userData?.followerCounts}
        coverUrl={userData?.avatar}
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
            
              return(
                <TweetCard 
                  key={tweet.id}
                  postTimeHours={tweet.createdAt && getTimeTransForm(tweet.createdAt)}
                  tweet={tweet.description}
                  likeCount={tweet.likeNum}
                  replyCount={tweet.replyNum}
                  account={tweet.User?.account}
                  avatar={tweet.User?.avatar}
                  userName={tweet.User?.name}
                  id={tweet.id}
                /> 
              )
          })
        }
        {currentTab === "replies" && 
          repliedTweets.map(reply => {
              return(
                <ReplyCard 
                  key={reply.Tweet?.TweetId}
                  postTimeHours={reply.createdAt && getTimeTransForm(reply.createdAt)}
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
                postTimeHours={like.Tweet?.createdAt && getTimeTransForm(like.Tweet?.createdAt)}
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
