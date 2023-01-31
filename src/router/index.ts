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
    path: "/userHome",
    name: "userHome",
    component: () =>
      import("@/views/user/userHome.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 进度条
  Nprogress.start()
  if (to.name !== 'login') {
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
