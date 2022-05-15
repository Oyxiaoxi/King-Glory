// Request response parameters (without data)
export interface Result {
  code: string
  msg: string
}

// Request response parameters (including data)
export interface ResultData<T = any> extends Result {
  data?: T
}

// * Category
export namespace Category {
  export type ResCategories = Record<string, any>
}
