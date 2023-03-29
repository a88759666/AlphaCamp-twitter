import { CloseIcon } from "assets/images";
import Container from "components/Container";
import { useTweetContext } from "contexts/TweetContextProvider";

import AdminSideBar from "../components/AdminSideBar";

type Props = {
  name?: string
  account?: string
  time?: string
  avatar?: string
  id?: number
  text?: string
};
const AdminTweetCard:React.FC<Props> = ({
  name,
  account,
  time,
  avatar,
  id,
  text,
}) => {
  return <>
    <div className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col">
      <div className="flex flex-row mb-[5px] items-center">
        <div
            className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mr-[8px]"
            style={{
                backgroundImage: `url(${avatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        />
        <div className="flex flex-row items-center gap-[8px]">
          <p className="font-bold text-[16px] leading-[26px] ">{name}</p>
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">@{account}</p>
          <div className="w-[4px] h-[4px] rounded-full bg-[#6C757D]"></div>
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">{time}小時</p>
        </div>
        <div className="ml-auto">
          <CloseIcon />  
        </div>
      </div>
      <div className="font-[400] text-[16px] leading-[26px] pl-[56px]">
        {text}
      </div>
    </div>
  </>
}


const AdminHome: React.FC = () => {
  // const { dummydata } = useTweetContext() 
  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/3 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <div className="basis-5/7 border-l border-r border-slate-200">
          <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">推文清單</header>
          {
            // dummydata?.map((item) => {
            //   const {
            //     userName,
            //     account,
            //     postTime,
            //     avatar,
            //     tweet,
            //   } = item
            //   return (
            //     <AdminTweetCard
            //       name={userName}
            //       account={account}
            //       time={postTime}
            //       avatar={avatar}
            //       text={tweet}
            //     />
            //   )
            // })
          }
        </div>
        
      </div>
    </Container>
    
  );
};
  
export default AdminHome;


