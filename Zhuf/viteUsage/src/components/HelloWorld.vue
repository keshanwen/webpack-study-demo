<template>
  <h1>{{ msg }}</h1>
  <a> 超链接 </a>
  <div :class="style.link">
    你好世界
  </div>
  <h2>less</h2>
  <div class="postcss">
    你好 postcss
  </div>
  <button @click="handleClick">
    {{ state.count }}
  </button>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import style from './HelloWorld.module.css';

defineProps({
  msg: {
    type: String,
    default: ''
  }
});
interface State {
  count: number;
}
const state = reactive<State>({ count: 0 });
const handleClick = () => {
  console.log(state.count);
  state.count++;
};
</script>

<style scoped>
a {
  color: red;
}

.postcss {
  height: 50px;
  width: 200px;
  background-color: orange;
  transform: rotate(90deg);
}
</style>
<style lang="less" scoped>
@color: blue;

h2 {
  color: @color;
}
</style>
