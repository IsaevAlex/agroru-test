import Vue from 'vue'
import VueRouter from 'vue-router'
import loginPage from '@/views/loginPage'
import userPage from '@/views/userPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'loginPage',
        component: loginPage
    },
    {
        path: '/user',
        name: 'userPage',
        component: userPage
    }
]

const router = new VueRouter({
  routes
})

export default router
