import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { LikeBigIcon, LikeBigActiveIcon, ReplyBigIcon } from "assets/images";
import { useState, useEffect } from "react";
import Modal from "components/Modal";
import {getSingleTweet, likeTweet, unlikeTweet, replyTweet} from "api/tweet"
import { useParams } from "react-router-dom";
import "../../../scrollbar.css"


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
  //timestamp轉換
  let time;
  if(tweetPostTime){
    const {hours, days} = getHoursFrom(tweetPostTime)
    time = {hours, days}
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
          {tweetPostTime} 
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
          postTimeHours={time?.hours}
          currentUserName="John Doe"
          onChange={handleChange}
          onClick={() => {if(tweetId){handleReplyClick(tweetId, comment)}}}
          comment={comment}
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


  //timestamp 轉換
  //上午 10:05・2021年11月10日
  function getDateTransform(date:string){
    let hour;
    let result;
    const  newDate = new Date(date)
    if(newDate.getHours() - 12 === 0){
      hour = "下午" + " " + "12"
    }else if(newDate.getHours() -12 > 0 && newDate.getHours() - 12 < 12){
      hour = "下午" + " " + (newDate.getHours() -12)
    }else if(newDate.getHours() - 12 < 0){
      hour = "上午" + " " + newDate.getHours()
    }else if(newDate.getHours() - 12 === 12){
      hour = "中午" + " " + "12"
    }
    if(newDate?.getMonth()){
      result = 
      hour +":" +newDate?.getMinutes()+ " · "
      +newDate?.getFullYear()+"年"+ (newDate?.getMonth()+1)+"月"+ newDate?.getDate()+"日"
    }
    return result
  }

  return(
   <main className="basis-5/7 border-x overflow-auto">
      {/* Header */}
      <div className="flex ml-2 border-b">
        <BackBtn />
        <h4 className="py-4 leading-[26px] font-bold border-b">推文</h4>
      </div>
      {/* Tweet */}
      {headerTweet?.createdAt &&
          
        <ReplyTweetCard 
          tweetUserName="Apple" 
          tweetUserAccount="Apple" 
          tweetContent={headerTweet?.description} 
          tweetPostTime={getDateTransform(headerTweet?.createdAt)} 
          tweetPostDate={headerTweet?.createdAt}
          tweetReplies={headerTweet?.tweetsRepliesCount} 
          tweetLikes={headerTweet?.tweetsLikedCount}
          tweetId={headerTweet?.id}
          setHeaderTweet={setHeaderTweet}
          headerTweet={headerTweet}
        />
      }
      {/* Reply */}
      <div className="border-t">
        {headerTweet?.Replies?.map(item => {
          const {hours , days} = getHoursFrom(item.createdAt)
            return(
              <ReplyCard 
                userName="John Doe" 
                account="HeyJohn"
                postTimeHours={hours}
                postTimeDate={days === 0 ? "今" : days * -1}
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

