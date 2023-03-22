import { ACLogoSmallIcon, HomeIcon, ProfileIcon, SettingIcon, LogoutIcon } from 'assets/images';



const SideBar: React.FC = () => {
    return (
        <div className='h-full flex flex-col ml-[69px] items-start mr-[24px]'>
            <ACLogoSmallIcon />
            <div className='flex flex-row gap-[16px] mt-[30px]'>
                <HomeIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]" >首頁</h1>
            </div>
            <div className='flex flex-row gap-[16px] mt-[40px]'>
                <ProfileIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">個人資料</h1>
            </div>
            <div className='flex flex-row gap-[16px] mt-[40px]'>
                <SettingIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">設定</h1>
            </div>
            <button className="w-full btn-orange mt-[24px] py-[8px]">
                <h1 className="font-[500] text-white text-[18px] leading-[18px]">推文</h1>
            </button>
            <div className='flex flex-row gap-[16px] mt-auto'>
                <LogoutIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">登出</h1>
            </div>
        </div>
    );
  };
  
  export default SideBar;
  