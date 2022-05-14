import { defineStore } from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('List', {
  state: () => {
    return {
      message: 'Get Category List Data',
      List: [],
    }
  },
  getters: {
    getListData(state) {
      return state.List
    },
  },
  actions: {
    async fetchListData() {
      await axios.get('/categorise').then((result) => {
        this.List = result.data
      })
    },
  },
})
