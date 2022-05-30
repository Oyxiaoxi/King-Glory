/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/quotes */
import type { Article } from '../interface'
import { SERVICE_PORT } from '../config/servicePort'
import http from '~/api'

// * 获取文章列表
export const fetchArticle = () => {
  return http.get<Article.ResArticles>(`${SERVICE_PORT}rest/articles/`)
}

// * 创建文章
export const createArticle = async (params: { id: string; name: string }) => {
  return await http.post<Article.ResArticles>(`${SERVICE_PORT}rest/articles/`, params)
}

// * 通过 id 获取文章
export const fetchByIdArticle = async (params: { id: string }) => {
  return await http.get<Article.ResArticles>(`${SERVICE_PORT}rest/articles/` + params)
}

// * 编辑文章
export const editArticle = async (params: { id: string; name: string }) => {
  return await http.put<Article.ResArticles>(`${SERVICE_PORT}rest/articles/` + params.id, params)
}

// * 删除文章列表
export const deleteArticle = async (params: { id: string }) => {
  return await http.delete<Article.ResArticles[]>(`${SERVICE_PORT}rest/articles/` + params.id, params)
}
