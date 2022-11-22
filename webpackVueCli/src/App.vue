<template>
  <div class="menu">
    <div
      class="menu-item"
      @click="changeMenu('home')"
    >
      Home
    </div>
    <div
      class="menu-item"
      @click="changeMenu('about')"
    >
      About
    </div>
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function changeMenu(menu: 'home' | 'about') {
    if (menu === 'home') {
        router.push('/')
    } else {
        router.push('/about')
    }
}

</script>
<style lang="scss" scoped>
.menu {
    height: 60px;
    border-bottom: 1px solid #666;
    display: flex;
    align-items: center;
    &-item {
        font-size: 16px;
        width: 100px;
        border: 1px solid black;
        color: green;
        text-align: center;
        border-radius: 4px;
        margin-right: 6px;
        cursor: pointer;
    }
}
</style>