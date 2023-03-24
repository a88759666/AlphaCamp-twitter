import { InputCard, SubmitBtn, LogoTitle, Container } from "components/AuthInput";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate()
    return (
      <Container>
        <LogoTitle title="後台登入"/>
        <InputCard label="帳號" placeholder="請輸入帳號"/>
        <InputCard label="密碼" placeholder="請輸入密碼"/>
        <SubmitBtn btn="登入"/>
        <div className="mt-6">
          <p className="link text-end" onClick={() => navigate("/login")}>前台登入</p>
        </div>
      </Container>
    )
  };
  
  export default AdminLogin;
  