import {LikeIcon, LikeBigActiveIcon, ReplyIcon} from "assets/images/index"
import { useNavigate } from "react-router-dom"

export const UserImage = (props: {avatar?: string}) => {
  const {avatar} = props
  return (
    <img src={avatar} alt="user" className="w-[50px] h-[50px] rounded-full"/>
  )
}


const TweetCard = (props: {
  userName?:string, 
  account?:string, 
  postTimeHours?: string | number, 
  postTimeDate?: string | number, 
  tweet?:string, 
  likeCount?:number,
  isLiked?: boolean 
  replyCount?:number,
  avatar?:string,
  handleReplyModal?: () => void,
  id?:number
}) => {
    const { userName,account,postTimeHours,postTimeDate,tweet, likeCount, isLiked, replyCount, avatar,  handleReplyModal,id } = props
    const go = useNavigate()

    function handleTweetClick(id:number) {
      go(`/reply/${id}`)
    }
   
    return (
      <div className="flex pl-6 pr-8 py-4 border-b"  >
        <UserImage avatar={avatar}/>
        <div className="ml-2" onClick={() => {if(id){handleTweetClick(id)}}}>
          <p>{userName} 
            <span className="text-[14px] text-[#6C757D] ml-2">
              @{account} &#8729; {postTimeDate}{postTimeHours}小時
            </span>
          </p>
          <p className="leading-[26px]">{tweet}</p>
          <div className="flex max-w-[150px]">
            <div className="basis-1/2 flex">
              <div className="pt-[3.5px]">
                <ReplyIcon 
                  onDoubleClick={handleReplyModal}
                />
              </div>
              <p className="text-[14px] ml-2">{likeCount}</p>
            </div>
            <div className="basis-1/2 flex ml-5 ">
              <div className="pt-[3.5px]">
                { isLiked ? <LikeBigActiveIcon /> : <LikeIcon />}
              </div>
              <p className="text-[14px] ml-2">{replyCount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

export default TweetCard;
