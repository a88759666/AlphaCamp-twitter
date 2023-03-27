import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "api/Auth";


const Register = () => {
  const [ account, setAccount ] = useState('')
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ checkPassword, setCheckPassword ] = useState('')
  const go = useNavigate()

  function onChangeAccountHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
        setAccount(event.currentTarget.value)
    }
  }
  function onChangeNameHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
      setName(event.currentTarget.value)
    }
  }
  function onChangeEmailHandler(event: React.FormEvent<HTMLInputElement>) {
      if (event.currentTarget) {
        setEmail(event.currentTarget.value)
      }
  }
  function onChangePasswordHandler(event: React.FormEvent<HTMLInputElement>) {
      if (event.currentTarget) {
        setPassword(event.currentTarget.value)
      }
  }
  function onChangeCheckPasswordHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
      setCheckPassword(event.currentTarget.value)
    }
  }
  async function handleClickRegister() {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (checkPassword.length === 0) {
        return;
    }
    if (password.length === 0) {
        return;
    }
   
    const { success } = await register({
      account,
      name,
      email,
      password,
      checkPassword
    })
    if (success) {
      console.log(success)
      go('/login')
      
    }
    
  }
    return (
      <Container>
        <LogoTitle title="建立你的帳號" />
        <InputCard 
          label="帳號" 
          placeholder="請輸入帳號"
          type='text'
          name='account'
          id="account"
          value={account}
          onChange={onChangeAccountHandler}
          wSize="small"
          hSize="small"
        />
        <InputCard 
          label="名稱" 
          placeholder="請輸入使用者名稱" 
          type='text'
          name='name'
          id="name"
          value={name}
          onChange={onChangeNameHandler}
          wSize="small"
          hSize="small"
        />
        <InputCard 
          label="Email" 
          placeholder="請輸入Email"
          type='email'
          name='email'
          id="email"
          value={email}
          onChange={onChangeEmailHandler}
          wSize="small"
          hSize="small" 
        />
        <InputCard 
          label="密碼" 
          placeholder="請設定密碼"
          type='password'
          name='password'
          id="password"
          value={password}
          onChange={onChangePasswordHandler}
          wSize="small"
          hSize="small" 
        />
        <InputCard 
          label="密碼確認" 
          placeholder="請再次輸入密碼"
          type='password'
          name='checkPassword'
          id="password"
          value={checkPassword}
          onChange={onChangeCheckPasswordHandler}
          wSize="small"
          hSize="small" 
        />
        <SubmitBtn 
          btn="註冊"
          onClickEvent={handleClickRegister} 
        />
        <div className="mt-6">
          <p className="link text-center" onClick={() => go("/login")}>取消</p>
        </div>
      </Container>
    )
  };
  
  export default Register;
  
