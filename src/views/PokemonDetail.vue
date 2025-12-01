<template>
  <main class="pokemon-detail" v-if="pokemon">
    <button class="back-button" @click="goBack">Volver</button>
    <div class="detail-header">
      <h1>{{ capitalizedName }}</h1>
      <span class="identifier">#{{ pokemon.id }}</span>
    </div>

    <section class="sprites">
      <img :src="pokemon.sprites.front_default" alt="Sprite frontal" />
      <img :src="pokemon.sprites.back_default" alt="Sprite trasero" v-if="pokemon.sprites.back_default" />
      <img
        :src="pokemon.sprites.other['official-artwork'].front_default"
        alt="Arte oficial"
        v-if="pokemon.sprites.other?.['official-artwork']?.front_default"
      />
    </section>

    <section class="description" v-if="description">
      <h2>Descripción</h2>
      <p>{{ description }}</p>
    </section>

    <section class="detail-grid">
      <div class="detail-card">
        <h3>Tipos</h3>
        <ul>
          <li v-for="type in pokemon.types" :key="type.slot">{{ type.type.name }}</li>
        </ul>
      </div>

      <div class="detail-card">
        <h3>Habilidades</h3>
        <ul>
          <li v-for="ability in pokemon.abilities" :key="ability.ability.name">{{ ability.ability.name }}</li>
        </ul>
      </div>

      <div class="detail-card">
        <h3>Estadísticas base</h3>
        <ul>
          <li v-for="stat in pokemon.stats" :key="stat.stat.name">
            {{ stat.stat.name }}: {{ stat.base_stat }}
          </li>
        </ul>
      </div>

      <div class="detail-card">
        <h3>Movimientos destacados</h3>
        <ul>
          <li v-for="move in displayedMoves" :key="move.move.name">{{ move.move.name }}</li>
        </ul>
      </div>
    </section>
  </main>
  <div v-else class="loading-state">Cargando información del pokémon...</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from '../router/shim';

const route = useRoute();
const router = useRouter();

const pokemon = ref(null);
const species = ref(null);
const description = computed(() => {
  const entries = species.value?.flavor_text_entries || [];
  const spanish = entries.find((entry) => entry.language.name === 'es');
  const english = entries.find((entry) => entry.language.name === 'en');
  const text = spanish?.flavor_text || english?.flavor_text || '';
  return text.replace(/\s+/g, ' ').replace(/\f/g, ' ').trim();
});

const capitalizedName = computed(() => {
  if (!pokemon.value) return '';
  return pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1);
});

const displayedMoves = computed(() => {
  if (!pokemon.value) return [];
  return pokemon.value.moves.slice(0, 6);
});

const fetchPokemon = async (id) => {
  pokemon.value = null;
  species.value = null;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pokemon.value = data;
    const speciesResponse = await fetch(data.species.url);
    species.value = await speciesResponse.json();
  } catch (error) {
    console.error('Error al cargar el pokémon', error);
  }
};

const goBack = () => {
  router.push('/');
};

onMounted(() => {
  fetchPokemon(route.value.params.id);
});

watch(
  () => route.value.params.id,
  (newId) => {
    if (newId) {
      fetchPokemon(newId);
    }
  }
);
</script>
