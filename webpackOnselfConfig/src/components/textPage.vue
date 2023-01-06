<template>
  <div>
    i am test.vue
    <h1 class="text-page">test.vue{{ num }}</h1>
    <button @click="add">增加</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let num = ref(0)

const add = () => {
  ++num.value
}

</script>

<style lang="scss" scoped>
.text-page {
  color: darkorange;
}
</style>
