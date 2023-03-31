import { SubmitBtn } from "components/AuthInput";
import Modal from "components/Modal";
import TweetCard, { UserImage } from "components/TweetCard";
import { useState, useEffect } from "react";
import * as tweet from "api/tweet"
import "styles/scrollbar.css"
import { useTweetContext } from "contexts/TweetContextProvider";
import { useNavigate } from "react-router-dom" 
import { setSourceMapRange } from "typescript";
import { setuid } from "process";
import { ResProp } from "type"


//timestamp跟現在時間差
 export function getHoursFrom(time:string){
    //拿總共的毫秒差距
    let milliseconds = Date.parse(time) - Date.now()
    //相差的日期天數
    const NegativeDays = Math.trunc(milliseconds / 86400000)
    const days = NegativeDays * -1
    milliseconds = NegativeDays * 86400000 - milliseconds
    //扣掉天數之後剩下得小時差
    const hours = Math.trunc(milliseconds / 3600000)
    milliseconds = hours * 3600000 - milliseconds
    return {
        days,
        hours,
    };
  }

  export function getTimeTransForm(tragetTime:string){
    let time;
    if(tragetTime){
      const {hours, days} = getHoursFrom(tragetTime)
      if(hours !== 0){
        time = days === 0 ?  (hours + "小時") : days + "天" + hours + "小時"
      }else if(hours === 0 && days === 0){
        time = "就在最近"
      }else if(hours === 0){
        time = days + "天"
      }
    }
    return time
  }

const PostTweet = () => {
  const [ show, setShow ] = useState(false)

  const [post , setPost] = useState<string>("")
  const { currentUser } = useTweetContext()



  function handleChange(event:React.FormEvent<HTMLTextAreaElement>) {
    if(event.currentTarget){
      setPost(event.currentTarget.value)
    }
  }

  async function handlePostClick(post:string){
    try{
      const res = await tweet.postTweet(post)
      if(res === "success"){
        setShow(false)
      //重整讓回覆出現
      window.location.reload()
    }
    }catch(error){
      console.log(error)
    }
  }

  function handleClose() {
      setShow(false)
  }
  
  return <>
    <div className=" h-[140px] pl-5 pr-2 mt-4 border-b-[10px] relative">
      <div className="flex">
        <UserImage avatar={currentUser.avatar} userName={currentUser.name}/>
        <label htmlFor="postTweet" className="ml-2 pt-2">
          <textarea 
            id="postTweet" 
            name="postTweet" 
            placeholder="有什麼新鮮事" 
            cols={50} 
            className=" h-[50px] focus:outline-none "
            onDoubleClick={() => setShow(!show)}
          />
        </label>
      </div>
      <div className="w-16 absolute right-7">
        <SubmitBtn btn="推文"/>
      </div>
    </div>
    {show && (
      <Modal 
          postTweetModal={true}
          replyTweetModal={false}
          onClose={handleClose}
          onPostClick={() => handlePostClick(post)}
          onPostChange={handleChange} 
          post={post}
      />
    )}
  </>
}

const MainPage = () => {
  const [tweets, setTweets] = useState<Array<ResProp> | null>(null)
  const [ modalUser, setModalUser ] = useState<ResProp | null>(null)
  const navigate = useNavigate()
  const {currentUser} = useTweetContext()

  useEffect(() => {
    async function getTweetAsync(){
      try{
        const res = await tweet.getTweets() 
        if(res){
          setTweets(res) 
        }
      }catch(error){
        console.log("useEffect get tweet error: ",error)
      }
    }
    getTweetAsync()
  },[])

  const [ show, setShow ] = useState(false)
  function handleClose() {
    setShow(false)
  }
  async function handleReplyModal(id: number) {
    setShow(!show)
    try {
      const res = await tweet.getSingleTweet(id) 
      if(res){
        setModalUser(res)
      }
    console.log(res)
    } catch (error) {
      
    }
    

  }
  // function handleUserClick(userId:number){
  //   const currentUserId = currentUser.id
  //   console.log(currentUserId)
  //   if(currentUserId !== userId){
  //     navigate(`/user`)
  //   }
  // }
  function handleUserClick(id:number){
    const currentUserId = currentUser.id 
    console.log(currentUserId)
    if(currentUserId !== id){
      const userId = id as unknown as string
      localStorage.setItem('userId', userId)
      navigate(`/user/${id}`)
      console.log(id)
    }
  }

  return (
      <main className="basis-5/7 border-x overflow-auto scrollbarStyle" >
        <h4 className="pl-7 py-6 leading-[26px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div >
          {tweets?.map(item => {
            const {hours, days} = getHoursFrom(item.createdAt)
            let time;
            if(hours !== 0){
              time = days === 0 ?  (hours + "小時") : days + "天" + hours + "小時"
            }else if(hours === 0 && days === 0){
              time = "就在最近"
            }else if(hours === 0){
              time = days + "天"
            }
            return(
              <div key={item.id}>
                <TweetCard 
                  userName={item.User?.name}
                  account={item.User?.account}
                  postTimeHours={time}
                  tweet={item.description}
                  likeCount={item.tweetsLikedCount}
                  replyCount={item.tweetsRepliesCount}
                  avatar={item.User?.avatar}
                  handleReplyModal={handleReplyModal}
                  id={item.UserId}
                  onGoUserClick={handleUserClick}
                  

                  // userId={item.User?.id}
                /> 
              </div>
            )
          })}
          
        </div>
        {show && (
          <Modal 
              postTweetModal={false}
              replyTweetModal={true}
              onClose={handleClose}
              userName={modalUser?.User?.name}
              account={modalUser?.User?.account}
              // postTimeHours={modalUser?.}
              tweet={modalUser?.description}
              otherAvatar={modalUser?.User?.avatar}
          />
        )}
      </main>

  )
};

export default MainPage;


