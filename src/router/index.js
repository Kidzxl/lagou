/**
 * Created by Administrator on 2020/11/4.
 */
import Vue from 'vue'
import Router from 'vue-router'

import Index from "../views/Index.vue"
import Com from "../views/Com.vue"
import Register from "../views/register.vue"
import Login from "../views/login.vue"
import MyResume from "../views/MyResume.vue"
import Position from "../views/Position.vue"
import Hello from "../views/hello.vue"
import Job from "../views/Job.vue"
import Mycenter from "../views/Mycenter.vue"
import UserCenter from "../views/UserCenter.vue"
import initUser from "../views/initUser.vue"
import CoreCenter from "../views/coreCenter.vue"
import zhaopinCenter from "../views/zhaopinCenter.vue"
import joinus from "../views/joinus.vue"
import foot from "../views/foot.vue"
import navigation from "../views/navigation.vue"
import ZhaopinDetail from "../views/zhaopinDetail.vue"
import Company from "../views/Company.vue"

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [

    {
      path: "/register",
      name: "register",
      component: Register,
    }, {
      path: "/",
      name: "index",
      component: Index,
    }, {
      path: "/com",
      name: "com",
      component: Com,
    }, {
      path: "/login",
      name: "login",
      component: Login,
    }, {
      path: "/myresume",
      name: "myresume",
      component: MyResume,
    },{
      path:"/zhaopin",
      name:"zhaopin",
      component:Position,
    }
    ,{
      path:"/hello",
      name:"hello",
      component:Hello,
    }
    ,{
      path:"/job",
      name:"job",
      component:Job,
    }
    ,{
      path:"/mycenter",
      name:"mycenter",
      component:Mycenter,
    }    ,{
      path:"/usercenter",
      name:"usercenter",
      component:UserCenter,
    }  ,{
      path:"/inituser",
      name:"inituser",
      component:initUser,
    } ,{
      path:"/coreCenter",
      name:"CoreCenter",
      component:CoreCenter,
    },{
      path:"/zhaopinCenter",
      name:"zhaopinCenter",
      component:zhaopinCenter,
    },{
      path:"/joinus",
      name:"joinus",
      component:joinus,
    },{
      path:"/foot",
      name:"foot",
      component:foot,
    },{
      path:"/nav",
      name:"Nav",
      component:navigation,
    },{
      path:"/zhaopinDetail",
      name:"ZhaopinDetail",
      component:ZhaopinDetail,
    },{
      path:"/company",
      name:"Company",
      component:Company,
    }
  ]
})
