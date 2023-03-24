import { ACLogoSmallIcon, HomeIcon, ProfileIcon, LogoutIcon } from 'assets/images';



const AdminSideBar: React.FC = () => {
    return (
        <div className='h-full flex flex-col ml-[69px] items-start mr-[25px]'>
            <ACLogoSmallIcon />
            <div className='flex flex-row gap-[20px] mt-[45px]'>
                <HomeIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">推文清單</h1>
            </div>
            <div className='flex flex-row gap-[20px] mt-[30px]'>
                <ProfileIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">使用者列表</h1>
            </div>
            <div className='flex flex-row gap-[20px] mt-auto'>
                <LogoutIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">登出</h1>
            </div>
        </div>
    );
  };
  
  export default AdminSideBar;
  
