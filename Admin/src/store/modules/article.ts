import { defineStore } from 'pinia'
import type { ArticleState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const Article = defineStore({
  id: 'article',
  // 定义状态
  state: (): ArticleState => ({
    List: {},
  }),
  // 接收外部数据
  getters: {
    fetchArticle(state) {
      return state.List
    },
  },
  // 相当于 Mehtod, 定义业务逻辑
  actions: {
    async setArticle(rawData: any) {
      this.List = rawData
    },
    async deleteArticle(id: string) {
      this.List = this.List.filter((item: { id: string }) => item.id !== id)
    },
  },
  persist: piniaPersistConfig('ArticleState'),
})
