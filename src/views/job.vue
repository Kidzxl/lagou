<template>
    <div>
      <navigation></navigation>
      <el-container>
        <el-header height="5%" style="background-color: #F2F5F4;padding:0;">
          <div class="company">
            <div class="position">
              <ul>
                <li style="color:#555;">{{jobCompany.positionDepartment}}招聘</li>
                <!--{{jobCompany.company.name}}-->
                <li>
                  <div style="font-size: 40px;">
                    {{jobCompany.positionTitle}}
                  </div>
                </li>
                <li>
                  <ul style="display:inline-block;">
                    <li class="company-item xinzi">{{jobCompany.pay }} </li>
                    <li class="company-item"> / {{jobCompany.experience.experienceCondition}}  /</li>
                    <li class="company-item"> {{jobCompany.eduBackground.eduCondition}}及以上  /</li>
                    <li class="company-item"> {{jobCompany.workState}} </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="lables" v-for="item in domains">{{item}}</li>
                  </ul>
                </li>
                <li>
                  {{jobCompany.time}} 发布于拉勾网
                </li>
              </ul>
            </div>
            <div class="send">
              <div class="send-top">
                <!--<el-button type="success" icon="el-icon-star-off" plain>收藏</el-button>-->
                <el-button type="success" plain style="background-color: #00b38a;color:#fff;" @click="deliveryResume">投个简历</el-button>
              </div>
              <div class="send-mid" v-if="loginFlag">
                <ul>
                  <li>
                    <el-radio v-model="chooseResume" label="在线简历">在线简历</el-radio>
                  </li>
                  <li v-for="(file,index) in files">
                    <el-radio v-model="chooseResume" :label="file.fileName">{{file.fileName}}</el-radio>
                  </li>
                </ul>
              </div>
              <div v-else style="padding:50px;">
                 请先<a href="login" style="color: #00b38a;text-decoration:none;">登陆...</a>
              </div>
            </div>
          </div>
        </el-header>
        <el-main style="background: #fff;line-height: 1;line-height: 1;text-align: left;padding: 0;height: 95%;overflow:hidden;">
          <div class="context">
            <div class="left">
              <div class="position-yh">
                <div class="title">职业诱惑： </div>
                <div class="position-yh-detail" v-html="jobCompany.tempt"></div>
              </div>
              <div class="position-detail">
                <div class="title">
                  职位描述
                </div>
                <div class="position-detail-detail" v-html="jobCompany.context">
                </div>
              </div>
              <div class="position-address">
                <div class="title">工作地址</div>
                <div class="address">{{jobCompany.addressDetail}}</div>
              </div>
              <div class="position-owner"></div>
            </div>
            <div class="mid"></div>
            <div class="right">
              <dl>
                <dd style="position: relative;">
                  <img class="b2" :src="jobCompany.company.logo" width="96" height="96" alt="广州希音供应链管理有限公司">
                </dd>
                <dd>
                  <ul class="list-item">
                    <li>
                      <ul>
                        <i class="el-icon-house"></i>
                        <li style="list-style: none;display: inline-block;margin-right:10px;" v-for="item in classify">{{item}}</li>
                      </ul>
                    </li>
                    <li>
                      <i class="el-icon-user"></i>
                      {{scaleCondition}}
                    </li>
                    <li>
                      <i class="el-icon-user"></i>
                      {{jobCompany.company.name}}
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </el-main>
        <foot></foot>
      </el-container>
    </div>
</template>

<script>
  import Navigation from "./navigation";
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main";
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
  import Foot from "./foot";

    export default {
        name:"Job",
        //import引入的组件需要注入到对象中才能使用",
        components: {
          Foot,
          ElMain,
          ElHeader,
          ElContainer,
          Navigation},
        data() {
            //这里存放数据",
            return {
              chooseResume:"在线简历",
              jobCompany:{
                addressDetail:"",
                company:{
                  address:"",
                  id:"",
                  introduce:"",
                  logo:"",
                  name:"",
                  scaleId:"",
                },
                context:"",
                eduBackground:{
                  eduCondition:"",
                  id:"",
                },
                eduBackgroundId:"",
                experience:{
                  experienceCondition:""
                },
                experienceId:"",
                id:"",
                pay:"",
                positionDepartment:"",
                positionTitle:"",
                receptionEmail:"",
                tempt:"",
                time:"",
                userId:"",
                workState:"",
              },
                domains:[],
                classify:[],
                scaleCondition:"",
                files:[],
              loginFlag:false
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
        methods: {
            deliveryResume(){
            let that = this;
            let data = {
                jobId:this.jobCompany.id,
              fileName:this.chooseResume,
            }
            let msg = "是否使用"+data.fileName+"投递此岗位"
              this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var t = this;
                axios({
                  url: 'api/job/delivery',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:data
                }).then(function (response) {
                  if(response.data.result.data.msg == "投递成功"){
                    t.$message({
                      type: 'success',
                      message: '投递成功'
                    });
                  }else{
                    t.$message({
                      type: 'success',
                      message: '投递失败'
                    });
                  }
                }).catch(function (error) {
                  console.log(error);
                })

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            },
            checkLogin(){
              let token = window.sessionStorage.getItem("token")
              if(token != null){
                  this.loginFlag = true
              }
            },
            getFiles(){
              var that = this;
              axios.get('api/resume/files',{
              }) .then(function (response) {
                console.log(response)
                that.files = response.data.result.data.files;
              }).catch(function (error) {
                console.log(error)
              });
            },
            loadPage(){
              let data = this.$route.query.jobId;
              let that = this;
              axios.get('api/job/get',{
                params:{jobId:data},
              }) .then(function (response) {
                  that.jobCompany = response.data.result.data.jobCompany;
                  that.scaleCondition = response.data.result.data.scaleCondition;
                  that.domains = response.data.result.data.domains;
                  that.classify = response.data.result.data.classify;
              }).catch(function (error) {
                  console.log(error)
              });
            },
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
          this.checkLogin();
          this.loadPage();
          this.getFiles();
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
  a:link{text-decoration:none;   /* 指正常的未被访问过的链接*/

  }a:visited{text-decoration:none; /*指已经访问过的链接*/

   }a:hover{text-decoration:none;/*指鼠标在链接*/}
  a:active{text-decoration:none;/* 指正在点的链接*/  }
  .position-detail-detail{
    padding-left:15px;
  }
  .position-yh-detail{
    padding-left:15px;
  }
  .list-item li{
    list-style: none;
    padding-top:30px;
  }
  .mid{
    width: 3px;
    background-color: #eee;
  }
  .right{
    width:370px;
    padding-top:20px;
    padding-left:30px;
  }
  .left{
    width: 750px;
  }
  .context div{
    padding-bottom: 20px;
  }
  .title{
    font-size: 16px;
    color: #333;
    font-weight: 700;
  }
  .context{
    display: flex;
    width: 1300px;
    /*background: antiquewhite;*/
    /* margin: 0 auto; */
    margin-left: 24%;
    margin-top: 30px;
  }
  .send-mid ul li{
    padding-top:10px;
  }
  .position ul li {
    list-style: none;
    padding-bottom: 5px;
  }
  .lables{
    display: inline-block;
    height: 22px;
    margin-right: 8px;
    padding: 0 10px;
    line-height: 22px;
    background-color: #fff;
    color: #70797b;
    font-size: 12px;
    border-radius: 10px;
  }
  .xinzi{
    color:red;
  }
  .company-item{
    display: inline-block;
  }
  .send{
    width: 400px;
    height: 190px;
  }
  .position{
    width: 600px;
    height: 190px;
  }
.company{
  padding-top:20px;
  display: flex;
  width: 1000px;
  height: 190px;
  margin: 0 auto;
  /*background: bisque;*/
}
  .send li{
    list-style: none;
  }
</style>

