import { InputCard, SubmitBtn } from "../login/index"
import SideBar from "../../components/SideBar"

const Setting: React.FC = () => {
  return (
    <div className="flex h-screen  ">
      <nav className="basis-3/7 pl-[30px] py-4">
        <SideBar />
      </nav>
      <main className="basis-4/7 border-x relative">
        <h4 className="font-bold border-b p-6">帳戶設定</h4>
        <div className="px-6">
          <InputCard label="帳號" placeholder="請輸入帳號" />
          <InputCard label="名稱" placeholder="請輸入使用者名稱" />
          <InputCard label="Email" placeholder="請輸入Email" />
          <InputCard label="密碼" placeholder="請設定密碼" />
          <InputCard label="密碼再確認" placeholder="請再次輸入密碼" />
        </div>
        <div className="w-20 absolute right-6">
          <SubmitBtn btn="儲存" />
        </div>
      </main>
      <section className="basis-3/7 "></section>
    </div>
  )
};

export default Setting;

