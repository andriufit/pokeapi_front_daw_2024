<template>
  <main>
    <div v-if="isLoading" class="loading-state">Cargando pokémon...</div>
    <div v-else-if="errorMessage" class="error-state">{{ errorMessage }}</div>
    <div v-else class="pokemons-container">
      <pokemon-box-component
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        :name="pokemon.name"
        :number="pokemon.id"
        :img="pokemon.img"
        :to="`/pokemon/${pokemon.id}`"
      />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import pokemonBoxComponent from '../components/pokemonBoxComponent.vue';

const pokemonList = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const extractIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

const fetchPokemons = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
    const data = await response.json();

    const enriched = await Promise.all(
      data.results.map(async (item) => {
        const id = extractIdFromUrl(item.url);
        const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detail = await detailResponse.json();
        return {
          id,
          name: item.name,
          img: detail.sprites.front_default
        };
      })
    );

    pokemonList.value = enriched;
  } catch (error) {
    errorMessage.value = 'No se pudieron cargar los pokémon. Inténtalo de nuevo más tarde.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPokemons();
});
</script>
