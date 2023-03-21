import Container from "components/Container";
import SideBar from "components/SideBar";
import MainPage from "./components/MainPage";

const Home = () => {
  return (
    <Container>
      <div className="flex h-screen  ">
        <nav className="basis-3/7 pl-[30px] py-4">
          <SideBar />
        </nav>
        <MainPage />
        <section className="basis-3/7 ">

        </section>
      </div>
    </Container>
  )
};
  
export default Home;
  