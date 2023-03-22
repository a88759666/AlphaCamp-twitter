import { UserImage } from "components/TweetCard"
import { useState } from "react"

const FollowBtn = (props: {
  onFollowClick:React.MouseEventHandler<HTMLButtonElement>}) => {
  const {onFollowClick} = props
  return(
    <button className="rounded-[50px] px-4 py-2 border border-[#FF6600] bg-white text-[#FF6600] hover:opacity-50" onClick={onFollowClick}>跟隨</button>
  )
}

const IsFollowedBtn = (props: {
  onFollowClick:React.MouseEventHandler<HTMLButtonElement>}) => {
    const {onFollowClick} = props
    return(
      <button className="rounded-[50px] px-4 py-2 bg-[#FF6600] text-white hover:bg-orange-700" onClick={onFollowClick}>正在跟隨</button>
    )
}

const RecommendFollowCard = (props: {
  userName:string, 
  account:string, 
  isFollowed:boolean, 
  onFollowClick:React.MouseEventHandler<HTMLButtonElement>}) => {
  const { userName,account,isFollowed, onFollowClick } = props
  return(
    <div className="ml-4 my-4 flex relative">
      <UserImage url="https://picsum.photos/300/300?text=2"/>
      <div>
        <p className="ml-2 font-bold">{userName}</p>
        <p className="text-[14px] text-[#6C757D] ml-2">@{account}</p>
      </div>
      <div className="absolute right-4" >
        {isFollowed ? <IsFollowedBtn onFollowClick={onFollowClick}/> : <FollowBtn onFollowClick={onFollowClick}/>}
      </div>
    </div>
  )
}

const RecommendFollowSidebar = () => {
  const [isFollowed, setIsFollowed] = useState(false)
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () =>{ 
    setIsFollowed(!isFollowed)
  };
  return(
     <section className="basis-3/7 ">
      <div className="bg-[#FAFAFB] min-w-[270px] mt-4 ml-6">
        <h4 className="py-6 pl-6 border-b font-bold" >推薦跟隨</h4>
        <RecommendFollowCard 
          userName="Pizza Hut" 
          account="pizzahut" 
          isFollowed={isFollowed} 
          onFollowClick={handleClick}/> 
        <RecommendFollowCard 
          userName="Pizza Hut" 
          account="pizzahut" 
          isFollowed={isFollowed} 
          onFollowClick={handleClick}/>       
      </div>
     </section>
  )
}

export default RecommendFollowSidebar