import Container from "components/Container";
import SideBar from "components/SideBar";
import MainPage from "./components/MainPage";
import RecommendFollowSidebar from "./components/RecommendFollow";


const Home = () => {
  return (
    <Container>
      <div className="flex h-screen  ">
        <nav className="basis-3/7 pl-[30px] py-4">
          <SideBar />
        </nav>
        <MainPage />
        <RecommendFollowSidebar />

      </div>
    </Container>
  )
};
  
export default Home;
  