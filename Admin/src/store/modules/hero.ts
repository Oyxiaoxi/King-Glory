import { defineStore } from 'pinia'
import type { HeroState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const Hero = defineStore({
  id: 'hero',
  // 定义状态
  state: (): HeroState => ({
    List: {},
  }),
  // 接收外部数据
  getters: {
    fetchHero(state) {
      return state.List
    },
  },
  // 相当于 Mehtod, 定义业务逻辑
  actions: {
    async setHero(rawData: any) {
      this.List = rawData
    },
    async deleteHero(id: string) {
      this.List = this.List.filter((item: { id: string }) => item.id !== id)
    },
  },
  persist: piniaPersistConfig('HeroState'),
})
