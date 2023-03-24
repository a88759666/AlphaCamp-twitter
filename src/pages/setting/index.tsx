import Container from "components/Container";
import { useState } from "react";
import { InputCard, SubmitBtn } from "../../components/AuthInput"
import SideBar from "../../components/SideBar"

const Setting: React.FC = () => {
  const [ account, setAccount ] = useState('')
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')
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
      <div className="flex h-screen">
        <nav className="basis-3/7 pl-[30px] py-4">
          <SideBar />
        </nav>
        <main className="basis-4/7 border-x relative">
          <h4 className="font-bold border-b p-6">帳戶設定</h4>
          <div className="px-6">
            <InputCard 
              label="帳號" 
              placeholder="請輸入帳號"
              type='text'
              name='account'
              id="account"
              value={account}
              onChange={onChangeAccountHandler}
              wSize='large'
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
              wSize='large'
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
              wSize='large'
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
              wSize='large'
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
              wSize='large'
              hSize="small" 
            />
          </div>
          <div className="w-20 absolute right-6">
            <SubmitBtn btn="儲存" />
          </div>
        </main>
        <section className="basis-3/7 "></section>
      </div>
    </Container>
  )
};

export default Setting;

