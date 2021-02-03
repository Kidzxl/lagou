<template>
    <div>
      <navigation></navigation>
      <div class="context">
        <!--<div class="side">-->
          <!--<div class="nav">-->
            <!--<div class="nav-header">-->
              <!--猜你喜欢-->
            <!--</div>-->
            <!--<div class="side-items">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<div class="side-position">-->
                    <!--<div class="side-position-log">-->
                      <!--<img src="http://www.lgstatic.com/i/image3/M01/67/78/CgpOIF5LdUCAaevJAAAVxPNBOJY726.jpg" alt="SHEIN" width="56" height="56">-->
                    <!--</div>-->
                    <!--<div class="side-position-detail">-->
                      <!--<div class="side-position-title">JAVA实习生</div>-->
                      <!--<div class="side-position-xz">4k-6k</div>-->
                      <!--<div class="side-position-name">SHEIN</div>-->
                    <!--</div>-->

                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div style="clear: both;"></div>
        <div class="header">
          <em></em>
          <span>已投递简历状态</span>
        </div>
        <div class="detail">
          <div class="title">
            <ul>
              <li >
                <span :class="{'active':active==0}"   @click="state='投递成功'">{{stateList[0]}}</span>
              </li>
              <li >
                <span :class="{'active':active==1}"  @click="state='被查看'">{{stateList[1]}}</span>

              </li>
              <li :class="{'active':active==2}"  @click="state='待沟通'">{{stateList[2]}}</li>
              <li :class="{'active':active==3}"  @click="state='邀请面试'">{{stateList[3]}}</li>
              <li :class="{'active':active==4}"  @click="state='不合适'">{{stateList[4]}}</li>
            </ul>
          </div>
          <div class="company-list">
            <ul>
              <li style="padding: 10px;" v-for="(company,index) in companyList" :key="index">
                <div class="item">
                  <div class="position">
                    <a :href="'job?jobId='+company.id">{{company.positionTitle}}</a>
                    <span>{{company.pay}}</span>
                  </div>
                  <div class="company-name">
                    {{company.name}}
                  </div>
                  <div style="display:inline-block;color:#999;">
                    使用简历：
                    <span style="color:#333">{{company.resumeName}}</span>
                  </div>
                  <div style="display: inline-block;margin-left: 35%;">
                    <span style="float: right">{{state}}</span>
                    <div class="time">{{company.time}}</div>

                  </div>
                </div>
              </li>
            </ul>
            <!--<el-pagination-->
              <!--background-->
              <!--layout="prev, pager, next"-->
              <!--:total="200">-->
            <!--</el-pagination>-->
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import Navigation from "./navigation";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        //import引入的组件需要注入到对象中才能使用",
        components: {Navigation},
        data() {
            //这里存放数据",
            return {
                state:"投递成功",
                companyList:[],
                active:0,
                stateList:["投递成功","被查看","待沟通","邀请面试","不合适"]
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
            state:{
                handler(n,o){
                  this.changeState(n);
                  this.getCompanyList();
                }
            }
        },
        //方法集合",
        methods: {
            changeState(state){
              for(var i = 0 ;i<this.stateList.length;i++){
                  if(this.stateList[i] == state){
                      this.active = i;
                  }
              }
            },
            getCompanyList(){
              var that = this;
              axios.get('api/job/getStateJob',{
                params:{state:that.state},
              }) .then(function (response) {
                  that.companyList = response.data.result.data.sateJobs;
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
          this.getCompanyList();
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
    text-decoration: none;
  }
  .company-list a{
    color:#08a7a2;
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  .side-position-name {
    font-size: 12px;
    color: #999;
  }
  .side-position-title{
    margin: 0;
    color: #333;
    padding: 0;
    font-size: 16px;
  }
  .side-position-xz{
    color:red;
    font-size:16px;
  }
  .side-position{
    padding:10px;
    border-bottom: 1px solid #eee;
  }
  .side-position-detail{
    display: inline-block;
  }
  .side-position-log{
    display: inline-block;
  }
  .nav-header{
    width:200px;
    height:30px;
    border-bottom: 1px solid #5e5e5e;
  }
  .side{
    position: absolute;
    left:75%;
  }
  .detail{
    width:700px;
  }
  .time{
    float: right;
    color: #999;
  }
  .company-name span{
    color: #999;
  }
  .company-name{
    color:#555;
  }
  .position span{
    font-size: 16px;
    color: #e6775c;
  }
  .position{
    font-size: 18px;
    color: #0d9572
  }
  .item{
    margin:10px 20px;
    border-left: 3px solid #91cebe;
    padding: 3px 12px;
    width: 600px;
    background-color: #fff;
  }
  .company-list{
    background-color: #fafafa;
    width:700px;
  }
  .active{
    color:red;
  }
  .title ul li{
    flex:1;
    cursor:pointer;
    margin-right: 60px;
  }
  .title ul{
    width:700px;
    display: flex;
  }
  .title{
    background-color: #f2f2f2;
    padding: 0;
    width: 700px;
    height: 38px;
    text-align: center;
    line-height: 2;

  }
  .header span{
    display: inline-block;
    margin-top: 10px;
  }
  .header em{
    background: #fff url(//www.lgstatic.com/lg-www-fed/mycenter-sidenav/modules/common/img/resume_arr_1f2014c.png) no-repeat;
    width: 24px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .header{
    background: #fafafa;
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    font-size:24px;
    color:#555;
    position: relative;
    width: 700px;
  }
  .context{
    position: relative;
    width: 1000px;
    /*background: antiquewhite;*/
    margin: 0 auto;
    margin-top: 30px;
  }
</style>

