import  SideBar  from "components/SideBar"
import Container from "components/Container";
import RecommendFollowSidebar from "pages/home/components/RecommendFollow";
import TweetContextProvider from "contexts/TweetContextProvider";
import MainSector from "./components/MainSector"

const User2:React.FC = () => {
  return(
    <Container>
      <div className="flex h-screen  ">
        <nav className="basis-1/3 pl-[30px] py-4">
          <SideBar />
        </nav>
        <TweetContextProvider>
          <MainSector />
          <RecommendFollowSidebar />
        </TweetContextProvider>
      </div>
    </Container>
  )
};
  
  export default User2;
  
  