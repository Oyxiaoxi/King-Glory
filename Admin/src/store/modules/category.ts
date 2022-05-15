import { defineStore } from 'pinia'
import type { CategoryState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const Category = defineStore({
  id: 'category',
  state: (): CategoryState => ({
    List: {},
  }),
  getters: {
    getCategoryObj: state => () => {
      return state.List
    },
  },
  actions: {
    async setCategory(listData: any) {
      this.List = listData
    },
    async deleteCategory(id: string) {
      await delete this.List[id]
    },
  },
  persist: piniaPersistConfig('CategoryState'),
})
