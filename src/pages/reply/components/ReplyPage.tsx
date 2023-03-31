import { BackBtn } from "pages/user/components/MainSector"
import ReplyCard from "pages/user/components/ReplyCard"
import { UserImage } from "components/TweetCard";
import { LikeBigIcon, LikeBigActiveIcon, ReplyBigIcon } from "assets/images";
import { useState, useEffect } from "react";
import Modal from "components/Modal";
import {getSingleTweet, likeTweet, unlikeTweet, replyTweet} from "api/tweet"
import { useParams } from "react-router-dom";
import "styles/scrollbar.css"
import { useTweetContext } from "contexts/TweetContextProvider";
import { getHoursFrom, getTimeTransForm } from "../../home/components/MainPage"
import { ResProp } from "type"



const ReplyTweetCard = (props: {
  tweetUserName?:string,
  tweetUserAccount?:string,
  tweetContent?:string,
  tweetPostTime?:string,
  tweetPostDate?:string,
  tweetReplies?:number,
  tweetLikes?:number,
  tweetId?:number,
  tweetAvatar?:string,
  setHeaderTweet: React.Dispatch<React.SetStateAction<ResProp | null>>,
  headerTweet:ResProp | null
}) => {
  const {tweetUserName, tweetUserAccount, tweetContent, tweetPostTime, tweetReplies, tweetLikes, tweetId, tweetAvatar, setHeaderTweet, headerTweet} = props
  const [ show, setShow ] = useState(false)
  const [ like, setLike ] = useState(false)
  const [ comment, setComment] = useState<string>("")
  const { currentUser } = useTweetContext()

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


  return <>
    <div className="px-4 py-2">
      <div className="flex">
        <UserImage avatar={tweetAvatar} userName={tweetUserName}/>
        <div className="ml-2">
          <p className=" font-bold">{tweetUserName}</p>
          <p className="text-[14px] text-[#7d6c6c] ">@{tweetUserAccount}</p>
        </div>
      </div>
      <div className="border-b pb-2">
        <p className="text-[24px] py-2 leading-[36px]">{tweetContent}</p>
        <p className="text-[14px] text-[#7d6c6c]">
          {tweetPostTime && getDateTransform(tweetPostTime)} 
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
          postTimeHours={tweetPostTime && getTimeTransForm(tweetPostTime)}
          onChange={handleChange}
          onClick={() => {if(tweetId){handleReplyClick(tweetId, comment)}}}
          comment={comment}
          otherAvatar={tweetAvatar}
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

  let time = "";
  if(headerTweet?.createdAt){
     const {hours, days} = getHoursFrom(headerTweet?.createdAt)
    if(hours !== 0){
      time = days === 0 ?  (hours + "小時") : (days + "天" + hours + "小時")
    }else if(hours === 0 && days === 0){
      time = "就在最近"
    }else if(hours === 0){
      time = days + "天"
    }
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
          tweetUserName={headerTweet.User?.name} 
          tweetUserAccount={headerTweet.User?.account} 
          tweetContent={headerTweet?.description} 
          tweetPostTime={headerTweet?.createdAt} 
          tweetPostDate={headerTweet?.createdAt}
          tweetReplies={headerTweet?.tweetsRepliesCount} 
          tweetLikes={headerTweet?.tweetsLikedCount}
          tweetId={headerTweet?.id}
          tweetAvatar={headerTweet.User?.avatar}
          setHeaderTweet={setHeaderTweet}
          headerTweet={headerTweet}
        />
      }
      {/* Reply */}
      <div className="border-t">
        {headerTweet?.Replies?.map(item => {
            return(
              <ReplyCard 
                userName={item.User?.name} 
                account={item.User?.account}
                postTimeHours={time}
                tweet={item.comment}
                avatar={item.User?.avatar}
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


