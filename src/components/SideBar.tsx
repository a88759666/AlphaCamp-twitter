import { logout } from 'api/Auth';
import { ACLogoSmallIcon, HomeIcon, ProfileIcon, SettingIcon, LogoutIcon } from 'assets/images';
import { useNavigate } from 'react-router-dom';



const SideBar: React.FC = () => {
    const go = useNavigate()
    function handleClickSignout() {
        logout()
        go('/login')
    }
    return (
        <div className='h-full flex flex-col ml-[69px] items-start mr-[24px]'>
            <ACLogoSmallIcon />
            <div 
                className='flex flex-row gap-[16px] mt-[30px] cursor-pointer'
                onClick={() => go('/home')}
            >
                <HomeIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]" >首頁</h1>
            </div>
            <div 
                className='flex flex-row gap-[16px] mt-[40px] cursor-pointer'
                onClick={() => go('/user')}
            >
                <ProfileIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">個人資料</h1>
            </div>
            <div 
                className='flex flex-row gap-[16px] mt-[40px] cursor-pointer'
                onClick={() => go('/setting')}
            >
                <SettingIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">設定</h1>
            </div>
            <button 
                className="w-full btn-orange mt-[24px] py-[8px]"
            >
                <h1 className="font-[500] text-white text-[18px] leading-[18px]">推文</h1>
            </button>
            <div 
                className='flex flex-row gap-[16px] mt-auto cursor-pointer'
                onClick={handleClickSignout}
            >
                <LogoutIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">登出</h1>
            </div>
        </div>
    );
  };
  
  export default SideBar;
  
