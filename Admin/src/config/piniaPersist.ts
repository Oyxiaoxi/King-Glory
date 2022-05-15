import type { PersistOptions } from 'pinia-plugin-persist'

// Pinia Persistent parameter configuration
const piniaPersistConfig = (key: string) => {
  const persist: PersistOptions = {
    enabled: true,
    strategies: [
      {
        key,
        storage: localStorage,
      },
    ],
  }
  return persist
}

export default piniaPersistConfig
