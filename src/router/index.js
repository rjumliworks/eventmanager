import { createRouter, createWebHistory } from 'vue-router'
import store from '@/state/store'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/account/login.vue'),
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/account/register.vue'),
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        name: "dashboard",
        component: () => import('@/views/home.vue'),
        meta: {
            middleware: "auth",
            title: `Dashboard`
        }
    },
    {
        path: "/exhibitors",
        name: "exhibitors",
        component: () => import('@/views/modules/exhibitors/index.vue'),
        meta: {
            middleware: "auth",
            title: `Exhibitors`
        }
    },
    {
        path: "/exhibitor/:id",
        name: "exhibitor/view",
        component: () => import('@/views/modules/exhibitors/view.vue'),
        meta: {
            middleware: "auth",
            title: `Exhibitor View`
        }
    },
    {
        path: "/sessions",
        name: "sessions",
        component: () => import('@/views/modules/sessions/index.vue'),
        meta: {
            middleware: "auth",
            title: `Sessions`
        }
    },
    {
        path: "/session/:id",
        name: "session/view",
        component: () => import('@/views/modules/sessions/view.vue'),
        meta: {
            middleware: "auth",
            title: `Session View`
        }
    },
    {
        path: "/qrcode",
        name: "qrcode",
        component: () => import('@/views/modules/qrcode/index.vue'),
        meta: {
            middleware: "auth",
            title: `Qr Profile`
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import('@/views/modules/profiles/index.vue'),
        meta: {
            middleware: "auth",
            title: `Profile`
        }
    },
    {
        path: "/information",
        name: "information",
        component: () => import('@/views/modules/profiles/information.vue'),
        meta: {
            middleware: "auth",
            title: `Information`
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
    linkExactActiveClass: "text-info",
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
          next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})


export default router