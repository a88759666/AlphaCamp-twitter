import Container from "components/Container";
import SideBar from "components/SideBar";
import TweetContextProvider from "contexts/TweetContextProvider";
import RecommendFollowSidebar from "../home/components/RecommendFollow";
import ReplyPage from "./components/ReplyPage";


const Reply = () => {
  return (
    <Container>
      <div className="flex h-screen  ">
        <nav className="basis-1/3 pl-[30px] py-4">
          <SideBar />
        </nav>
        <TweetContextProvider>
          <ReplyPage />
          <RecommendFollowSidebar />
        </TweetContextProvider>
      </div>
    </Container>
  )
};
  
export default Reply;
