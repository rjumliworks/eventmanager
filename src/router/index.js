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
        path: "/hotels",
        name: "hotels",
        component: () => import('@/views/modules/hotels/index.vue'),
        meta: {
            middleware: "auth",
            title: `Hotels`
        }
    },
    {
        path: "/hotel/:id",
        name: "hotel/view",
        component: () => import('@/views/modules/hotels/view.vue'),
        meta: {
            middleware: "auth",
            title: `Hotel View`
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
        path: "/security",
        name: "security",
        component: () => import('@/views/modules/profiles/security.vue'),
        meta: {
            middleware: "auth",
            title: `Security`
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
    document.title = to.meta.title || 'App';

    const isAuth = store.state.auth.authenticated;
    const user   = store.state.auth.user?.data || {};
    const isCompleted = user.is_completed == 1;

    // 1️⃣ Allow unauthenticated pages (guest)
    if (to.meta.middleware === "guest") {
        if (isAuth) {
            // ✅ Authenticated guests
            if (!isCompleted && to.name !== "security") {
                // force profile if incomplete
                return next({ name: "security" });
            }
            return next({ name: "dashboard" });
        }
        return next();
    }

    // 2️⃣ Protected routes (need auth)
    if (!isAuth) {
        return next({ name: "login" });
    }

    // 3️⃣ Check profile completion for ALL authenticated routes
    //    Allow profile & logout pages to prevent redirect loop
    const allowList = ["security", "logout"];
    if (!isCompleted && !allowList.includes(to.name)) {
        return next({ name: "security" });
    }

    next();
});

console.log(store.state.auth);

export default router