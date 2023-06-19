import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import adminHome from '@/views/adminHome.vue'
import userHome from '@/views/userHome.vue'
import authorityAdmin from '@/views/adminHome/authorityAdmin.vue'
import userAdmin from '@/views/adminHome/userAdmin.vue'
import cityAdmin from '@/views/adminHome/cityAdmin.vue'
import estate from '@/views/adminHome/estate.vue'
import house from '@/views/adminHome/house.vue'
import firstpage from '@/views/adminHome/firstpage.vue'
import build from '@/views/adminHome/build.vue'
import park from '@/views/adminHome/park'
import firstHome from '@/views/userHome/firstHome.vue'
import userHouse from '@/views/userHome/userHouse.vue'
import userInfo from '@/views/userHome/userInfo.vue'
import userPark from '@/views/userHome/userPark.vue'
import houseShow from '@/views/userHome/houseShow'
import parkShow from '@/views/userHome/parkShow'
import userHouseadmin from '@/views/adminHome/userHouse'
Vue.use(VueRouter)


const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/adminHome", component: adminHome, children: [
      { path: "/", redirect: "firstpage" },
      { path: "firstpage", component: firstpage },
      { path: "build", component: build },
      { path: "authorityAdmin", component: authorityAdmin },
      { path: "userAdmin", component: userAdmin },
      { path: "cityAdmin", component: cityAdmin },
      { path: "estate", component: estate },
      { path: "house", component: house },
      { path: "park", component: park },
      { path: "userHouse", component: userHouseadmin }
    ]
  },
  {
    path: "/userHome", component: userHome, children: [
      { path: "/", redirect: "firstHome" },
      { path: "firstHome", component: firstHome },
      { path: "userInfo", component: userInfo },
      { path: "userHouse", component: userHouse },
      { path: "userPark", component: userPark },
      { path: "houseShow", component: houseShow },
      { path: "parkShow", component: parkShow }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach(function (to, from, next) {
  const arr = ['/adminHome', '/userHome']
  if (arr.indexOf(to.path) != -1) {
    // 如果访问的是home主页,则拦截,否则放行
    // if (to.path === '/home') {
    // 判断token是否为空 若为空，则强制跳转到登录页面 不为空则放行
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 放行
    next()
  }
})

export default router
