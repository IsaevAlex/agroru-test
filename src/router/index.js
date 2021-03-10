import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import loginPage from '@/views/pages/loginPage'
import userPage from '@/views/pages/userPage'
import userEditPage from '@/views/pages/userEditPage'
import notFoundPage from "@/views/pages/notFoundPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'loginPage',
        component: loginPage,
        meta: {
            layout: 'main-layout',
            guest: true
        }
    },
    {
        path: '/user',
        name: 'userPage',
        component: userPage,
        meta:{
            layout: 'main-layout',
            requiresAuth: true
        }
    },
    {
        path: '/user/edit',
        name: 'userEditPage',
        component: userEditPage,
        meta:{
            layout: 'main-layout',
            requiresAuth: true
        }
    },
    {
        path: '*',
        name: 'notFoundPage',
        component: notFoundPage,
        meta: {
            layout: 'error-layout'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.GET_USER) {
            next();
            return;
        }
        next("/");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.GET_USER) {
            next("/user");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router
