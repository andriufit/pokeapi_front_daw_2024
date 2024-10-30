import { createRouter, createWebHistory } from 'vue-router'
import AppPage from './App.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: AppPage
      }
    ]
  })
  
  export default router