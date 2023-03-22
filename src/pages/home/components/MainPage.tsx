import { SubmitBtn } from "components/AuthInput";
import TweetCard from "components/TweetCard";
import RecommendFollowSidebar from "./RecommendFollow";

const PostTweet = () => {
  return(
    <div className=" h-[140px] pl-7 mt-4 border-b-[10px] relative">
      <div className="flex">
        <div className="w-[50px] h-[50px] rounded-full bg-black"></div>  {/* 背景待替換連結*/}
        <label htmlFor="postTweet" className="ml-2 pt-2">
          <textarea id="postTweet" name="postTweet" placeholder="有什麼新鮮事" cols={50} className=" h-[50px] focus:outline-none "></textarea>
        </label>
      </div>
      <div className="w-16 absolute right-7">
        <SubmitBtn btn="推文"/>
      </div>
    </div>
  )
}

const MainPage = () => {
  return (
    <>
      <main className="basis-4/7 border-x ">
        <h4 className="pl-7 h-[74px] leading-[74px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div>
          <TweetCard 
          userName="Apple" 
          account="Apple" 
          postTime="3" 
          tweet="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."
          likeCount={13}
          replyCount={76}
          />  
           <TweetCard 
          userName="Apple" 
          account="Apple" 
          postTime="3" 
          tweet="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."
          likeCount={13}
          replyCount={76}
          /> 
        </div>
      </main>
      <RecommendFollowSidebar />
    </>

  )
};

export default MainPage;