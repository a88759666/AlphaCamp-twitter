import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate()

    return (
      <Container>
        <LogoTitle title="建立你的帳號" />
        <InputCard label="帳號" placeholder="請輸入帳號" />
        <InputCard label="名稱" placeholder="請輸入使用者名稱" />
        <InputCard label="Email" placeholder="請輸入Email" />
        <InputCard label="密碼" placeholder="請設定密碼" />
        <InputCard label="密碼確認" placeholder="請再次輸入密碼" />
        <SubmitBtn btn="註冊" />
        <div className="mt-6">
          <p className="link text-center" onClick={() => navigate("/login")}>取消</p>
        </div>
      </Container>
    )
  };
  
  export default Register;
  