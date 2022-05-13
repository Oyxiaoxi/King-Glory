import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import axios from 'axios'

// import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/dist/index.css'

axios.defaults.baseURL = 'http://localhost:3000/admin/api'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './pages/index.vue'),
      children: [
        {
          path: '/category/create',
          component: () => import(/* webpackChunkName: "category-create" */ './pages/category/[create].vue'),
        },
        {
          path: '/category/list',
          component: () => import(/* webpackChunkName: "category-create" */ './pages/category/[list].vue'),
        },
      ],
    },
  ],
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')
