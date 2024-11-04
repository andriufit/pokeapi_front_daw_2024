import { createRouter, createWebHistory } from 'vue-router'
import PruebaPage from './pages/PruebaPage.vue';
import HomePage from './pages/HomePage.vue';
import SinglePokemonPage from './pages/SinglePokemonPage.vue';

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
            path: 'pokemon/:id',
            name: "singlePokemonPage",
            component: SinglePokemonPage
          }
        ]
      }
    ]
  })
  
  export default router