import {LikeIcon, ReplyIcon} from "assets/images/index"


export const UserImage = (props: {avatar: string}) => {
  const {avatar} = props
  return (
    <img src={avatar} alt="user" className="w-[50px] h-[50px] rounded-full"/>
  )
}

const TweetCard = (props: {
  userName:string, 
  account:string, 
  postTime:string, 
  tweet:string, 
  likeCount:number, 
  replyCount:number,
  avatar:string}) => {
    const { userName,account,postTime,tweet, likeCount, replyCount, avatar } = props


    return (
      <div className="flex px-6 py-4 border-b">
        <UserImage avatar={avatar}/>
        <div className="ml-2">
          <p>{userName} 
            <span className="text-[14px] text-[#6C757D] ml-2">
              @{account} &#8729; {postTime}小時
            </span>
          </p>
          <p className="leading-[26px]">{tweet}</p>
          <div className="flex max-w-[150px]">
            <div className="basis-1/2 flex">
              <div className="pt-[3.5px]">
                <ReplyIcon />
              </div>
              <p className="text-[14px] ml-2">{likeCount}</p>
            </div>
            <div className="basis-1/2 flex ml-5 ">
              <div className="pt-[3.5px]">
                <LikeIcon />
              </div>
              <p className="text-[14px] ml-2">{replyCount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

export default TweetCard;
