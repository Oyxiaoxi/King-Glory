/* eslint-disable @typescript-eslint/quotes */
import type { Category } from '../interface'
import { SERVICE_PORT } from '../config/servicePort'
import http from '~/api'

// * 获取分类列表
export const fetchCategory = () => {
  return http.get<Category.ResCategories>(`${SERVICE_PORT}/categorise`)
}

// // * 更新分类列表
// export const updateCategory = (params: { id: string }) => {
//   return http.put<Category.ResCategories>(`${SERVICE_PORT}/categorise/`, params)
// }

// * 删除分类列表
export const deleteCategory = (params: { id: string[] }) => {
  return http.post(`${SERVICE_PORT}/categorise/`, params)
}
