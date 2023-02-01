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
    name: "login",
    component: import("@/views/Home.vue"),
  },
  {
    path: "/registerUser",
    name: "registerUser",
    component: () => import('@/views/partUser/registerUser.vue'),
  },
  {
    path: "/userHome",
    name: "userHome",
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
  if (to.name !== 'login' && to.name !== 'registerUser') {
    let token = getCookie('token')
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
