import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/use-auth'
import { tabs } from '@/constant/dashboardTabs'

export const routers = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  NOTFOUND: 'notFound',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/dashboard',
      name: routers.DASHBOARD,
      component: () => import('@/views/dashboard/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: tabs.map((tab) => ({
        path: tab.key,
        name: tab.key,
        component: () =>
          import(`@/views/dashboard/${tab.label}/${tab.label}.vue`),
      })),
    },
    {
      path: '/login',
      name: routers.LOGIN,
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: routers.NOTFOUND,
      component: () => import('@/components/NotFound/index.vue'),
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'dashboard' && auth.isAuthenticated) {
    next({ name: 'overview' })
  } else {
    next()
  }
})

export default router
