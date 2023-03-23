const ProfileCard = (props :{
  currentUserName:string,
  currentUserAccount:string,
  currentUserBio:string,
  currentUserFollow:number,
  currentUserFollowed:number,
  coverUrl:string
  }) => {
    const {currentUserAccount, currentUserName, currentUserBio, currentUserFollow, currentUserFollowed, coverUrl} = props
  return(
    <div className="flex flex-col h-1/2 relative">
      <div className="basis-1/2 bg-orange-100 overflow-hidden"
        style={{
          backgroundImage: `url(${coverUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>
      </div>
      <div className="basis-1/2 ml-4">
        <div className="mt-[72px]">
          <p className=" font-bold">{currentUserName}</p>
          <p className="text-[14px] text-[#6C757D] ">@{currentUserAccount}</p>
          <p className="text-[14px] py-[6px]">{currentUserBio}</p>
          <p className="text-[14px] text-[#6C757D]">
            <span className="text-black">{currentUserFollow}個</span>跟隨中
            <span className="text-black ml-4">{currentUserFollowed}位</span>追隨者
          </p>
        </div>
        <button className="rounded-[50px] px-4 py-2 border border-[#FF6600] bg-white text-[#FF6600] hover:opacity-50 absolute top-1/2 right-4 mt-4">
          編輯個人資料
        </button>
      </div>
      <img src="https://picsum.photos/300/300?text=2" alt="profile pic" className="absolute rounded-full width-[140px] h-[140px] top-[124px] left-4 border-4 border-white" />
    </div>
  )
}

export default ProfileCard;