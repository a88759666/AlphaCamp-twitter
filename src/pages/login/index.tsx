import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Login: React.FC = () => {
  const [ account, setAccount ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  function onChangeAccountHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
        setAccount(event.currentTarget.value)
    }
  }
  function onChangePasswordHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
      setPassword(event.currentTarget.value)
    }
  }
    return (
      <Container>
        <LogoTitle title="登入 Alphitter"/>
        <InputCard 
          type='text'
          name='account'
          id="account"
          label="帳號"
          value={account}
          onChange={onChangeAccountHandler}
          placeholder="請輸入帳號"
          wSize="small"
          hSize="small"
        />
        <InputCard
          type='password'
          name='password'
          id="password"
          label="密碼"
          value={password}
          onChange={onChangePasswordHandler}
          placeholder="請輸入密碼"
          wSize="small"
          hSize="small"
        />
        <SubmitBtn btn="登入"/>
        <div className="mt-6 flex">
            <p className="flex-1 text-end link" onClick={() => navigate("/register")}>註冊</p>
            <span className="block px-[20px]">&#8729;</span>
            <p className="link" onClick={() => navigate("/admin/login")}>後台登入</p>
        </div>
      </Container>
    )
  };
  
export default Login;
  
