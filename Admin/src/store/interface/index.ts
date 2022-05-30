// GlobalStore
export interface GlobalState {
  token: string
  userInfo?: any
}

export interface CategoryProps {
  _id: string
  name: string
}

export interface ItemProps {
  _id: string
  name: string
  icon: string
}

export interface HeroProps {
  _id: string
  name: string
  avatar: string
}

export interface ArticleProps {
  _id: string
  title: string
}

export interface CategoryState {
  List: Record<string, any>
}

export interface ItemState {
  List: Record<string, any>
}

export interface HeroState {
  List: Record<string, any>
}

export interface ArticleState {
  List: Record<string, any>
}


