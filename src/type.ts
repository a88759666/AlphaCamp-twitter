export type Tweet = {
    User?: {
      UserId?: number,
      avatar?: string,
      account?: string
      name?: string
    }
    id?: number,
    description?: string,
    createdAt?: string,
    updatedAt?: string,
    replyNum?: number,
    likeNum?: number,
    isliked?: number,
    avatar?: string,
  }
export type Like = {
  Tweet?: {
    id?: number,
    description?: string,
    createdAt?: string,
    updatedAt?: string
    replyNum?: number,
    likeNum?: number,
    isliked?: number
    User?: {
      UserId?: number,
      avatar?: string,
      account?: string
      name?: string
    }
  }
}

export type RepliedTweet = {
  comment?: string,
  createdAt?: string,
  updatedAt?: string,
  User?:{
    name?: string
  }
  Tweet?: {
    TweetId?: number,
    User?: {
      UserId?: number,
      avatar?: string,
      account?: string
      name?: string
    }
  }
}
export type User = {
  id?: number,
  account?: string,
  emaii?: string,
  name?: string,
  introduction?: string,
  createdAt?: string,
  updatedAt?: string,
  avatar?: string,
  cover?: string
}

export type Following = {
  followingId?: number
  Following?: {
    introduction?: string
    UserId?: number,
    avatar?: string,
    name?: string
  }
}

export type Follower = {
  followerId?: number
  Follower?: {
    introduction?: string
    UserId?: number,
    avatar?: string,
    name?: string
  }
}