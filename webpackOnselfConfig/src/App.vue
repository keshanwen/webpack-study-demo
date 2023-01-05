<template>
  <h1 class="app-home">{{ name }}</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let name = ref<string>('kebi')

name.value = 'hello kebi'

</script>

<style lang="scss" scoped>
.app-home {
   color: aquamarine;
}
</style>
