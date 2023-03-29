import { adminLogout } from 'api/admin';
import { ACLogoSmallIcon, HomeIcon, ProfileIcon, LogoutIcon } from 'assets/images';
import { useNavigate } from 'react-router-dom';



const AdminSideBar: React.FC = () => {
    const go = useNavigate()
    function handleClickSignout() {
        // adminLogout()
        go('/admin/login')
    }
    return (
        <div className='h-full flex flex-col ml-[69px] items-start mr-[25px]'>
            <ACLogoSmallIcon />
            <div 
                className='flex flex-row gap-[20px] mt-[45px] cursor-pointer'
                onClick={() => go('/admin/home')}
            >
                <HomeIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">推文清單</h1>
            </div>
            <div 
                className='flex flex-row gap-[20px] mt-[30px] cursor-pointer'
                onClick={() => go('/admin/users')}
            >
                <ProfileIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">使用者列表</h1>
            </div>
            <div 
                className='flex flex-row gap-[20px] mt-auto cursor-pointer'
                onClick={handleClickSignout}
            >
                <LogoutIcon />
                <h1 className="font-[700] text-[18px] leading-[26px]">登出</h1>
            </div>
        </div>
    );
  };
  
  export default AdminSideBar;
  
