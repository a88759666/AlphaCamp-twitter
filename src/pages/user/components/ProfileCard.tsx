import { BellIcon, BellRingIcon, EmailIcon } from "assets/images"
import { useNavigate } from "react-router-dom"


const ProfileCard = (props :{
  currentUserName:string,
  currentUserAccount:string,
  currentUserBio:string,
  currentUserFollow:number,
  currentUserFollowed:number,
  currentUserAvatar:string,
  coverUrl:string,
  handleEdit:() => void,
  type?: string,
  ringBell?: boolean,
  handleBellIcon: () => void
  }) => {
    const {currentUserAccount, currentUserName, currentUserBio, currentUserFollow, currentUserAvatar, currentUserFollowed, coverUrl, handleEdit, type, ringBell, handleBellIcon} = props
    const go = useNavigate()
  return(
    <div className="flex flex-col h-1/2 relative">
      <div className="basis-1/2 overflow-hidden"
        style={{
          backgroundImage: `url(${coverUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>
      </div>
      <div className="basis-1/2 ml-4">
        <div className="mt-[72px]">
          <p className=" font-bold">{currentUserName}</p>
          <p className="text-[14px] text-[#6C757D] ">@{currentUserAccount}</p>
          <p className="text-[14px] py-[6px]">{currentUserBio}</p>
          <p className="text-[14px] text-[#6C757D]">
            <span 
              className="text-black"
              onClick={() => go('/user/following')}
            >{currentUserFollow}個</span>跟隨中
            <span 
              className="text-black ml-4"
              onClick={() => go('/user/follower')}
            >{currentUserFollowed}位</span>追隨者
          </p>
        </div>
        {
          type === 'user1' && (
            <button  
              className="rounded-[50px] px-4 py-2 border border-[#FF6600] bg-white text-[#FF6600] hover:opacity-50 absolute top-1/2 right-4 mt-4"
              onClick={handleEdit}
            >
              編輯個人資料
            </button>
          )
        }
        {
          type === 'user2' && (
            <div className="flex flex-row absolute top-1/2 right-4 mt-4 gap-[16px] items-center">
                <div className="w-[40px] h-[40px] p-[10px] rounded-full border-2 border-orange-400 cursor-pointer">
                    <EmailIcon />
                </div>
                <div 
                    className={`${
                        ringBell ? 'bg-orange-400' : ''
                    } w-[40px] h-[40px] p-[8px] rounded-full border-2 border-orange-400 cursor-pointer`}
                    onClick={handleBellIcon}
                >
                    {
                        ringBell ?   <BellRingIcon /> : <BellIcon />
                    }
                </div>
                <button 
                    className="btn-orange text-white focus:btn-orange-focus hover:btn-orange-hover"
                >
                    <h1 className="px-[15px] text-[15px] font-[700] leading-[15px]">正在跟隨</h1>
                </button>
            </div>
          )
        }
      </div>
      <img src={currentUserAvatar} alt="profile pic" className="absolute rounded-full width-[140px] h-[140px] top-[80px] left-4 border-4 border-white" />
    </div>
  )
}

export default ProfileCard;
