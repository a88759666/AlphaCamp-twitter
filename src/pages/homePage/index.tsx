import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { checkPermissionUser } from "api/Auth";
import { useTweetContext } from "contexts/TweetContextProvider";

//總導引頁
const HomePage = () => {
  const go = useNavigate()

  //決定導向頁面
  useEffect(() => {
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
          go('/home')
        }
    }
  }
  checkTokenIsValid()
  },[go])
  return <></>
};

export default HomePage;
