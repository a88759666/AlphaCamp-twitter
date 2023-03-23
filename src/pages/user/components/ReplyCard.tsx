import { UserImage } from "components/TweetCard"

const ReplyCard = (props: {
  userName:string, 
  account:string, 
  postTime:string, 
  tweet:string, 
  url:string,
  replyAccount:string
  }) => {
    const { userName,account,postTime,tweet, url, replyAccount } = props
    return(
      <div className="flex px-6 py-4 border-b">
        <UserImage url={url}/>
        <div className="ml-2">
          <p>{userName} 
            <span className="text-[14px] text-[#6C757D] ml-2">
              @{account} &#8729; {postTime}小時
            </span>
          </p>
          <p className="text-[14px] text-[#6C757D]">回覆
            <span className="text-[#FF6600] ml-2 ">@{replyAccount}</span>{/*點擊可前往頁面 */}
          </p>
          <p className="leading-[26px]">{tweet}</p>
        </div>
      </div>
    )
}

export default ReplyCard