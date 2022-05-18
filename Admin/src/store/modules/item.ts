import { defineStore } from 'pinia'
import type { ItemState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const Item = defineStore({
  id: 'item',
  // 定义状态
  state: (): ItemState => ({
    List: {},
  }),
  // 接收外部数据
  getters: {
    fetchItem(state) {
      return state.List
    },
  },
  // 相当于 Mehtod, 定义业务逻辑
  actions: {
    async setItem(rawData: any) {
      this.List = rawData
    },
    async deleteItem(id: string) {
      this.List = this.List.filter((item: { id: string }) => item.id !== id)
    },
  },
  persist: piniaPersistConfig('ItemState'),
})
