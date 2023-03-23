import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { useTweetContext } from "../../../contexts/TweetContextProvider";
import { LikeBigIcon, ReplyBigIcon } from "assets/images";

const ReplyTweetCard = () => {
  return(
    <div className="px-4 py-2">
        <div className="flex">
          <UserImage avatar="https://picsum.photos/300/300?text=2"/>
          <div className="ml-2">
            <p className=" font-bold">Apple</p>
            <p className="text-[14px] text-[#6C757D] ">@Apple</p>
          </div>
        </div>
        <div className="border-b pb-2">
          <p className="text-[24px] py-2 leading-[36px]">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.</p>
          <p className="text-[14px] text-[#6C757D]">
            上午 10:05 &#8729; 2021年11月10日
          </p>
        </div>
        <div className="border-b py-4">
          <b>34</b> 回覆 
          <b className="ml-6">808</b> 喜歡次數
        </div>
        <div className="flex pt-[22px] h-[68px]">
          <div className="mr-20 cursor-pointer">
            <ReplyBigIcon />
          </div>
          <div className="cursor-pointer">
            <LikeBigIcon />
          </div>
        </div>
      </div>
  )
}


const ReplyPage = () => {
  const dummydata = useTweetContext()

  return(
   <main className="basis-5/7 border-x ">
      {/* Header */}
      <div className="flex ml-2 border-b">
        <BackBtn />
        <h4 className="py-4 leading-[26px] font-bold border-b">推文</h4>
      </div>
      {/* Tweet */}
      <ReplyTweetCard />
      {/* Reply */}
      <div className="border-t">
        {dummydata.map(item => {
            return(
              <ReplyCard 
                userName={item.userName} 
                account={item.account} 
                postTime={item.postTime}
                tweet={item.tweet}
                avatar={item.avatar}
                replyAccount="Apple"
              />
            )
          })
        }
      </div>
        
    </main>
  )
}

export default ReplyPage