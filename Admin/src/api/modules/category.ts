/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/quotes */
import type { Category } from '../interface'
import { SERVICE_PORT } from '../config/servicePort'
import http from '~/api'

// * 创建分类
export const createCategory = (params: { id: string; name: string }) => {
  return http.post<Category.ResCategories>(`${SERVICE_PORT}/categorise/`, params)
}

// * 获取分类列表
export const fetchCategory = () => {
  return http.get<Category.ResCategories>(`${SERVICE_PORT}/categorise`)
}

// * 删除分类列表
export const deleteCategory = async (params: { id: string }) => {
  return await http.delete<Category.ResCategories[]>(`${SERVICE_PORT}/categorise/` + params, params)
}
