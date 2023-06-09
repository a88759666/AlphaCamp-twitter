import AdminSideBar from "../components/AdminSideBar";
import Container from "components/Container";
import { VectorIcon, LikeBigIcon } from "assets/images";
import TweetContextProvider from "contexts/TweetContextProvider";
import { useEffect, useState } from "react";
import { getUsers } from "api/admin";
import "styles/scrollbar.css"

interface User  {
  id: number,
  account: string,
  email: string,
  name: string,
  avatar: string,
  cover: string,
  introduction: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  tweetsCount: number,
  followersCount: number,
  followingsCount: number,
  tweetsLikedCount: number
}

const UserCard = (props: {
  coverUrl:string, 
  avatar:string, 
  userName:string, 
  userAccount:string,
  posts:number,
  likes:number,
  following:number,
  followed:number
  }) => {
  const {coverUrl, avatar, userName, userAccount, posts, likes, following, followed} = props

  return(
    <div className="w-[210px] relative break-all cursor-pointer hover:opacity-80">
      <div className="h-[140px] overflow-hidden" 
        style={{backgroundImage: `url(${coverUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover"}}>
      </div>
      <div className="w-1/2 absolute top-16 left-1/4">
        <img src={avatar} alt="user" className="w-[100px] h-[100px] rounded-full border-4 border-white"/>
      </div>
      <div className="py-8 px-6 rounded-[10px] bg-[#F6F7F8]">
        <p className=" font-bold text-center">{userName}</p>
        <p className="text-[14px] text-[#6C757D] text-center">@{userAccount}</p>
        <div className="flex justify-center mt-[21px]">
          <div className="flex ">
            <VectorIcon/>
            <p className="ml-2">{posts}</p>
          </div>
          <div className="flex ml-4">
            <LikeBigIcon/>
            <p className="ml-1">{likes}</p>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex mr-2">
            <p className="text-black text-[14px]">
              {following}個
              <span className="text-[#6C757D]">跟隨中</span>
            </p>
          </div>
          <div className="flex">
            <p className="text-black text-[14px]">
              {followed}位
              <span className="text-[#6C757D]">跟隨者</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


const AdminUser: React.FC = () => {
  const [users, setUsers ] = useState<User[] | null>(null)

  useEffect(() => {
    async function getUsersAsync(){
      const res = await getUsers()
      if(res){
        setUsers(res)
      }
    }
    getUsersAsync()
  },[])

  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <TweetContextProvider >
          <main className="basis-5/7 border-l overflow-auto">
            <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">使用者列表</header>
            <div className="grid grid-flow-row grid-cols-4 gap-4 p-4">
              {users?.sort(function(a,b){return b.tweetsCount-a.tweetsCount})
                .map(item => {
                  return(
                    <UserCard 
                      coverUrl={item.cover}
                      avatar={item.avatar}
                      userName={item.name}
                      userAccount={item.account}
                      posts={item.tweetsCount}
                      likes={item.tweetsLikedCount}
                      following={item.followingsCount}
                      followed={item.followersCount}
                      key={item.id}
                      />
                  )
              })}
            </div>
          </main>
        </TweetContextProvider>
      </div>
    </Container>
  )

  };
  
  export default AdminUser;
  