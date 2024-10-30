import { createRouter, createWebHistory } from 'vue-router'
import PruebaPage from './pages/PruebaPage.vue';
import HomePage from './pages/HomePage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        children: [
          {
            path: '',
            component: HomePage
          },
          {
            path: 'prueba',
            name: "prueba",
            component: PruebaPage

          }
        ]
      }
    ]
  })
  
  export default router