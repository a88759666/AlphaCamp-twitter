import { UserImage } from "components/TweetCard"
import { useEffect, useState } from "react"
import { getTopFollow } from "api/follow";

type followProps = {
  id: number,
  name: string,
  account: string,
  avatar: string,
  followingNum: number
}

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

//右邊的名字和帳號按鈕
export const UserBriefCard = (props: {
  userName:string, 
  account:string }) =>{
  const [isFollowed, setIsFollowed] = useState(false)
  const { userName,account } = props
  
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () =>{ 
    setIsFollowed(!isFollowed)
  };

  return(
    <>
      <div>
        <p className="ml-2 font-bold">{userName}</p>
        <p className="text-[14px] text-[#6C757D] ml-2">@{account}</p>
      </div>
      <div className="absolute right-4" >
        {isFollowed ? <IsFollowedBtn onFollowClick={handleClick}/> : <FollowBtn onFollowClick={handleClick}/>}
      </div>
    </>
  )
}

const RecommendFollowSidebar = () => {
  const [topFollowList, setTopFollowList] = useState<followProps[] | null>(null)

  useEffect(() => {
    async function getFollowAsync(){
      try{
        const res = await getTopFollow()
        if(res){
          setTopFollowList(res)
        }
      }catch(error){
        console.log(error)
      }
    }
    getFollowAsync()
  },[])

  return(
     <section className="basis-3/7 ">
      <div className="bg-[#FAFAFB] min-w-[270px] mt-4 ml-6">
        <h4 className="py-6 pl-6 border-b font-bold" >推薦跟隨</h4>
        {topFollowList?.map(item => {
          return(
            <div className="ml-4 my-4 flex relative" key={item.id}>
              <UserImage avatar={item.avatar}/>
              <UserBriefCard 
              userName={item.name} 
              account={item.account} 
              
            /> 
            </div>
          )
        })}
      </div>
     </section>
  )
}

export default RecommendFollowSidebar
   
