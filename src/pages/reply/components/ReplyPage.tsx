import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { LikeBigIcon, ReplyBigIcon } from "assets/images";
import { useState, useEffect} from "react";
import Modal from "components/Modal";
import {getSingleTweet} from "api/tweet"
import { useParams } from "react-router-dom";
import "../../../scrollbar.css"

type ResProp = {
  id: number,
  UserId: number,
  description: string,
  createdAt: string,
  updatedAt: string,
  Replies?:ReplyProps[]
}
type ReplyProps = {
    id: number,
    UserId: number,
    TweetId: number,
    comment: string,
    createdAt: string,
    updatedAt: string
}

const ReplyTweetCard = (props: {
  tweetUserName?:string,
  tweetUserAccount?:string,
  tweetContent?:string,
  tweetPostTime?:string,
  tweetPostDate?:string,
  tweetReplies?:number,
  tweetLikes?:number
}) => {
  const {tweetUserName, tweetUserAccount, tweetContent, tweetPostTime, tweetPostDate, tweetReplies, tweetLikes} = props
  const [ show, setShow ] = useState(false)

  function handleClose() {
      setShow(false)
  }


  return <>
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
        <div className="mr-16 cursor-pointer">
          <ReplyBigIcon 
            onDoubleClick={() => setShow(!show)}
          />
        </div>
        <div className="cursor-pointer mt-0.5">
          <LikeBigIcon />
        </div>
      </div>
    </div>
    {show && (
      <Modal 
          postTweetModal={false}
          replyTweetModal={true}
          onClose={handleClose}
      />
    )}
  </>
}


const ReplyPage = () => {
  const [ titleTweet, setTitleTweet ] = useState<ResProp | null>(null)
  const {id} = useParams()

  useEffect(() => {
    const getSingleTweetAsync = async () => {
      const res = await getSingleTweet(Number(id))
      try{
        if(res){
          setTitleTweet(res)
        }
      }catch(error){
        console.log(error)
      }
    }
    getSingleTweetAsync()
  },[id])


  return(
   <main className="basis-5/7 border-x overflow-auto">
      {/* Header */}
      <div className="flex ml-2 border-b">
        <BackBtn />
        <h4 className="py-4 leading-[26px] font-bold border-b">推文</h4>
      </div>
      {/* Tweet */}
      <ReplyTweetCard 
        tweetUserName="Apple" 
        tweetUserAccount="Apple" 
        tweetContent={titleTweet?.description} 
        tweetPostTime={titleTweet?.createdAt} 
        tweetPostDate={titleTweet?.createdAt}
        tweetReplies={36} 
        tweetLikes={808}
      />
      {/* Reply */}
      <div className="border-t">
        {titleTweet?.Replies?.map(item => {
            return(
              <ReplyCard 
                userName="Jogn Doe" 
                account="HeyJohn"
                postTime={item.createdAt}
                tweet={item.comment}
                avatar="https://picsum.photos/300/300?text=2"
                replyAccount="Apple"
                key={item.id}
              />
            )
          })
        }
      </div>
        
    </main>
  )
}

export default ReplyPage
