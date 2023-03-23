import TweetCard from "components/TweetCard";
import ProfileCard from "./ProfileCard";
import ReplyCard from "./ReplyCard";
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
        coverUrl="https://picsum.photos/300/300?text=1"
      />
      <div className="flex border-b">
        <button autoFocus className="userPageTab" onClick={() => setCurrentTab("tweets")}>推文</button>
        <button className="userPageTab" onClick={() => setCurrentTab("replies")}>回覆</button>
        <button className="userPageTab" onClick={() => setCurrentTab("likes")}>喜歡的內容</button>
      </div>
      <div className="overflow-scroll">
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
              <ReplyCard 
                userName={item.userName} 
                account={item.account} 
                postTime={item.postTime}
                tweet={item.tweet}
                url={item.url}
                replyAccount="Apple"
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