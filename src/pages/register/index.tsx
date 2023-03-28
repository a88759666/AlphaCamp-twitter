import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "api/Auth";

const Register:React.FC = () => {
  const [ account, setAccount ] = useState('')
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ checkPassword, setCheckPassword ] = useState('')
  const [ accountError, setAccountError ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ colError, setColError ] = useState(false)
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)

  const [ errorMsg, setErrorMsg ] = useState('')
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
    } else {
      let errorMsg = localStorage.getItem('errorMsg')
      if( errorMsg === 'Error: account 已重複註冊!'){
        setAccountError(true)
      } 
      if( errorMsg = 'Error: 暱稱上限50字!'){
        setNameError(true)
      } 
      if( errorMsg = 'Error: 還有欄位沒填'){
        setColError(true)
      } 
      if( errorMsg = 'Error: email 已重複註冊!'){
        setEmailError(true)
      } 
      if( errorMsg = 'Error: 密碼與確認密碼不同!'){
        setPasswordError(true)
      }
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
          showError={accountError}
          ErrorText="帳戶已經註冊過"
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
          showError={nameError}
          ErrorText="暱稱上限50字"
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
          showError={emailError}
          ErrorText="信箱已經註冊過" 
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
          showError={passwordError}
          ErrorText="密碼與確認密碼不同"  
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
          showError={colError}
          ErrorText="有欄位是空的"  
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
  

