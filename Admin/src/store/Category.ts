import { defineStore } from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('Category', {
  state: () => {
    return {
      message: 'Category List Data',
      List: [],
      Parent: [],
    }
  },
  getters: {
    getListData(state) {
      return state.List
    },
    getParentData(state) {
      return state.Parent
    },
  },
  actions: {
    async fetchListData() {
      await axios.get('/categorise').then((result) => {
        this.List = result.data
      })
    },
    async fetchParents() {
      await axios.get('/categorise').then((result) => {
        this.Parent = result.data
      })
    },
  },
})
