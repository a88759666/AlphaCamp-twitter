import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { useTweetContext } from "../../../contexts/TweetContextProvider";
import { LikeBigIcon, ReplyBigIcon } from "assets/images";

const ReplyTweetCard = (props: {
  tweetUserName:string,
  tweetUserAccount:string,
  tweetContent:string,
  tweetPostTime:string,
  tweetPostDate:string,
  tweetReplies:number,
  tweetLikes:number
}) => {
  const {tweetUserName, tweetUserAccount, tweetContent, tweetPostTime, tweetPostDate, tweetReplies, tweetLikes} = props
  return(
    <div className="px-4 py-2">
        <div className="flex">
          <UserImage avatar="https://picsum.photos/300/300?text=2"/>
          <div className="ml-2">
            <p className=" font-bold">{tweetUserName}</p>
            <p className="text-[14px] text-[#6C757D] ">@{tweetUserAccount}</p>
          </div>
        </div>
        <div className="border-b pb-2">
          <p className="text-[24px] py-2 leading-[36px]">{tweetContent}</p>
          <p className="text-[14px] text-[#6C757D]">
            {tweetPostTime} &#8729; {tweetPostDate}
          </p>
        </div>
        <div className="border-b py-4">
          <b>{tweetReplies}</b> 回覆 
          <b className="ml-6">{tweetLikes}</b> 喜歡次數
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
  const {dummydata} = useTweetContext()

  return(
   <main className="basis-5/7 border-x ">
      {/* Header */}
      <div className="flex ml-2 border-b">
        <BackBtn />
        <h4 className="py-4 leading-[26px] font-bold border-b">推文</h4>
      </div>
      {/* Tweet */}
      <ReplyTweetCard 
        tweetUserName="Apple" 
        tweetUserAccount="Apple" 
        tweetContent="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt." 
        tweetPostTime="上午 10:13" 
        tweetPostDate="2021年11月10日" 
        tweetReplies={36} 
        tweetLikes={808}
      />
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
