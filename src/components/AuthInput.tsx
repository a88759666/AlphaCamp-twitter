
import { ACLogoIcon as Logo } from "../assets/images/index"

interface Props {children: React.ReactNode}

//註冊頁面共用元件
export const InputCard = (props : {
  label:string, 
  placeholder?:string, 
  wSize?: "medium" | "small" | "large"
  hSize?: "medium" | "small" | undefined
  type?: string,
  name?: string,
  id?: string,
  value?: any,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  showError?: boolean,
  ErrorText?: string
}) => {
  const {label, placeholder, wSize, hSize, type, name, id, value, onChange, showError, ErrorText} = props
  return (
    <form>
      <div className={`
        ${
          wSize === 'small' ? "w-[380px]" : null
        }
        ${
          wSize === 'medium' ? "w-[480px]" : null
        }
        ${
          wSize === 'large' ? "w-[593px]" : null
        }    
        ${
          hSize === 'small' ? "h-[54px]" : "h-[150px]"  
        } bg-[#F5F8FA] my-8 px-2.5`}>
        <label htmlFor={name} className="block text-[14px]">{label}</label>
        <input 
          id={id}
          type={ type || 'text' }
          name={name} 
          value={value}
          placeholder={placeholder} 
          onChange={onChange}
          className={`
            ${
              showError ? "border-b-2 border-[#FC5A5A]" : null
            } inputDefault inputDefault:hover inputDefault:focus`}
            
        />
        { showError &&
          <p className="mt-[5px] font-[500] text-[12px] leading-[20px] text-[#FC5A5A]">{ErrorText}</p>
        }
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
      <h3 className="text-[28px] text-center font-bold">{title}</h3>
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

export const SubmitBtn = (props: { btn: string, onClickEvent?: () => Promise<void>, onKeyEvent?:() => void }) => {
  const {btn, onClickEvent, onKeyEvent} = props
  return(
    <div>
      <button 
        className="bg-[#FF6600] text-white w-full h-[46px] rounded-[50px] cursor-pointer hover:bg-orange-700 focus:ring-orange-300"
        onClick={onClickEvent}
        onKeyDown={(e) => {
            if (e.key === 'Enter' && onKeyEvent !== undefined) {
              onKeyEvent();
            }
          }}
      >{btn}</button>
        
    </div>
  )
}
