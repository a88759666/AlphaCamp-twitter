import TweetCard from "components/TweetCard";
import { useTweetContext } from "../../../contexts/TwwetContextProvider";
import { useNavigate } from "react-router-dom";


const MainHeader = (props:{currentUserName: string, currentUserTweets:number}) => {
  const {currentUserName, currentUserTweets} = props
  return(
    <div className="flex py-4 ">
      <BackBtn />
      <div>
        <h5 className=" font-bold ">{currentUserName}</h5>
        <p className="text-[13px] text-[#6C757D]">{currentUserTweets}則推文</p>
      </div>
    </div>
  )
}

const BackBtn = () => {
  const navigate = useNavigate()
  return(
    <button 
      className="mr-[19px] mx-6 hover:opacity-50 cursor-pointer"
      onClick={() => navigate("/home")}>&#8592;
    </button>)
}

const ProfileCard = () => {
  return(
    <div className="flex flex-col h-2/6 relative">
      <div className="basis-1/2 bg-orange-100"></div>
      <div className="basis-1/2"></div>
      <img src="https://picsum.photos/300/300?text=2" alt="profile pic" className="absolute rounded-full width-[130px] h-[130px] top-1/4 left-4 border-4 border-white" />
    </div>
  )
}

const MainSector = () => {
  const dummydata = useTweetContext()

  return(
    <main className="basis-5/7 border-x ">
      <MainHeader currentUserName="John Doe" currentUserTweets={25} />
      <ProfileCard />
      <div className="flex border-b">
        <button className="userPageTab">推文</button>
        <button className="userPageTab">回覆</button>
        <button className="userPageTab">喜歡的內容</button>
      </div>
      <div>
        {dummydata.map(item => {
          return(
            <TweetCard 
              userName={item.userName} 
              account={item.account} 
              postTime={item.postTime}
              tweet={item.tweet}
              likeCount={item.likeCount}
              replyCount={item.replyCount}
              url={item.url}
            />
          )
        })}
      </div>
    </main>
  )
} 
export default MainSector;