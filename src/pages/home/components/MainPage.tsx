import { SubmitBtn } from "components/AuthInput";
import TweetCard, { UserImage } from "components/TweetCard";
import { useTweetContext } from "contexts/TweetContextProvider";

const PostTweet = () => {
  return(
    <div className=" h-[140px] pl-7 mt-4 border-b-[10px] relative">
      <div className="flex">
        <UserImage avatar="https://picsum.photos/300/300?text=2" />
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
  const { dummydata } = useTweetContext()

  return (
      <main className="basis-5/7 border-x ">
        <h4 className="pl-7 py-6 leading-[26px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div>
          {dummydata.map(item => {
            return(
              <TweetCard 
                userName={item.userName} 
                account={item.account} 
                postTime={item.postTime}
                tweet={item.tweet}
                likeCount={item.likeCount}
                replyCount={item.replyCount}
                avatar={item.avatar}
              /> 
            )
          })}
        </div>
      </main>

  )
};

export default MainPage;
