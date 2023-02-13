import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { getCookie } from '@/utils/util.cookie'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue'),
  },
  {
    path: "/registerUser",
    name: "RegisterUser",
    component: () => import('@/views/partUser/registerUser.vue'),
  },
  {
    path: "/core",
    name: "Core",
    component: () => import('@/views/Core.vue')
  },
  {
    path: "/userHome",
    name: "UserHome",
    component: () => import('@/views/partUser/userHome.vue'),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 进度条
  Nprogress.start()
  let token = getCookie('token')
  if (to.name !== 'Login' && to.name !== 'RegisterUser') {
    if (token) {
      next()
      Nprogress.done()
    } else {
      next('/login')
      Nprogress.done()
    }
  } else {
    next()
    Nprogress.done()
  }
})

export default router;
