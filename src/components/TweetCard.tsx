import {LikeIcon, LikeIconActive, ReplyIcon} from "assets/images/index"
import { useTweetContext } from "contexts/TweetContextProvider"
import { useNavigate } from "react-router-dom"
type userState = 'user1' | 'user2' 
export const UserImage = (props: {
  avatar?: string, 
  onGoUserClick?: (id: number) => void
  id?:number,
  userName?:string,
  userId?:number,
  setUser?:React.Dispatch<React.SetStateAction<userState>>

}) => {
  const {avatar, setUser, id, userName, userId} = props
  const go = useNavigate()
  const {currentUser} = useTweetContext()

  function handleUserClick(userId:number){
    const currentUserId = currentUser.id
    if(setUser !== undefined){
      console.log(userId)
      console.log(currentUserId)
      if(currentUserId !== userId ){
        setUser("user2")
        go(`/user`)
      }
    }
  }
  return (
    <img 
      src={avatar} alt={userName} 
      className="w-[50px] h-[50px] rounded-full"
      onClick={() => userId && handleUserClick?.(userId)}
    />
  )
}




const TweetCard = (props: {
  userName?:string, 
  account?:string, 
  postTimeHours?: string | number, 
  tweet?:string, 
  likeCount?:number,
  isLiked?: boolean 
  replyCount?:number,
  avatar?:string,
  handleReplyModal?: () => void,
  id?:number,
  onGoUserClick?: (id: number) => void,
  userId?:number,
  setUser?:React.Dispatch<React.SetStateAction<userState>>
}) => {
    const { userName,account,postTimeHours,tweet, likeCount, isLiked, replyCount, avatar,  handleReplyModal, id, setUser , userId} = props
    const go = useNavigate()

    function handleTweetClick(id:number) {
      go(`/reply/${id}`)
    }
    

    return (
      <div className="flex pl-6 pr-8 py-4 border-b hover:bg-[#FAFAFB] cursor-pointer"  >
        <UserImage 
          avatar={avatar}
          id={id}
          // onGoUserClick={onGoUserClick}
          userName={userName}
          userId={userId}
          setUser={setUser}
        />
        <div className="ml-2 w-full ">
          <div onClick={() => {if(id){handleTweetClick(id)}}}>
            <p>{userName} 
              <span className="text-[14px] text-[#6C757D] ml-2">
                @{account} &#8729; {postTimeHours}
              </span>
            </p>
          <p className="leading-[26px]">{tweet}</p>
          </div>
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
                { isLiked ? <LikeIconActive /> : <LikeIcon />}
              </div>
              <p className="text-[14px] ml-2">{replyCount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

export default TweetCard;

