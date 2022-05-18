import { defineStore } from 'pinia'
import type { CategoryState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const Category = defineStore({
  id: 'category',
  // 定义状态
  state: (): CategoryState => ({
    List: {},
  }),
  // 接收外部数据
  getters: {
    fetchCategory(state) {
      return state.List
    },
  },
  // 相当于 Mehtod, 定义业务逻辑
  actions: {
    async setCategory(rawData: any) {
      this.List = rawData
    },
    async deleteCategory(id: string) {
      this.List = this.List.filter((item: { id: string }) => item.id !== id)
    },
  },
  persist: piniaPersistConfig('CategoryState'),
})
