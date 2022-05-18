// GlobalStore
export interface GlobalState {
  token: string
  userInfo?: any
}

export interface CategoryProps {
  _id: string
  name: string
}

export interface CategoryState {
  List: Record<string, any>
}

export interface ItemState {
  List: Record<string, any>
}

export interface ItemProps {
  _id: string
  name: string
  icon: string
}
