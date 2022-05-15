import { createPinia, defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import type { GlobalState } from './interface'
import piniaPersistConfig from '~/config/piniaPersist'

const pinia = createPinia()

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: (): GlobalState => ({
    token: '',
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
  persist: piniaPersistConfig('GlobalState'),
})

// Durability
pinia.use(piniaPersist)

export default pinia
