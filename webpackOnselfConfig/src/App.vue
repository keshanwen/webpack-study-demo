<template>
  <div>
    <h1 class="app-home">{{ num }}</h1>
    <button @click="add">增加</button>
    <div>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <TextPage/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TextPage from '@/components/textPage.vue'

let name = ref<string>('kebi')
let num = ref(0)

const add = () => {
  ++num.value
}

</script>

<style lang="scss" scoped>
.app-home {
  color: darkorange;
}
</style>
