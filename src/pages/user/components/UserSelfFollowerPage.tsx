import { BackIcon } from "assets/images";
import Container from "components/Container";
import SideBar from "components/SideBar";
import RecommendFollowSidebar from "pages/home/components/RecommendFollow";
import { useNavigate } from "react-router-dom";
import { Follower } from "type";
import { useEffect, useState } from "react";
import { checkPermissionUser } from "api/Auth";
import { getUserFollower } from "api/tweet";

type Props = {
    name?: string,
    key?: number,
    avatar?: string,
    text?: string,
    isFollowing?: boolean
}
const UserSelfFollowCard:React.FC<Props> = ({
    name,
    avatar,
    text,
    isFollowing
}) => {
    return (
        <div className="py-[16px] pl-[24px] pr-[30px] flex flex-col border-b border-slate-200">
            <div className="flex flex-row mb-[8px] items-center">
                <div
                    className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mr-[8px]"
                    style={{
                        backgroundImage: `url(${avatar})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                />
                <p className="font-bold text-[16px] leading-[26px] ">{name}</p>
                <button
                    className={`${
                        isFollowing ? "btn-orange text-white" : "btn-inherit"
                        } text-center px-[15px]  cursor-pointer text-[15px] font-[700] leading-[15px] ml-auto`}
                >
                    {isFollowing ? "正在跟隨" : "跟隨"}
                </button>
            </div>
            <div className="font-[400] text-[16px] leading-[26px] pl-[56px]">
                {text}
            </div>
        </div>
    )
}



const UserSelfFollowerPage:React.FC = () => {
    const [ follower, setFollower ] = useState<Follower[]>([])

    const go = useNavigate()
    async function getFollowingAsync() {
        try {
          const userId = localStorage.getItem('userId') as string
          const followingData = await getUserFollower(userId)
          if ( followingData ) {
            setFollower(followingData)
            console.log(followingData)

          }
        } catch (error) {
          console.error(error)
        }
    }
    async function checkTokenIsValid() {
        const token = localStorage.getItem('token');
        if (!token) {
            go('/login')
        }
        const userId = localStorage.getItem('userId')
        if(userId) {
            const userData = await checkPermissionUser(userId);
            if (!userData) {
            go('/login')
            } else {
            // setUserData(userData)
            // console.log(userData)
            }
        }
    }
      
    useEffect(() => {
        checkTokenIsValid()
        getFollowingAsync()
    },[go])

    return (
        <Container>
          <div className="flex flex-row h-screen">
            <div className="basis-1/3 pl-[30px] py-4">
              <SideBar />
            </div>
            <div className="basis-5/7 border-l border-r border-slate-200">
                <div className="flex flex-col">
                    <header className="flex flex-row p-[30px] items-center gap-[20px] border-slate-200 border-b">
                        <BackIcon 
                            onClick={() => go('/user')}
                        />
                        <div className="flex flex-col items-start">
                            <div className="font-[700] text-[18px] leading-[26px]">Joho Doe</div>
                            <div className="font-[500] text-[13px] leading-[18px]">25 推文</div>
                        </div>
                    </header>
                    <div className="w-full flex flex-row  mb-[10px] border-slate-200 border-b">
                        <div 
                            className="basis-1/4 font-[700] py-[15px] text-[15px] leading-[22px] text-center cursor-pointer text-orange-400 border-b border-orange-400"
                            onClick={() => go('/user/follower')}
                        >
                            追隨者
                        </div>
                        <div 
                            className="basis-1/4 font-[700] py-[15px] text-[15px] leading-[22px] text-center cursor-pointer active:text-activeOrange"
                            onClick={() => go('/user/following')}
                        >
                            正在跟隨
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {Array.isArray(follower) &&
                            follower.map(item => {
                                return(
                                <UserSelfFollowCard
                                    key={item.followerId}
                                    name={item.Follower?.name}
                                    avatar={item.Follower?.avatar}
                                    text={item.Follower?.introduction}
                                    isFollowing={false}
                                /> 
                                )
                            })
                        }
                    </div>
                </div>
              
            </div>
            <div className="basis-3/7">
              <RecommendFollowSidebar />
            </div>
          </div>
        </Container>
        
      );
    
    
}
  
export default UserSelfFollowerPage;


