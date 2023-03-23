import { ACLogoSmallIcon, ACLogoIcon, HomeIcon, ProfileIcon, SettingIcon, LogoutIcon } from 'assets/images';



const AdminSideBar: React.FC = () => {
    return (
        <div className='h-full flex flex-col ml-[69px] items-start mr-[25px]'>
            <ACLogoSmallIcon />
            <div className='flex flex-row gap-[20px] mt-[45px]'>
                <HomeIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]" >首頁</h1>
            </div>
            <div className='flex flex-row gap-[20px] mt-[30px]'>
                <ProfileIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">個人資料</h1>
            </div>
            <div className='flex flex-row gap-[20px] mt-[30px]'>
                <SettingIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">設定</h1>
            </div>
            <button className="w-full btn-orange mt-[25px] ">
                <h1 className="font-[500] text-white text-[18px] leading-[18px]">推文</h1>
            </button>
            <div className='flex flex-row gap-[20px] mt-auto'>
                <LogoutIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">登出</h1>
            </div>
        </div>
    );
  };
  
  export default AdminSideBar;
  