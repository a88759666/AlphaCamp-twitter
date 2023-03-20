import { ACLogoIcon as Logo } from "../../assets/images/index"

interface Props {children: React.ReactNode}

//註冊頁面共用元件
export const InputCard = (props : {label:string, placeholder:string}) => {
  const {label, placeholder} = props
  return(
    <form>
      <div className="bg-[#F5F8FA] border-b-2 border-b-black my-8 px-2.5">
        <label htmlFor="account" className="block text-[14px]">{label}</label>
        <input id="account" type="text" name="userAccount" placeholder={placeholder} className="bg-inherit focus:outline-none"></input>
      </div>      
    </form>
  )
}

//跟註冊頁面共用
export const LogoTitle = (props : {title: string}) => {
  const { title } = props
  return(
    <>
      <div className ="w-[50px] mx-auto pl-1">
        <Logo />
      </div>
      <h3 className="text-center">{title}</h3>
    </>
  )
}

export const Container: React.FC<Props> = ({children}) => {
  return(
    <div className="container max-w-[1140px] mx-auto">
      <div className="w-2/6 mt-16 mx-auto">
        {children}
      </div>
    </div>
  )
}

export const SubmitBtn = (props: { btn: string }) => {
  const {btn} = props
  return(
    <div>
      <button className="bg-[#FF6600] text-white w-full h-[46px] rounded-[50px] cursor-pointer hover:bg-orange-700 focus:ring-orange-300">{btn}</button>
    </div>
  )
}

const Login: React.FC = () => {
    return (
      <Container>
        <LogoTitle title="登入 Alphitter"/>
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
  
export default Login;
  