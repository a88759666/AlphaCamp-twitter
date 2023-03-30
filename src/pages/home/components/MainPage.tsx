import { SubmitBtn } from "components/AuthInput";
import Modal from "components/Modal";
import TweetCard, { UserImage } from "components/TweetCard";
import { useState, useEffect } from "react";
import * as tweet from "api/tweet"
import "../../../scrollbar.css"
import { useTweetContext } from "contexts/TweetContextProvider";
import { useNavigate } from "react-router-dom" 

type ResProp = {
  id: number,
  UserId: number,
  description: string,
  createdAt: string,
  updatedAt: string,
  tweetsRepliesCount:number,
  tweetsLikedCount:number,
  User?:User
}

type User = {
    id: number,
    account: string,
    name: string,
    avatar: string,
    cover: string
}

//timestamp跟現在時間差
 export function getHoursFrom(time:string){
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
  const navigate = useNavigate()

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
  function handleReplyModal() {
    setShow(!show)
  }
  function handleUserClick(id:number){
    navigate(`/user/${id}`)
  }

 
  


  return (
      <main className="basis-5/7 border-x overflow-auto scrollbarStyle" >
        <h4 className="pl-7 py-6 leading-[26px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div >
          {tweets?.map(item => {
            const {hours, days} = getHoursFrom(item.createdAt)
            return(
              <div key={item.id}>
                <TweetCard 
                  userName={item.User?.name}
                  account={item.User?.account}
                  postTimeHours={hours}
                  postTimeDate={days === 0 ? "" : days * -1 + "天"}
                  tweet={item.description}
                  likeCount={item.tweetsLikedCount}
                  replyCount={item.tweetsRepliesCount}
                  avatar={item.User?.avatar}
                  handleReplyModal={handleReplyModal}
                  id={item.id}
                  onGoUserClick={handleUserClick}

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
          />
        )}
      </main>

  )
};

export default MainPage;


