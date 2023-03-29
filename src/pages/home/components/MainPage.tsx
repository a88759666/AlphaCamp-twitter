import { SubmitBtn } from "components/AuthInput";
import Modal from "components/Modal";
import TweetCard, { UserImage } from "components/TweetCard";
import { useState, useEffect } from "react";
import * as tweet from "api/tweet"
import "../../../scrollbar.css"
import { useNavigate } from "react-router-dom";

type ResProp = {
  id: number,
  UserId: number,
  description: string,
  createdAt: string,
  updatedAt: string,
  tweetsRepliesCount:number,
  tweetsLikedCount:number
}

const PostTweet = () => {
  const [ show, setShow ] = useState(false)
  
  function handleClose() {
      setShow(false)
  }
  return <>
    <div className=" h-[140px] pl-7 pr-2 mt-4 border-b-[10px] relative">
      <div className="flex">
        <UserImage avatar="https://picsum.photos/300/300?text=2" />
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

  function handleTweetClick(id:number) {
    navigate(`/reply/${id}`)
  }


  return (
      <main className="basis-5/7 border-x overflow-auto scrollbarStyle" >
        <h4 className="pl-7 py-6 leading-[26px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div >
          {tweets?.map(item => {
            return(
              <div onClick={() => handleTweetClick?.(item.id)} key={item.id}>
                <TweetCard 
                  userName="Apple"
                  account="Apple"
                  postTime={item.createdAt}
                  tweet={item.description}
                  likeCount={item.tweetsLikedCount}
                  replyCount={item.tweetsRepliesCount}
                  avatar="https://picsum.photos/300/300?text=2"
                  handleReplyModal={handleReplyModal}
                  
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
