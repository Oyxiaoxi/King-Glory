import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import pinia from './store'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'easymde/dist/easymde.min.css'

const app = createApp(App)

// ElementPlusIconsVue
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
