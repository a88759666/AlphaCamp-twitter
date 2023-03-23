import TweetCard from "components/TweetCard";
import { useTweetContext } from "../../../contexts/TweetContextProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


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

const BackBtn = () => {
  const navigate = useNavigate()
  return(
    <button 
      className="mr-[19px] mx-6 hover:opacity-50 cursor-pointer"
      onClick={() => navigate("/home")}>&#8592;
    </button>)
}

const ProfileCard = (props :{
  currentUserName:string,
  currentUserAccount:string,
  currentUserBio:string,
  currentUserFollow:number,
  currentUserFollowed:number
  }) => {
    const {currentUserAccount, currentUserName, currentUserBio, currentUserFollow, currentUserFollowed} = props
  return(
    <div className="flex flex-col h-1/2 relative">
      <div className="basis-1/2 bg-orange-100"></div>
      <div className="basis-1/2 ml-4">
        <div className="mt-[72px]">
          <p className=" font-bold">{currentUserName}</p>
          <p className="text-[14px] text-[#6C757D] ">@{currentUserAccount}</p>
          <p className="text-[14px] py-[6px]">{currentUserBio}</p>
          <p className="text-[14px] text-[#6C757D]">
            <span className="text-black">{currentUserFollow}個</span>跟隨中
            <span className="text-black ml-4">{currentUserFollowed}位</span>追隨者
          </p>
        </div>
        <button className="rounded-[50px] px-4 py-2 border border-[#FF6600] bg-white text-[#FF6600] hover:opacity-50 absolute top-1/2 right-4 mt-4">
          編輯個人資料
        </button>
      </div>
      <img src="https://picsum.photos/300/300?text=2" alt="profile pic" className="absolute rounded-full width-[140px] h-[140px] top-[124px] left-4 border-4 border-white" />
    </div>
  )
}

const MainSector = () => {
  const [currentTab, setCurrentTab] = useState("tweets")
  const dummydata = useTweetContext()

  return(
    <main className="basis-5/7 border-x ">
      <MainHeader currentUserName="John Doe" currentUserTweetsCount={25} />
      <ProfileCard 
        currentUserName="John Doe" 
        currentUserAccount="JohnDoe" 
        currentUserBio="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." 
        currentUserFollow={34} 
        currentUserFollowed={29}
      />
      <div className="flex border-b">
        <button autoFocus className="userPageTab" onClick={() => setCurrentTab("tweets")}>推文</button>
        <button className="userPageTab" onClick={() => setCurrentTab("replies")}>回覆</button>
        <button className="userPageTab" onClick={() => setCurrentTab("likes")}>喜歡的內容</button>
      </div>
      <div className="">
        {currentTab === "tweets" && 
          dummydata.map(item => {
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
          })
        }
        {currentTab === "replies" && 
          dummydata.map(item => {
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
          })
        }
        {currentTab === "likes" && 
          dummydata.map(item => {
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
          })
        }
        
      </div>
    </main>
  )
} 
export default MainSector;