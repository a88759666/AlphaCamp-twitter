import AdminSideBar from "../components/AdminSideBar";
import Container from "components/Container";
import { VectorIcon, LikeBigIcon } from "assets/images";
import TweetContextProvider, { useTweetContext } from "contexts/TweetContextProvider";

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
    <div className="w-[210px] relative">
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
  // const{dummydata} = useTweetContext()
  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <TweetContextProvider >
          <main className="basis-5/7 border-l ">
            <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">使用者列表</header>
            <div className="grid grid-flow-row grid-cols-4 gap-4 p-4">
              {/* {dummydata.map(item => {
                return(
                  <UserCard 
                    coverUrl="https://picsum.photos/300/300?text=1"
                    avatar={item.avatar}
                    userName={item.userName}
                    userAccount={item.account}
                    posts={1.5}
                    likes={20}
                    following={36}
                    followed={59}
                    />
                )
              })} */}
            </div>
          </main>
        </TweetContextProvider>
      </div>
    </Container>
  )

  };
  
  export default AdminUser;
  