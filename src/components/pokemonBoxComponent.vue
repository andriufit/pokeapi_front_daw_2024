<template>
  <RouterLink class="pokemon-box-item" :to="to">
    <div class="pokemon-box-img-container">
      <img :src="img" :alt="`Imagen de ${name}`" />
    </div>

    <span>{{ number + " " + name }}</span>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  img: String,
  name: String,
  number: [Number, String],
  to: {
    type: String,
    required: true
  }
});
</script>
