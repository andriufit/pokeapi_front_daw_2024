<template>

    <router-link to='/'>
        <button>Atras</button>
    </router-link>

    <div class="pokemon-gallery">
        <img v-for="(src, key) in pokemonData.sprites" :src="src">
    </div>
    <div class="pokemon-moves">
        <div class="move-item" v-for="move in pokemonData.moves">
            <template v-if="typeof move.data != 'undefined'">
                {{ move?.data.name + " " + move?.data.power + " " + move?.data.pp + " " }}
            </template>
        </div>
    </div>
    
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'

    let route = useRoute(); 
    let id = ref(route.params.id);

    let pokemonData = ref({});

    onMounted(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + route.params.id)
        .then((data) => data.json())
        .then((data) => {

            delete data.sprites.other;
            delete data.sprites.versions;

            pokemonData.value = data;

            pokemonData.value.moves.forEach((element, keyMove) => {
                fetch(element.move.url)
                .then(data => data.json())
                .then((movesData) => {
                    pokemonData.value.moves[keyMove].data = movesData;
                });
            });

        });
    });


</script>