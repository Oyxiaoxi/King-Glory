import { SERVICE_PORT } from '../config/servicePort'
import type { Item } from '../interface'
import http from '~/api'

// * 获取物品列表
export const fetchItem = () => {
  return http.get<Item.ResItems>(`${SERVICE_PORT}rest/items/`)
}

// * 创建物品
export const createItem = async (params: { id: string; name: string }) => {
  return await http.post<Item.ResItems>(`${SERVICE_PORT}rest/items/`, params)
}

// * 通过 id 获取物品
export const fetchByIdItem = async (params: { id: string }) => {
  return await http.get<Item.ResItems>(`${SERVICE_PORT}rest/items/${params}`)
}

// * 编辑物品
export const editItem = async (params: { id: string; name: string }) => {
  return await http.put<Item.ResItems>(`${SERVICE_PORT}rest/items/${params.id}`, params)
}

// * 删除物品列表
export const deleteItem = async (params: { id: string }) => {
  return await http.delete<Item.ResItems[]>(`${SERVICE_PORT}rest/items/${params.id}`, params)
}
