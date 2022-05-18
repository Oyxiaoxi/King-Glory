import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/index.vue'),
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "categories-create" */ '../pages/categories/[create].vue'),
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "categories-edit" */ '../pages/categories/[create].vue'),
        props: true,
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "categories-list" */ '../pages/categories/[list].vue'),
      },
      {
        path: '/items/create',
        component: () => import(/* webpackChunkName: "items-create" */ '../pages/items/[create].vue'),
      },
      {
        path: '/items/edit/:id',
        component: () => import(/* webpackChunkName: "items-edit" */ '../pages/items/[create].vue'),
        props: true,
      },
      {
        path: '/items/list',
        component: () => import(/* webpackChunkName: "items-list" */ '../pages/items/[list].vue'),
      },
      {
        path: '/heroes/create',
        component: () => import(/* webpackChunkName: "heroes-create" */ '../pages/heroes/[create].vue'),
      },
      {
        path: '/heroes/edit/:id',
        component: () => import(/* webpackChunkName: "heroes-edit" */ '../pages/heroes/[create].vue'),
        props: true,
      },
      {
        path: '/heroes/list',
        component: () => import(/* webpackChunkName: "heroes-list" */ '../pages/heroes/[list].vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
