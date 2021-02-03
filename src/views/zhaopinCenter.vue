<template>
  <el-container>
    <el-header style="padding: 0;height:30px;" >
      <div class="header">
        <div class="header-title">企业版</div>
        <div class="idx"><a href="/">拉勾网首页</a></div>
        <div style="margin-left: 45%;">{{name}}</div>
      </div>
    </el-header>
    <el-main>
      <el-container style=" border: 1px solid #eee;border-bottom: 0px;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>菜单</template>
                <el-menu-item index="2-1" @click="joinUsFlag=false;">招聘情况</el-menu-item>
                <el-menu-item index="2-2" @click="joinUsFlag=true;">我要招聘</el-menu-item>
                <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="line-height: 1;text-align: left;">
          <join v-if="joinUsFlag"></join>
          <zhaopin-detail v-else></zhaopin-detail>
        </el-main>
      </el-container>


    </el-main>
  </el-container>
</template>

<script>
  import ElMain from "../../node_modules/element-ui/packages/main/src/main";
  import Navigation from "./navigation";
  import Join from "./joinus";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
  import ZhaopinDetail from "./zhaopinDetail";
    export default {
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ZhaopinDetail,
          Join,
          Navigation,
          ElMain},
        data() {
            //这里存放数据",
            return {
                name:"",
                joinUsFlag:false
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
        methods: {
            getUserName(){
              let that = this;
              axios.get('api/user/getUserName',{
              }) .then(function (response) {
                if(response.data !=-1){
                  that.name = response.data.result.data.userName;
                }else{
                  that.userName = null;
                }

              }).catch(function (error) {
              });
            }
        },
        //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
        beforeCreate() {
        },

        //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
        created() {

        },
        //生命周期 - 挂载之前",html模板未渲染
        beforeMount() {

        },

        //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
        mounted() {
          this.getUserName()
        },

        //生命周期 - 更新之前",数据模型已更新,html模板未更新
        beforeUpdate() {

        },
        //生命周期 - 更新之后",数据模型已更新,html模板已更新
        updated() {

        },
        //生命周期 - 销毁之前",
        beforeDestroy() {

        },
        destroyed() {

        },
        //生命周期 - 销毁完成",
        //如果页面有keep-alive缓存功能，这个函数会触发",
        activated() {

        },
    }


    // "http-get请求": {
    //   "prefix": "httpget",
    //     "body": [
    //     "this.\({",
    //     "url: this.\\$http.adornUrl(''),",
    //     "method: 'get',",
    //     "params: this.\\$http.adornParams({})",
    //     "}).then(({ data }) => {",
    //     "})"
    //   ],
    //     "description": "httpGET请求"
    // },
    // "http-post请求": {
    //   "prefix": "httppost",
    //     "body": [
    //     "this.\({",
    //     "url: this.\\$http.adornUrl(''),",
    //     "method: 'post',",
    //     "data: this.\\$http.adornData(data, false)",
    //     "}).then(({ data }) => { });"
    //   ],
    //     "description": "httpPOST请求"
    // }
    // }

</script>

<style>
  a{
    color: #c4c3c3;
    text-decoration:none;
  }
  .el-main{
    background-color: #fff !important;
    padding:0;
  }
  .idx{
    margin-left: 1%;
    border-left: 1px solid #c4c3c3;
    padding-left: 20px;
  }
  .header-title{
    margin-left: 23%;
    color:#08d7a2 !important;
  }
  .header{
    padding-top: 3px;
    min-width: 1024px;
    height: 27px;
    background-color: #333;
  }
  .header div{
    color:#c4c3c3;
    display: inline-block;
  }
</style>

