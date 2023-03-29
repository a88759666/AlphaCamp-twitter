import { UserImage } from "components/TweetCard"
import { useEffect, useState } from "react"
import { follow, getTopFollow, unfollow } from "api/follow";

type followProps = {
  id: number,
  name: string,
  account: string,
  avatar: string,
  followingNum: number
}


const FollowBtn = (props: {
  onFollow:React.MouseEventHandler<HTMLButtonElement>}) => {
  const {onFollow} = props
  return(
    <button className="rounded-[50px] px-4 py-2 border border-[#FF6600] bg-white text-[#FF6600] hover:opacity-50" onClick={onFollow}>跟隨</button>
  )
}

const IsFollowedBtn = (props: {
  onFollow:React.MouseEventHandler<HTMLButtonElement>}) => {
    const {onFollow} = props
    return(
      <button className="rounded-[50px] px-4 py-2 bg-[#FF6600] text-white hover:bg-orange-700" onClick={onFollow}>正在跟隨</button>
    )
}

//右邊的名字和帳號按鈕
export const UserBriefCard = (props: {
  userName:string, 
  account:string,
  id:number
  }) =>{
  const { userName,account, id } = props
  const [isFollowed, setIsFollowed] = useState(false)
  
  async function handleFollowClick(id:number){ 
    setIsFollowed(!isFollowed)
    if(!isFollowed){
      try{
        const res = await follow(id)
        //拿到data代表成功
        //失敗是註冊過了 
        if(!res){
          alert("已經追隨中")
          return
        }
        // console.log(res, "follow")
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        const res = await unfollow(id)
        if(!res){
          alert("已取消追隨")
        }
        // console.log(res,"unfollow")
      }catch(error){
        console.log(error)
      }
    }
  };

  return(
    <>
      <div className="max-w-[200px] overflow-auto ">
        <p className="ml-2 font-bold">{userName}</p>
        <p className="text-[14px] text-[#6C757D] ml-2">@{account}</p>
      </div>
      <div className="absolute right-4" >
        {isFollowed ? <IsFollowedBtn onFollow={() =>handleFollowClick(id)}/> : <FollowBtn onFollow={() =>handleFollowClick(id)}/>}
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
     <section className="basis-3/7 max-x-[280px] overflow-auto">
      <div className="bg-[#FAFAFB] min-w-[270px] mt-4 ml-6">
        <h4 className="py-6 pl-6 border-b font-bold" >推薦跟隨</h4>
        {topFollowList?.map(item => {
          return(
            <div className="ml-4 my-4 flex relative" key={item.id}>
              <UserImage avatar={item.avatar}/>
              <UserBriefCard 
              userName={item.name} 
              account={item.account} 
              id={item.id}
            /> 
            </div>
          )
        })}
      </div>
     </section>
  )
}

export default RecommendFollowSidebar
   
