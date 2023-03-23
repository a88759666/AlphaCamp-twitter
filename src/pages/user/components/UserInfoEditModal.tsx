import { CloseIcon } from "assets/images"
import { InputCard } from "components/AuthInput"
import React from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
    onClose?: () => void
}

const UserInfoEditModal:React.FC<Props> = ({
    onClose
}) => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
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
                                        <div className="btn-orange focus:btn-orange-focus hover:btn-orange-hover ml-auto">
                                            <h1 className="px-[15px] text-[15px] text-white font-[700] leading-[15px]">儲存</h1>
                                        </div>
                                    </div>
                                    <div className="w-[600px] h-[200px] relative">
                                        <img
                                            src="https://picsum.photos/600/200?text=2"
                                            className="bg-cover bg-center"
                                        />
                                        <img
                                            src="https://picsum.photos/200/200?text=2"
                                            className="w-[120px] h-[120px] rounded-full bg-cover bg-center absolute left-0 bottom-0 translate-x-[15px] translate-y-[60px]"
                                        />
                                    </div>
                                    <div className="flex flex-col px-[15px] mt-[80px] mb-[50px]">
                                        <InputCard 
                                            label="名稱"                  
                                        />
                                        <p className="text-slate-600 font-[500] text-[15px] leading-[22px] mt-[-30px] ml-auto mb-[20px]">8/50</p>
                                        <InputCard 
                                            label="自我介紹"
                                        />
                                        <p className="text-slate-600 font-[500] text-[15px] leading-[22px] mt-[-30px] ml-auto">0/160</p>
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