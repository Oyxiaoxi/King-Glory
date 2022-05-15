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
