<template>
  <h1>{{ msg }}</h1>
  <a :class="style.link2">超链接</a>
  <h2>less</h2>
  <h3>sass</h3>
  <div class="postcss"></div>
  <button @click="handleClick">{{ state.count }}</button>
</template>
<script setup lang="ts">
import style from "./HelloWorld.module.css";
import { reactive, defineProps } from "vue";
defineProps({
  msg: {
    type: String,
    default: "默认消息",
  },
});

interface State {
  count: number;
}
let state = reactive<State>({ count: 0 });
const handleClick = () => {
  console.log(state.count);
  state.count++;
};
</script>
<style scoped lang="less">
@color: red;
h2 {
  color: @color;
}
</style>
<style scoped lang="scss">
$color: orange;
h3 {
  color: $color;
}
</style>
<style scoped>
.postcss {
  height: 50px;
  width: 200px;
  background-color: orange;
  transform: rotate(90deg);
}
</style>
