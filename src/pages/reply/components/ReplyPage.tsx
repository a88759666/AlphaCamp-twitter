import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { LikeBigIcon, LikeBigActiveIcon, ReplyBigIcon } from "assets/images";
import { useState, useEffect } from "react";
import Modal from "components/Modal";
import {getSingleTweet, likeTweet, unlikeTweet, replyTweet} from "api/tweet"
import { useParams } from "react-router-dom";
import "../../../scrollbar.css"
import { useTweetContext } from "contexts/TweetContextProvider";

type ResProp = {
  id: number,
  UserId: number,
  description: string,
  createdAt: string,
  updatedAt: string,
  tweetsRepliesCount:number,
  tweetsLikedCount:number
  Replies?:ReplyProps[],
}
type ReplyProps = {
    id: number,
    UserId: number,
    TweetId: number,
    comment: string,
    createdAt: string,
    updatedAt: string,

}

const ReplyTweetCard = (props: {
  tweetUserName?:string,
  tweetUserAccount?:string,
  tweetContent?:string,
  tweetPostTime?:string,
  tweetPostDate?:string,
  tweetReplies?:number,
  tweetLikes?:number,
  tweetId?:number,
  setHeaderTweet: React.Dispatch<React.SetStateAction<ResProp | null>>,
  headerTweet:ResProp | null
}) => {
  const {tweetUserName, tweetUserAccount, tweetContent, tweetPostTime, tweetPostDate, tweetReplies, tweetLikes, tweetId, setHeaderTweet, headerTweet} = props
  const [ show, setShow ] = useState(false)
  const [ like, setLike ] = useState(false)
  const [ comment, setComment] = useState<string>("")

  function handleClose() {
      setShow(false)
  }

  async function handleLike(id:number) {
      if(!like){
        setLike(true)
        try{
          const res = await likeTweet(id)
          if(res === "success"){
            if(headerTweet){
              setHeaderTweet({...headerTweet, tweetsLikedCount: headerTweet.tweetsLikedCount +1})
            }
          }
        }catch(error){
          console.log(error)
        } 
      }else{
        setLike(false)
        try{
          const res = await unlikeTweet(id)
          if(res === "success"){
            if(headerTweet){
              setHeaderTweet({...headerTweet, tweetsLikedCount: headerTweet.tweetsLikedCount -1})
            }
          }
        }catch(error){
          console.log(error)
        } 
      }
    
  }

  function handleChange(event:React.FormEvent<HTMLTextAreaElement>) {
    if(event.currentTarget){
      setComment(event.currentTarget.value)
    }
    
  }

  async function handleReplyClick(id:number, comment:string){
    try{
      const res = await replyTweet(id,comment)
      if(res === "success"){
        setShow(false)
      //重整讓回覆出現
      window.location.reload()
    }
    }catch(error){
      console.log(error)
    }
  }

  return <>
    <div className="px-4 py-2">
      <div className="flex">
        <UserImage avatar="https://picsum.photos/300/300?text=2"/>
        <div className="ml-2">
          <p className=" font-bold">{tweetUserName}</p>
          <p className="text-[14px] text-[#7d6c6c] ">@{tweetUserAccount}</p>
        </div>
      </div>
      <div className="border-b pb-2">
        <p className="text-[24px] py-2 leading-[36px]">{tweetContent}</p>
        <p className="text-[14px] text-[#7d6c6c]">
          {tweetPostTime} &#8729; {tweetPostDate}
        </p>
      </div>
      <div className="border-b py-4">
        <b>{tweetReplies}</b> 回覆 
        <b className="ml-6">{tweetLikes}</b> 喜歡次數
      </div>
      <div className="flex pt-[22px] h-[68px]">
        <div className="mr-20 cursor-pointer">
          <ReplyBigIcon 
            onDoubleClick={()=> setShow(!show)}
          />
        </div>
        <div className="cursor-pointer mt-0.5" 
        onClick={() => {if(tweetId){handleLike(tweetId)}}}>
          {like ? <LikeBigActiveIcon /> : <LikeBigIcon />}
        </div>
      </div>
    </div>
    {show && (
      <Modal 
          postTweetModal={false}
          replyTweetModal={true}
          onClose={handleClose}
          userName={tweetUserName}
          account={tweetUserAccount}
          tweet={tweetContent}
          tweetPostTime={tweetPostTime}
          currentUserName="John Doe"
          onChange={handleChange}
          onClick={() => {if(tweetId){handleReplyClick(tweetId, comment)}}}
      />
    )}
  </>
}


const ReplyPage = () => {
  const [ headerTweet, setHeaderTweet ] = useState<ResProp | null>(null)
  const {id} = useParams()

  useEffect(() => {
    const getSingleTweetAsync = async () => {
      const res = await getSingleTweet(Number(id))
      try{
        if(res){
          setHeaderTweet(res)
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
        tweetContent={headerTweet?.description} 
        tweetPostTime={headerTweet?.createdAt} 
        tweetPostDate={headerTweet?.createdAt}
        tweetReplies={headerTweet?.tweetsRepliesCount} 
        tweetLikes={headerTweet?.tweetsLikedCount}
        tweetId={headerTweet?.id}
        setHeaderTweet={setHeaderTweet}
        headerTweet={headerTweet}
      />
      {/* Reply */}
      <div className="border-t">
        {headerTweet?.Replies?.map(item => {
            return(
              <ReplyCard 
                userName="John Doe" 
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
