
import {ifLogin} from "../api";

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component : () => import('../views/Login')
  },
  {
    path: "/admin",
    meta : {cnName : "首页"},
    component : () => import('../views/Admin'),
    beforeEnter: (to, from, next) => {
      ifLogin().then(res=>{
        if (res.data.code) {
          //code不为0，未登录，跳登陆
          next("/");
        }else{
          //code为0，已登录，进入管理界面
          next();
        }
      }).catch(()=>{
        next("/");
      })
    },
    children:[
      {
        path: "",
        name:"AdminIndex",
        component : () => import('../views/Admin/AdminIndex'),
        meta : {cnName : "首页"}
      },
      {
        path: "ArticleAdd",
        name:"ArticleAdd",
        component : () => import('../views/Admin/Article/ArticleAdd'),
        meta : {cnName : "添加文章"}
      },
      {
        path: "ArticleManage",
        name:"ArticleManage",
        component : () => import('../views/Admin/Article/ArticleManage'),
        meta : {cnName : "管理文章"}
      },
      {
        path: "UserAdmin",
        name:"UserAdmin",
        component : () => import('../views/Admin/User/UserAdmin'),
        meta : {cnName : "用户管理"}
      },
      {
        path: "MessageDelete",
        name:"MessageDelete",
        component : () => import('../views/Admin/Message/MessageDelete'),
        meta : {cnName : "留言删除"}
      },
      {
        path: "DiaryAdd",
        name:"DiaryAdd",
        component : () => import('../views/Admin/Diary/DiaryAdd'),
        meta : {cnName : "添加日记"}
      },
      {
        path: "DiaryManage",
        name:"DiaryManage",
        component : () => import('../views/Admin/Diary/DiaryManage'),
        meta : {cnName : "日记管理"}
      },
      {
        path: "LinkAdd",
        name:"LinkAdd",
        component : () => import('../views/Admin/Links/LinkAdd'),
        meta : {cnName : "添加友链"}
      },
      {
        path: "LinkDelete",
        name:"LinkDelete",
        component : () => import('../views/Admin/Links/LinkDelete'),
        meta : {cnName : "删除友链"}
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
