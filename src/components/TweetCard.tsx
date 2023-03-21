import {LikeIcon, ReplyIcon} from "assets/images/index"

const UserImage = () => {
  return (
  <div className="w-[50px] h-[50px] rounded-full bg-black">
  </div>)
}

const TweetCard = (props: {
  userName:string, 
  account:string, 
  postTime:string, 
  tweet:string, 
  likeCount:number, 
  replyCount:number} ) => {
    const { userName,account,postTime,tweet, likeCount, replyCount } = props
    return (
      <div className="flex px-7 py-4 border-b">
        <div className="">
          <UserImage />
        </div>
        <div className="ml-2 pt-2 ">
          <p>{userName} 
            <span className="text-[14px] text-[#6C757D] ml-2">
              @{account} &#8729; {postTime}
            </span>
          </p>
          <p className="leading-[26px]">{tweet}</p>
          <div className="flex w-[150px]">
            <div className="basis-1/2 flex">
              <div className="pt-[3.5px]">
                <LikeIcon />
              </div>
              <p className="text-[14px] ml-2.5">{likeCount}</p>
            </div>
            <div className="basis-1/2 flex ">
              <div className="pt-[3.5px]">
                <ReplyIcon />
              </div>
              <p className="text-[14px] ml-2.5">{replyCount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

export default TweetCard;
