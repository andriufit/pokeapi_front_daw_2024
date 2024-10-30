<template>
    <div class="pokemon-box-item">
        <!-- <router-link :to="{name: 'singlePokemonPage', params:{ id : id }}"> -->
        <router-link :to="{name: 'singlePokemonPage', params:{ id: number }}">
            <div class="pokemon-box-img-container">
                <img :src="img">
            </div>
            <span>{{ number + " " + name }}</span>
        </router-link>
    </div>
</template>

<script setup>
    const props = defineProps({
        img: String,
        name: String,
        number: Number,
    });
</script>