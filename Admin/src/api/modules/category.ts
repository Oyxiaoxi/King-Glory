/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/quotes */
import type { Category } from '../interface'
import { SERVICE_PORT } from '../config/servicePort'
import http from '~/api'

// * 获取分类列表
export const fetchCategory = () => {
  return http.get<Category.ResCategories>(`${SERVICE_PORT}/categorise`)
}

// * 创建分类
export const createCategory = async (params: { id: string; name: string }) => {
  return await http.post<Category.ResCategories>(`${SERVICE_PORT}/categorise/`, params)
}

// * 通过 id 获取分类
export const fetchByIdCategory = async (params: { id: string }) => {
  return await http.get<Category.ResCategories>(`${SERVICE_PORT}/categorise/` + params)
}

// * 编辑分类
export const editCategory = async (params: { id: string; name: string }) => {
  return await http.put<Category.ResCategories>(`${SERVICE_PORT}/categorise/` + params.id, params)
}

// * 删除分类列表
export const deleteCategory = async (params: { id: string }) => {
  return await http.delete<Category.ResCategories[]>(`${SERVICE_PORT}/categorise/` + params.id, params)
}
