
<template>
  <header>

    <div class="title-container">
      <img src="/img/title.png">
    </div>
  </header>

  <main>
    <div class="pokemons-container">
      <!--<pokemonBoxComponent v-for="(pokemon, key) in pokemonList" :name="pokemon?.name" :number="key + 1" :img="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + (key + 1) + '.png'" ></pokemonBoxComponent>-->
    
      <pokemonBoxComponent v-for="(pokemon, key) in pokemonList" :name="pokemon?.name" :number="key + 1" :img="pokemon?.img" ></pokemonBoxComponent>
    </div>
  </main>
</template>

<script setup>


import { ref } from 'vue';
  import pokemonBoxComponent from './components/pokemonBoxComponent.vue';

  const pokemonList = ref({});

  fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
  .then(response => response.json())
  .then((data) => {
    pokemonList.value = data.results;

    Object.entries(pokemonList.value).forEach( async (element, key) => {
      fetch(pokemonList.value[key].url)
      .then(response => response.json())
      .then((data) => {
        pokemonList.value[key].img = data.sprites.front_default;
      });
    });

    pokemonList.value = data.results;
  });

</script>

<style >
  @import "./assets/styles.scss";
</style>
