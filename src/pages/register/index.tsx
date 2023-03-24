import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Register = () => {
  const [ account, setAccount ] = useState('')
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')
  const navigate = useNavigate()

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
  function onChangePasswordConfirmHandler(event: React.FormEvent<HTMLInputElement>) {
      if (event.currentTarget) {
        setPasswordConfirm(event.currentTarget.value)
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
          name='passwordConfirm'
          id="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirmHandler}
          wSize="small"
          hSize="small" 
        />
        <SubmitBtn btn="註冊" />
        <div className="mt-6">
          <p className="link text-center" onClick={() => navigate("/login")}>取消</p>
        </div>
      </Container>
    )
  };
  
  export default Register;
  
