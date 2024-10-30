<template>

    <router-link to='/'>
        <button>Atras</button>
    </router-link>


    hola {{ id }}
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router'

    let route = useRoute(); 
    let id = ref(route.params.id);


</script>