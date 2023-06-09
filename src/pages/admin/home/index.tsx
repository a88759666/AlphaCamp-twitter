import { adminDeleteTweets, adminGetTweets } from "api/admin";
import { CloseIcon } from "assets/images";
import Container from "components/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminTweetList } from "type";
import { getHoursFrom } from "../../home/components/MainPage"
import "styles/scrollbar.css"
import AdminSideBar from "../components/AdminSideBar";

type Props = {
  name?: string
  account?: string
  time?: string
  avatar?: string
  id?: number
  text?: string
  onDelete?: (id: number) => void
};
const AdminTweetCard:React.FC<Props> = ({
  name,
  account,
  time,
  avatar,
  id,
  text,
  onDelete
}) => {
  let newTime;
  if(time){
    const {hours, days} = getHoursFrom(time)
    if(hours !== 0){
      newTime = days === 0 ?  (hours + "小時") : (days + "天" + hours + "小時")
    }else if(hours === 0 && days === 0){
      newTime = "就在最近"
    }else if(hours === 0){
      time = days + "天"
    }
  }
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
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">{newTime}</p>
        </div>
        <div 
          className="ml-auto cursor-pointer"
          onClick={() => id !== undefined && onDelete?.(id)}
        >
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
  const [ userList, setUserList ] = useState<AdminTweetList[]>([])
  const go = useNavigate()
  async function adminGetTweetsAsync(){
    try {
      const res = await adminGetTweets()
      if (res) {
        setUserList(res)
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function adminDeleteTweetsAsync(id: number){
    try {
      await adminDeleteTweets(id)
      setUserList((prevUserList) => {
        return prevUserList.filter((userList) => {
          if (userList.id === id){
            return null
          }
          return userList
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    async function checkTokenIsValid() {
      const token = localStorage.getItem('token')
      if (!token) {
        go('admin/login')
      }
    }
    checkTokenIsValid()
    adminGetTweetsAsync()
  }, [go])

  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <div className="basis-5/7 border-l border-r border-slate-200 overflow-auto">
          <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">推文清單</header>
          {
            userList?.map((item) => {
              return (
                <AdminTweetCard
                  key={item.id}
                  name={item.User?.name}
                  account={item.User?.account}
                  time={item.createdAt}
                  avatar={item.User?.avatar}
                  text={item.description}
                  onDelete={adminDeleteTweetsAsync}
                  id={item.id}
                />
              )
            })
          }
        </div>
        
      </div>
    </Container>
    
  );
};
  
export default AdminHome;



