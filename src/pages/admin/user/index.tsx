import AdminSideBar from "../components/AdminSideBar";
import Container from "components/Container";
import { VectorIcon, LikeBigIcon } from "assets/images";

const UserCard = (props: {coverUrl:string, avatar:string, userName:string, userAccount:string }) => {
  const {coverUrl, avatar, userName, userAccount} = props
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
            <p>1.5K</p>
          </div>
          <div className="flex">
            <LikeBigIcon/>
            <p className="">20K</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex mr-2">
            <p className="text-black text-[14px]">
              34個
              <span className="text-[#6C757D]">跟隨中</span>
            </p>
          </div>
          <div className="flex">
            <p className="text-black text-[14px]">
              59位
              <span className="text-[#6C757D]">追隨中</span>
            </p>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

const AdminUser: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <main className="basis-5/7 border-l ">
          <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">使用者列表</header>
          <UserCard 
            coverUrl="https://picsum.photos/300/300?text=1"
            avatar="https://picsum.photos/300/300?text=2"
            userName="John Doe"
            userAccount="heyJohn"
            />
        </main>
      </div>
    </Container>
  )

  };
  
  export default AdminUser;
  