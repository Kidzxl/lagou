<template>
  <div id="index">
    <navigation></navigation>
    <el-container>
      <el-header height="100px" style="background-color: #F2F5F4;">
        <div class="search">
          <div class="search-text">
            <el-input v-model="search_data" placeholder="请输入内容" style="height:90px;width: 60%;
    display: inline-block;"> </el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>
      </el-header>

      <el-main style="line-height: 1;text-align: left;background-color: #fff;    overflow:hidden;">
        <!--中间的-->
        <div class="main-div-out" style="ackground-color: #fff" >
          <!--多级列表-->
          <div class="main-div-ml">
            <div class="menu_box" v-for="(root,index) in classify">
              <ul class="menu_items" >
                <span style="margin-left:10px;">{{root.type}}</span>
                <li v-for="(h,j) in hotClassify[index]">
                  <a :href="'zhaopin?jobTitle='+h.type">{{h.type}}</a>
                </li>
                <span style="margin-right:20px;"><i class="el-icon-arrow-right"></i></span>
              </ul>
              <div class="menu_sub">
                  <dl class="menu_sub_item" v-for="(childTwo,i) in root.child">
                    <dt>{{childTwo.type}}</dt>
                    <dd v-for="(t,index) in childTwo.child"><a :href="'zhaopin?jobTitle='+t.type">{{t.type}}</a></dd>

                  </dl>
              </div>
            </div>
          </div>
          <!--轮播图-->
          <div class="main-div-lb">
            <el-carousel style="height: 100%">
              <el-carousel-item  v-for="(item , index) in image_address" :key="index">
                <div style="height: 100%;">
                  <img :src="item" alt="" style="
                  display: inline-block;
                  height: 100%;
                  max-width: 100%;"></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div style="clear:both;"></div>
        </div>
        <!--尾部的-->
        <div style="padding-top:2%;width:65%; margin-left: 20%;">
          <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="24Hour热门" name="1">
              <el-card shadow="hover" class="hot-card" v-for="(item,index) in hotJob" :key="index" style="position: relative;">
                    <div class="pli_top" style="height: 110px;">
                      <div>
                        <a :href="'job?jobId='+item.jobCompany.id" style="font-size:20px;">{{item.jobCompany.positionTitle}}</a>
                        <span style="padding-left:15%;font-size: 16px;
    color: #fa6041;">{{item.jobCompany.pay}}</span>
                      </div>
                      <div style="height: 30px;
                      font-size:14px;
                      padding-top:10px;line-height: 30px; color: #777;">
                        <span>{{item.jobCompany.experience.experienceCondition}}/{{item.jobCompany.eduBackground.eduCondition}}</span>
                      </div>
                      <div>
                        <span class="wordCut" :title="c" v-for="c in item.classify">{{c}}</span>
                      </div>
                    </div>
                <img style="position:absolute;top:65%;" :src="item.jobCompany.company.logo" alt="" width="86" height="66">
                    <div style="
                    padding-left:86px;
                    padding-top: 30px;
                    height: 40px;
    border-top: 1px dashed #E0E0E0;">
                      <h3>
                        <a href="">{{item.jobCompany.company.name}}</a>
                      </h3>
                      <h3 style="height: 20px;
    line-height: 20px;
    color: #999;
    margin: 0;
    font-size: 12px;
}">
                        <span v-for="domain in item.domains">{{domain}}/</span>
                      </h3>
                    </div>
                  </el-card>

            </el-tab-pane>
          </el-tabs>

        </div>
      </el-main>
        <foot></foot>
    </el-container>
  </div>

</template>

<script>
import Navigation from "./navigation.vue"
import foot from "./foot.vue"
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import ElFooter from "../../node_modules/element-ui/packages/footer/src/main";
  export default {
    //import引入的组件需要注入到对象中才能使用",
    name:"Index",
    components: {
      ElFooter,
      Navigation,
      foot,
    },
    data() {
      //这里存放数据",
      return {
        activeName: '1',
        search_data:"",
        image_address :[
          "https://www.lgstatic.com/i/image/M00/65/9E/CgqCHl-bfPCAQ1SzAADGFtMHKuo393.JPG",
          "https://www.lgstatic.com/i/image/M00/6C/E4/CgqCHl-rtnyAPfnMAAFfJPW2vfM942.JPG"
        ],
        classify:"",
        hotClassify:"",
        hotJob:{},
      };
    },
    //监听属性 类似于data概念",
    computed: {},
    //监控data中的数据变化",
    watch: {},
    //方法集合",
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getClassify(){
        var that = this;
        axios.get('api/classify/get',{
        }) .then(function (response) {
          that.classify = response.data.result.data.classify;
          that.hotClassify = response.data.result.data.hotClassify;
        }).catch(function (error) {
        });
      },
      getHotJob(){
          let that =this;
        axios.get('api/job/recommend',{
        }) .then(function (response) {
            console.log(response)
          that.hotJob = response.data.result.data.jobs;
        }).catch(function (error) {
        });
      },
      search(){
          if(this.search_data == ""){
              window.location.href = "zhaopin"
          }else{
              window.localtion.href = "zhaopin?jobTitle="+this.search_data;
          }
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
      this.getClassify();
      this.getHotJob()
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
  .hot-card{
    overflow:visible;
    display:inline-block;
    margin-top:5px;
    margin-bottom:20px;
    margin-right:30px;
    min-height: 220px;
    min-width: 370px;
  }
  .menu_sub_item{
    margin-bottom: 20px;
  }
  dd a {
    padding-right:10px;
    border-right: 1px solid #bbb;
  }
  dd{
    font-size:13px;
    padding-left:10px;
    padding-top:20px;
    /*width: 50px;*/
    display: inline-block;
  }
  .wordCut{
    display: inline-block;
    width: 61px;
    height: 26px;
    padding: 0 5px;
    margin-right: 10px;
    font-size: 12px;
    line-height: 26px;
    color: #999;
    border: 1px solid #F0F0F0;
    border-radius: 3px;
    text-align: center;
  }
  .el-carousel__container{
    height: 100%;
  }
  .main-div-out{
    width: 65%;
    height: 415px;
    margin-left: 20%;
  }
  .main-div-ml{
    flex-direction:column;
    display: flex;
    width: 35%;
    /*min-width: 460px;*/
    height: 100%;
    /*background-color: lightskyblue;*/
    float: left;
  }
  .main-div-lb{
    /*background-color: rgb(238, 213, 140);*/
    height: 100%;
    /*width: 60%;*/
    /*margin-left: 40%;*/
  }
  /*.el-header{*/
    /*height: 30%;*/
  /*}*/
  .search{
    /*position: fixed;*/
    width: 70%;
    top: 40px;
    z-index: 110;
    padding: 20px 0;
  }
  .search-text{
    width: 100%;
    margin-left:35%;margin-top:1%;
  }
  .menu_box{
    padding-top:15px;
    position: relative;
    flex: 1;
  }
  .menu_box:hover{
    /*background-color: red;*/
    box-shadow: 0 0 4px 2px rgba(0,0,0,.09);
    border-top-left-radius: 2px;
    border-bottom-left-radius:2px;
    background: #fff;
  }
  .menu_box:hover .menu_sub{
    display: block;
    width: 600px;
    box-shadow: 0 0 4px 2px rgba(0,0,0,.09);
    border-top-left-radius: 2px;
    border-bottom-left-radius:2px;
    background: #fff;
  }
  .menu_items li{
    font-size: 14px;
    flex:1;
    list-style: none;
  }
  .menu_items{
    display: flex;
    text-align: center;
  }
  .menu_sub{
    padding:10px;
    width: 0px;
    position: absolute;
    top:0;
    left:100%;
    z-index: 100;
    background-color: white;
    overflow: hidden;
    display: none;
  }
  a{
    color: #888;
    background-color: transparent;
  }
  a:link{ text-decoration: none;}

</style>

