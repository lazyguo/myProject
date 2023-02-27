import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { getCookie } from '@/utils/util.cookie'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { loginStore } from '@/storePinia/index'
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
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
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
    children: [
      {
        path: 'userCenter',
        name: 'UserCenter',
        component: () => import('@/views/partUser/components/userCenter.vue')
      },
      {
        path: 'routerCenter',
        name: 'RouterCenter',
        component: () => import('@/views/partUser/components/routerCenter.vue')
      }
    ]
  },
  {
    path: "/personalConter",
    name: "PersonalConter",
    component: () => import('@/views/partUser/personalConter.vue'),
  },
  {
    path: "/bigVisu",
    name: "bigVisu",
    component: () => import('@/views/visu/index.vue'),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function routerCom(path: any) { //对路由的component解析
  return () => import(`@/views${path}`);
}
function routerChildren(children: any) { //对子路由的component解析
  children.forEach((v: any) => {
    v.component = routerCom(v.component);
    if (v.children != undefined) {
      v.children = routerChildren(v.children)
    }
  })
  return children
}
let isToken = true

router.beforeEach((to, from, next) => {
  // const store = loginStore()
  // //定义isToken为true和vuex不为空时添加路由
  // if (isToken && store.routeList.length != 0) {
  //   //从vuex中获取动态路由
  //   const accessRouteses = JSON.parse(JSON.stringify(store.routeList))
  //   //动态路由循环解析和添加
  //   accessRouteses.forEach((v: any) => {
  //     v.children = routerChildren(v.children);
  //     v.component = routerCom(v.component);
  //     routes.push(v)
  //     console.log('staticRoute',routes)
  //   })
  //   isToken = false //将isToken赋为 false ，否则会一直循环，崩溃
  //   next({
  //     ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
  //     replace: true, // 重进一次, 不保留重复历史
  //   })
  // }
  // console.log('store.routeList', store.routeList)
  // 进度条
  console.log('to', to)
  console.log('to.name', to.name)
  Nprogress.start()
  let token = getCookie('token')
  if (to.name == undefined) {
    next('/404')
    Nprogress.done()
  } else if (to.name !== 'Login' && to.name !== 'RegisterUser') {
    if (to.name == '404') {
      next()
    } else if (token) {
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
