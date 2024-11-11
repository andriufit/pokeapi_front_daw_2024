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
    <div class="pokemon-line">
        <template v-for="pokemonData in chainEvolution">
            <pokemonBoxComponent :img="pokemonData.img" :name="pokemonData.name" :number="pokemonData.id"></pokemonBoxComponent>
        </template>
    </div>
    
</template>

<script setup>
    import pokemonBoxComponent from '@/components/pokemonBoxComponent.vue';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'

    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let chainEvolution = ref({});
    let route = useRoute(); 
    let id = ref(route.params.id);

    let pokemonData = ref({});

    let getIdFromUrl = (url) => {
        let elements = url.split("/");

        return elements[elements.length - 2];
    };


    let getPokemonLine = (pokemonData) => {

        let pokemonLine = [];

        pokemonLine.push(pokemonData.species);

        if(pokemonData.evolves_to != []){
            for(let i = 0 ; i < pokemonData.evolves_to.length ; i++){
                pokemonLine.push(...getPokemonLine(pokemonData.evolves_to[i]));
            }
        }

        return pokemonLine;
    }


    onMounted(async () => {
        let data = await fetch(pokemonUrl + route.params.id);
        data = await data.json();

        //let speciesData = await fetch(data.species.url);
        // speciesData = await speciesData.json();

    

        fetch(data.species.url).then(data => data.json())
        .then((data) => {
            console.log(data.evolution_chain.url);

            fetch(data.evolution_chain.url).then(data => data.json())
            .then((data) => {
                
                chainEvolution.value = getPokemonLine(data.chain);

                chainEvolution.value.forEach((value, key) => {
                    let id =  getIdFromUrl(value.url);

                    fetch(pokemonUrl + id)
                    .then(data => data.json())
                    .then((data) => {
                        chainEvolution.value[key].img = data.sprites.front_default;
                        chainEvolution.value[key].id = id;
                    });
                });
            });
        });

        delete data.sprites.other;
        delete data.sprites.versions;

        pokemonData.value = data;

        pokemonData.value.moves.forEach(async(element, keyMove) => {
            
            //data = await fetch(element.move.url);
            let data = await fetch(element.move.url);
            
            data = await data.json();

            pokemonData.value.moves[keyMove].data = data;
        });

        


        /* cambiar por awaits */
    });


</script>