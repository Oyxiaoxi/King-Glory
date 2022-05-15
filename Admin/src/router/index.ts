import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/index.vue'),
    children: [
      {
        path: '/category/create',
        component: () => import(/* webpackChunkName: "category-create" */ '../pages/category/[create].vue'),
      },
      {
        path: '/category/edit/:id',
        name: 'CategoryEdit',
        component: () => import(/* webpackChunkName: "category-create" */ '../pages/category/[create].vue'),
        props: true,
      },
      {
        path: '/category/list',
        component: () => import(/* webpackChunkName: "category-create" */ '../pages/category/[list].vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
