import Vue from "vue";
import VueRouter from "vue-router";
import PageLogin from "@/views/PageLogin";
import PageTodo from "@/views/PageTodo";
import {getItem} from "@/helper/storage";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "feed",
    redirect: "/login"
  },
  {
     path: "/login",
     name: "login",
     component: PageLogin
  },
  {
    path: "/todo",
    name: "todo",
    component: PageTodo,
    meta: {
      needAuth: true
    }
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = getItem("isLoggedIn")
  if (!to.meta.needAuth) {
    next()
  } else {
    if (isLoggedIn){
      next()
    } else {
      next({name: "login"})
    }
  }
})

export default router
