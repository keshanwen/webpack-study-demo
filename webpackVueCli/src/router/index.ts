import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
       { path: '/', component: Home },
       { path: '/about', component: import('@/pages/about/index.vue') },
    ]
})

export default router