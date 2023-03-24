import AdminSideBar from "../components/AdminSideBar";
import Container from "components/Container";

const AdminUser: React.FC = () => {
    return (
      <Container>
        <div className="basis-1/3 pl-[30px] py-4">
          <AdminSideBar />
        </div>
      </Container>
    )

  };
  
  export default AdminUser;
  