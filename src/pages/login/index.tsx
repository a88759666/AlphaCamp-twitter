import { InputCard, SubmitBtn, LogoTitle, Container} from "../../components/AuthInput"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkPermissionUser, login } from "api/Auth";
import Loading from "components/Loading";


const Login: React.FC = () => {
  const [ account, setAccount ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userId, setUserId ] = useState()
  const [ showError, setShowError ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState('')
  const [ loading , setLoading] = useState(false)

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
  async function handleClickLogin() {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    setLoading(() => true)
    const { success, token, id } = await login({
      account,
      password,
    });
    // console.log(error)
    if (success) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id)
      setUserId(id)
      setLoading(() => false)
    } else {
      setLoading(() => false)
      setShowError(true)
      setErrorMsg('帳號未註冊或是帳號密碼錯誤')
    }
    
    // if (error) {
    //   setShowError(true)
    //   setErrorMsg('帳號未註冊')
    // }
  }
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      
      if(userId) {
        const result = await checkPermissionUser(userId);
        if (result) {
          go('/home');
        }
      }
    }
    checkTokenIsValid();
  }, [go, userId]);
  
    return (
      <Container>
        {loading ?  <Loading /> : null}
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
          showError={showError}
          ErrorText={errorMsg}
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
          onClickEvent={handleClickLogin}
        />
        <div className="mt-6 flex">
            <p className="flex-1 text-end link" onClick={() => go("/register")}>註冊</p>
            <span className="block px-[20px]">&#8729;</span>
            <p className="link" onClick={() => go("/admin/login")}>後台登入</p>
        </div>
      </Container>
    )
  };
  
export default Login;
