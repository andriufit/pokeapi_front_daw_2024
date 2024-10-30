<template>
    <div class="pokemon-box-item">
        <div class="pokemon-box-img-container">
            <img :src="img">
        </div>

        <span>{{ number + " " + name }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        img: String,
        name: String,
        number: Number
    });
</script>