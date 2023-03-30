import { CameraIcon, CancelIcon, CloseIcon } from "assets/images"
import { InputCard } from "components/AuthInput"
import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import { checkPermissionUser, editUserModal } from "api/Auth";

type Props = {
    onClose?: () => void
}

const UserInfoEditModal:React.FC<Props> = ({
    onClose
}) => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const [ name, setName ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ cover, setCover ] = useState('')
    const [ introduction, setIntroduction ] = useState('')
    const [ isUpdating, setIsUpdating ] = useState(false)
    const go = useNavigate()
   

    function onChangeNameHandler(event: React.FormEvent<HTMLInputElement>) {
        if(isUpdating){
            return;
        }
        if (event.currentTarget) {
          setName(event.currentTarget.value)
        }
    }
    function onChangeIntroductionHandler(event: React.FormEvent<HTMLInputElement>) {
        if(isUpdating){
            return;
        }
        if (event.currentTarget) {
          setIntroduction(event.currentTarget.value)
        }
    }
    function onChangeAvatarHandler(event: React.FormEvent<HTMLInputElement>) {
        if(isUpdating){
            return;
        }
        if (event.currentTarget) {
          setAvatar(event.currentTarget.value)
        }
    }
    function onChangeCoverHandler(event: React.FormEvent<HTMLInputElement>) {
        if(isUpdating){
            return;
        }
        if (event.currentTarget) {
          setCover(event.currentTarget.value)
        }
    }

    async function handleClickSaveModal(){
        if (avatar.length === 0) {
            return;
        }
        if (cover.length === 0) {
        return;
        }
        if (name.length === 0) {
            return;
        }
        if (introduction.length === 0) {
            return;
        }
        if (name.length >= 51) {
            return;
        }
        if (introduction.length >= 160) {
            return;
        }
        setIsUpdating(true)
        const userId = localStorage.getItem('userId') as string
        const { success } = await editUserModal({
            name,
            avatar,
            cover,
            introduction,
            userId
        })
        if (success) {
            console.log(success)
            setOpen(false)
        }
        setIsUpdating(false)
    }

    async function getUserInfo(){
        const id = localStorage.getItem('userId') as string
        const UserInfo = await checkPermissionUser(id)
        if(UserInfo) {
            setName(UserInfo[2])
            setAvatar(UserInfo[3])
            setCover(UserInfo[4])
            setIntroduction(UserInfo[5])
        }
        console.log(UserInfo)
    }
    function handleUploadCover(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null
        if(file){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
        
            fileReader.addEventListener("load", async() => {
                const url = await fileReader.result as string // 將 any 型別轉換為 string
                setCover(url)
                // console.log(cover)
            })
        }
    }
    function handleUploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null
        if(file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
        
            fileReader.addEventListener("load", async() => {
                const url = await fileReader.result as string
                setAvatar(url)
                // console.log(Avatar)
            })
        }
    }
    function handleClearCover(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        setCover('')
    }

    
    useEffect(() => {
        getUserInfo()
    }, [])
    return <>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="flex flex-col border-solid rounded-3xl z-10 ">
                                    <div className="flex flex-row p-[15px] items-center">
                                        <div className="mr-[40px] cursor-pointer">
                                            <CloseIcon onClick={onClose}/>
                                        </div>
                                        <h1 className="font-[700] text-[19px] leading-[28px]">編輯個人資料</h1>
                                        <div 
                                            className="btn-orange focus:btn-orange-focus hover:btn-orange-hover ml-auto"
                                            onClick={handleClickSaveModal} 
                                        >
                                            <h1 className="px-[15px] text-[15px] text-white font-[700] leading-[15px]">儲存</h1>
                                        </div>
                                    </div>
                                    <div className="w-[600px] h-[200px] relative">
                                        <img
                                            src={cover}
                                            className="bg-cover bg-center"
                                        />
                                        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50" />
                                        <div className="absolute flex flex-row gap-[60px] top-[90px] left-[220px]">
                                            <label
                                                className="cursor-pointer" 
                                                htmlFor='inputCover'
                                            >
                                                <CameraIcon />
                                            </label>
                                            <input 
                                                type='file' 
                                                id='inputCover' 
                                                className="hidden"
                                                accept="image/png, image/svg, image/jpg"
                                                onChange={handleUploadCover}
                                            />
                                            <div
                                                className="cursor-pointer" 
                                                onClick={handleClearCover}
                                            >
                                                <CancelIcon />
                                            </div>
                                        </div>

                                        <div className="absolute left-0 bottom-0 translate-x-[15px] translate-y-[60px]">
                                            <img
                                                src={avatar}
                                                className="w-[120px] h-[120px] rounded-full bg-cover bg-center relative"
                                            />
                                            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full rounded-full overflow-hidden bg-black bg-fixed opacity-50" />
                                            <label
                                                className="cursor-pointer absolute top-[50px] left-[50px]"
                                                htmlFor='inputAvatar'
                                            >
                                                <CameraIcon />
                                            </label>
                                            <input 
                                                type='file' 
                                                id='inputAvatar' 
                                                className="hidden"
                                                accept="image/png, image/svg, image/jpg"
                                                onChange={handleUploadAvatar}
                                            />
                                        </div>
                                        

                                    </div>
                                    <div className="flex flex-col px-[15px] mt-[80px] mb-[50px]">
                                        <InputCard 
                                            label="名稱" 
                                            placeholder="請輸入使用者名稱" 
                                            type='text'
                                            name='name'
                                            id="name"
                                            value={name}
                                            onChange={onChangeNameHandler}
                                            wSize='medium'
                                            hSize="small"
                                        />
                                        {name.length <= 50 &&
                                            <p className="text-slate-600 font-[500] text-[15px] leading-[22px] mb-[20px] mt-[-30px] ml-auto">{name.length}/50</p>
                                        }
                                        {name.length > 50 &&
                                            <div className="flex flex-row items-center justify-between mb-[20px] mt-[-30px]">
                                                <p className="font-[500] text-[12px] leading-[22px] text-[#FC5A5A]">字數超出上限</p>
                                                <p className="text-slate-600 font-[500] text-[15px] leading-[22px]">{name.length}/50</p>
                                             </div>
                                        }
                                       
                                        <InputCard 
                                            label="自我介紹" 
                                            placeholder="請輸入自我介紹" 
                                            type='text'
                                            name='introduction'
                                            id="introduction"
                                            value={introduction}
                                            onChange={onChangeIntroductionHandler}
                                            wSize='medium'
                                            hSize='medium'

                                        />
                                        {introduction.length <= 160 &&
                                            <p className="text-slate-600 font-[500] text-[15px] leading-[22px] mb-[20px] mt-[-30px] ml-auto">{introduction.length}/160</p>
                                        }
                                        {introduction.length > 160 &&
                                            <div className="flex flex-row items-center justify-between mb-[20px] mt-[-30px]">
                                                <p className="font-[500] text-[12px] leading-[22px] text-[#FC5A5A]">字數超出上限</p>
                                                <p className="text-slate-600 font-[500] text-[15px] leading-[22px]">{introduction.length}/160</p>
                                             </div>
                                        }
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        
  
        
        
        
    </>
}

export default UserInfoEditModal
