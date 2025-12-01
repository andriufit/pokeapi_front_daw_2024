import { createRouter, createWebHistory } from './shim';
import HomeView from '../views/HomeView.vue';
import PokemonDetail from '../views/PokemonDetail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-detail',
    component: PokemonDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
