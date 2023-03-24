import { InputCard, SubmitBtn, LogoTitle, Container } from "components/AuthInput";

const AdminLogin = () => {
    return (
      <Container>
        <LogoTitle title="後台登入"/>
        <InputCard label="帳號" placeholder="請輸入帳號"/>
        <InputCard label="密碼" placeholder="請輸入密碼"/>
        <SubmitBtn btn="登入"/>
        <div className="mt-6 flex">
            <p className="flex-1 text-end link">註冊</p>
            <span className="block px-[20px]">&#8729;</span>
            <p className="link">後台登入</p>
        </div>
      </Container>
    )
  };
  
  export default AdminLogin;
  