import Container from "components/Container";
import SideBar from "components/SideBar";
import TweetContextProvider from "contexts/TwwetContextProvider";
import MainPage from "./components/MainPage";
import RecommendFollowSidebar from "./components/RecommendFollow";


const Home = () => {
  return (
    <Container>
      <div className="flex h-screen  ">
        <nav className="basis-1/3 pl-[30px] py-4">
          <SideBar />
        </nav>
        <TweetContextProvider>
          <MainPage />
          <RecommendFollowSidebar />
        </TweetContextProvider>
      </div>
    </Container>
  )
};
  
export default Home;
  