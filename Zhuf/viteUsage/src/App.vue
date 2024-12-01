<template>
  <img src="@/assets/img.png" />
  <HelloWorld msg="Vue3 + Vite" />
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'

fetch('/api/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))


</script>