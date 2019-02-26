import Vue from 'vue'
import Router from 'vue-router'

import index from "../views/index.vue"
Vue.use(Router)



export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "",
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import(/* webpackChunkName: "home" */ '../views/message/message.vue')
      },
      {
        path: 'find',
        name: 'find',
        component: () => import(/* webpackChunkName: "home" */ '../views/find/find.vue')
      },
      {
        path: 'user',
        name: 'self-user',
        component: () => import(/* webpackChunkName: "home" */ '../views/user/user.vue')
      },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
      path: "/user-list",
      name: "user-list",
      component: () => import(/* webpackChunkName: "public" */ '../views/user/user-list.vue')
    },
    {
      path: "/user",
      name: "user",
      component: () => import(/* webpackChunkName: "public" */ '../views/user/user.vue')
    },
    {
      path: "/edit-user",
      name: "edit-user",
      component: () => import(/* webpackChunkName: "public" */ '../views/user/user-info.vue')
    },
    {
      path: "/topic-detail",
      name: "topic-detail",
      component: () => import(/* webpackChunkName: "public" */ '../views/home/topic-detail.vue')
    },
    {
      path: "/private",
      name: "private",
      component: () => import(/* webpackChunkName: "public" */ '../views/user/private.vue')
    }
  ]
})
