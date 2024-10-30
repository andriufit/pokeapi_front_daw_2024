<template>
    <div class="pokemons-container">    
      <pokemonBoxComponent v-for="(pokemon, key) in pokemonList" :id="key + 1" :name="pokemon?.name" :number="key + 1" :img="pokemon?.img" ></pokemonBoxComponent>
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import pokemonBoxComponent from './../components/pokemonBoxComponent.vue';

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