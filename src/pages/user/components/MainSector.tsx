import TweetCard from "components/TweetCard";
import { useTweetContext } from "../../../contexts/TweetContextProvider";
import { useNavigate } from "react-router-dom";
import { UserBriefCard } from "pages/home/components/RecommendFollow";


const MainHeader = (props:{currentUserName: string, currentUserTweets:number}) => {
  const {currentUserName, currentUserTweets} = props
  return(
    <div className="flex py-3 ">
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
    <div className="flex flex-col h-[400px] relative">
      <div className="basis-1/2 bg-orange-100"></div>
      <div className="basis-1/2 ml-4">
        <div className="mt-[72px]">
          <p className=" font-bold">John Doe</p>
          <p className="text-[14px] text-[#6C757D] ">@JohnDoe</p>
          <p className="text-[14px] py-[6px]">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
          <p className="text-[14px] text-[#6C757D]">
            <span className="text-black">37個</span>跟隨中
            <span className="text-black ml-4">59位</span>追隨者
          </p>
        </div>
      </div>
      <img src="https://picsum.photos/300/300?text=2" alt="profile pic" className="absolute rounded-full width-[140px] h-[140px] top-[124px] left-4 border-4 border-white" />
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
      <div className="">
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