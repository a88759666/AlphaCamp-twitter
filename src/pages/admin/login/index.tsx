import { adminLogin } from "api/admin";
import { InputCard, SubmitBtn, LogoTitle, Container } from "components/AuthInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [ account, setAccount ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userId, setUserId ] = useState()
  const navigate = useNavigate()
  const go = useNavigate()

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
  async function handleClickAdminLogin() {
  
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
   
    const { success, token, id } = await adminLogin({
      account,
      password,
    })
    if (success) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id)
      go('/admin/home')
    } 
  }
  
    
  return (
      <Container>
        <LogoTitle title="後台登入"/>
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
        <SubmitBtn 
          btn="登入"
          onClickEvent={handleClickAdminLogin}
        />
        <div className="mt-6">
          <p className="link text-end" onClick={() => navigate("/login")}>前台登入</p>
        </div>
      </Container>
    )
  };
  
  export default AdminLogin;
  
