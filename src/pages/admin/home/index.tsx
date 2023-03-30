
import { adminDeleteTweets, adminGetTweets } from "api/admin";
import { CloseIcon } from "assets/images";
import Container from "components/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminTweetList } from "type";

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
  // const handleDelete = async () => {
  //   if (onDelete && id) {
  //     await onDelete(id)
  //   }
  // }
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
        <div 
          className="ml-auto cursor-pointer"
          onClick={() => id !== undefined && onDelete?.(id)}
          // onClick={handleDelete}
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
      // console.log(userList)
      if (res) {
        setUserList(res)
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function adminDeleteTweetsAsync(id: number){
    try {
      // const res = await adminDeleteTweets(id)
      // if (res) {
      //   setUserList(res)
      // }
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
  async function checkTokenIsValid() {
    const token = localStorage.getItem('token')
    if (!token) {
      go('admin/login')
    }
  }
  
  useEffect(() => {
    checkTokenIsValid()
    adminGetTweetsAsync()
  }, [go])

  return (
    <Container>
      <div className="flex flex-row h-screen">
        <div className="basis-1/3 pl-[30px] py-4">
          <AdminSideBar />
        </div>
        <div className="basis-5/7 border-l border-r border-slate-200">
          <header className="font-[700] text-[24px] leading-[26px] border-b border-slate-200 px-[20px] py-[24px]">推文清單</header>
          {
            userList?.map((item) => {
              const {
                name,
                account,
                avatar,
                id,
                UserId,
                description,
                createdAt,
                updatedAt,
              } = item
              return (
                <AdminTweetCard
                  key={id}
                  name={name}
                  account={account}
                  time={createdAt}
                  avatar={avatar}
                  text={description}
                  onDelete={adminDeleteTweetsAsync}
                  id={id}
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



