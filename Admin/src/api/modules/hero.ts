import { SERVICE_PORT } from '../config/servicePort'
import type { Hero } from '../interface'
import http from '~/api'

// * 获取英雄列表
export const fetchHero = () => {
  return http.get<Hero.ResHeroes>(`${SERVICE_PORT}rest/heroes/`)
}

// * 创建英雄
export const createHero = async (params: { id: string; name: string }) => {
  return await http.post<Hero.ResHeroes>(`${SERVICE_PORT}rest/heroes/`, params)
}

// * 通过 id 获取英雄
export const fetchByIdHero = async (params: { id: string }) => {
  return await http.get<Hero.ResHeroes>(`${SERVICE_PORT}rest/heroes/${params}`)
}

// * 编辑英雄
export const editHero = async (params: { id: string; name: string }) => {
  return await http.put<Hero.ResHeroes>(`${SERVICE_PORT}rest/heroes/${params.id}`, params)
}

// * 删除英雄列表
export const deleteHero = async (params: { id: string }) => {
  return await http.delete<Hero.ResHeroes[]>(`${SERVICE_PORT}rest/heroes/${params.id}`, params)
}
