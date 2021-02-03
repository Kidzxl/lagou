<template>
    <el-container>
      <el-header style="padding: 0;height:30px;" >
        <div class="header">
          <div class="header-title">企业版</div>
          <div class="idx">拉勾网首页</div>
          <div style="margin-left: 45%;">张小龙</div>
        </div>
      </el-header>
      <el-main style="padding: 0;line-height: 1;overflow:hidden;">
        <div class="vn" style="height: 15px;">企业版</div>
        <div class="logo">
            <h1>确认公司，开始招聘</h1>
        </div>
        <div :class="{zhaopin:true,active:active}">
          <div style="width: 500px;">
            <!--<el-form ref="staffForm" label-position="right" label-width="100px" :rules="staffRules" v-model="staff">-->
            <el-form :model="staff" status-icon :rules="staffRules" ref="staffForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="userName"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="position">
                <el-input v-model="staff.position"></el-input>
              </el-form-item>
              <el-form-item label="公司全称" prop="companyName">
                <el-input v-model="companyName"></el-input>
                <span class="noHave" style="" @click="active =false"> 没有公司？去创建-></span>
              </el-form-item>
              <div style="width: 500px;margin-left:86%;">
                <el-button type="success" @click="submitStaff('staffForm')">确认</el-button>
              </div>
            </el-form>
          </div>
          <!--<div class="demo">-->
            <!--<div class="mp">-->
              <!--<div class="name">张小龙</div>-->
              <!--<div class="position">HR</div>-->
              <!--<div class="email">-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
              <!--<div class="company-name">途虎养车</div>-->
            <!--</div>-->
          <!--</div>-->

        </div>
        <div :class="{createCompany:true,active:!active}">
          <el-form ref="company" :model="company" label-width="80px" style="position: relative;">
            <el-form-item label="公司名字">
              <el-input v-model="company.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="公司地点">
                <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
            </el-form-item>
            <el-form-item label="公司规模">
              <el-select v-model="company.scaleId" placeholder="请选择公司规模">
                <el-option :label="scale.numCondition" :value="scale.id" v-for="(scale,index) in scales" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <div  class="p-lable">
              <span style="">公司标签</span>
              <el-select v-model="doMainListQ"  :multiple-limit="3" multiple placeholder="请选择" style="margin-left: 9px;width:330px;">
                <el-option
                  v-for="(item,index) in doMainList"
                  :key="index"
                  :label="item.fieldName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <el-form-item label="公司介绍" style="height:350px;">
              <div>
                <quill-editor ref="projectEditor"  v-model="company.introduce" :options="editorOption" style="height: 300px;"></quill-editor>
              </div>
            </el-form-item>
            <div class="positionFile">
              <el-upload
                class="avatar-uploader "
                :action="url"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
              </el-upload>
            </div>
            <div style="margin-left:88%;">
              <el-button type="success" @click="submitCompany">确认</el-button>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
</template>

<script>
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main";
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main";
  import ElFooter from "../../node_modules/element-ui/packages/footer/src/main";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        name:"CoreCenter",
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ElFooter,
          ElMain,
          ElHeader,
          ElContainer},
        data() {
            //这里存放数据",
          var token = window.sessionStorage.getItem('token');
          var comId = -1;
          var validateCompanyName = (rule, value, callback) => {
              var that = this;
              console.log(value)
            if (this.companyName == "" || typeof(this.companyName) == "undefined") {
               callback(new Error('公司名称不能为空'));
            }else{
              axios.get('api/getCompanyId',{
                params:{companyName:that.companyName},
              }) .then(function (response) {
                  that.staff.companyId = response.data.result.data.id;
                  if(response.data.result.data.id == -1){
                     callback(new Error('公司不存在'));
                  }else{;
                    callback();
                  }
              }).catch(function (error) {
              });
            }
          }
          return {
            url:"http://localhost:8081/api/company/loadlogo",
            headers:{
              "token":token,
            },
            companyName:"",
            userName:"",
            staff:{
                position:"",
                companyId:comId,
            },
            staffRules:{
              companyName: [
                { validator: validateCompanyName, trigger: 'blur' }
              ],
            },
            scales:[{id:-1,type:"暂无"}],
            active:true,
            editorOption: {
              modules:{
                toolbar:[// toggled buttons
                  [{ 'list': 'ordered'}, { 'list': 'bullet'},],
                ]
              },
              placeholder:"insert text here..",
            },
            company:{
              name:"",
              address:"",
              logo:"",
              scaleId:"",
              introduce:"",
              doMainList:[]
            },
            province:"",
            area:"",
            city:"",
            imageUrl: '',
            doMainListQ:[],
            doMainList:[],
          };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
        methods: {
            getDoMainList(){
              var that = this;
              axios.get('api/company/getDomains',{
              }) .then(function (response) {
                that.doMainList = response.data.result.data.doMains;
              }).catch(function (error) {
                console.log(error);
              });
            },
          submitStaff(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var that = this;
                  axios({
                    url: 'api/staff/insert',
                    method: 'post',
                    transformRequest: [function (data) {
                      // 对 data 进行任意转换处理
                      return Qs.stringify(data)
                    }],
                    data: that.staff,
                  }).then(function (response) {
                    console.log(response)
                    if (response.data.result.data.id != -1) {
                      that.$router.push("zhaopinCenter")
                    } else {
                      alert("失败")
                    }
                  }).catch(function (error) {
                    console.log(error);
                  })
              } else {
                console.log('error submit!!');
                return false;
              }
            })
          },
          submitCompany(){
              var that = this;
            that.company.doMainList =JSON.stringify(that.doMainListQ)
            axios({
              url: 'api/company/insert',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:that.company
            }).then(function (response) {
                if(response.data.result.code == 200){
                  that.active = true;
                }
            }).catch(function (error) {
              console.log(error);
            })
          },
          getUserName(){
              var that = this;
            axios.get('api/user/getUserName',{
            }) .then(function (response) {
              that.userName = response.data.result.data.userName;
            }).catch(function (error) {
              console.log(error);
            });
          },
          getScales(){
              var that = this;
            axios.get('api/getscale',{
            }) .then(function (response) {
              that.scales = response.data.result.data.scales;
            }).catch(function (error) {
                console.log(error);
            });
          },
          handleAvatarSuccess(res, file) {
              console.log(res)
              console.log(file)
            this.company.logo = res;
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          onChangeProvince(a){
            this.province = a.value
            this.company.address = a.value;
          },
          onChangeCity(a){
            this.city = a.value
            this.company.address += a.value;
          },
          onChangeArea(a){
            this.area = a.value
            this.company.address += a.value;
//            this.show=false
          },
          handleRemove(file) {
            console.log(file);
          },
          onSubmit() {
            console.log('submit!');
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
          this.getDoMainList();
          this.getScales()
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
  .p-lable{
    font-size: 14px;
    padding-left: 12px;
    margin-bottom: 20px;
  }
  .noHave:hover{
    color:blue;
  }
  .noHave{
    cursor:pointer;
  }
  .positionFile{
    position: absolute;
    top:0;
    left:70%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

select{
  width: 100px;
}
.createCompany{
  margin: 0 auto;
  margin-top: 15px;
  width:600px;
  display: none;
}
  .zhaopin{
    display:none;
    position:relative;
    width:700px;
    margin: 0 auto;
    margin-top: 7%;

  }
  .active{
    display: block;
  }
  .demo{
    position: absolute;
    box-sizing: border-box;
    width: 180px;
    height: 200px;
    padding: 0 10px;
    top: 0;
    left: 674px;
    background: #FFF;
    border: 1px solid #EAEDEC;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.07);
    border-radius: 3px;
    font-size: 14px;
    z-index: 100;
  }
  .name,.position{
    height:50px;
    text-align: center;
  }
  .email,.company-name{
    /*margin-top: 16px;*/
    font-size: 14px;
    color: #777;
    text-align: center;
  }
  .mp{
    padding:30px 30px 30px 0px;
    width: 130px;
    height: 140px;
  }
  .vn{
    /*float: left;*/
    font-size: 24px;
    line-height: 1px;
    color: #00b38a;
    /*border-left: 1px solid #e1e1e1;*/
    margin: 12px 0 0 20%;
    padding: 0 12px;
  }
  .logo h1{
    margin:0 auto;
    padding-top:3.5%;
  }
  .logo{
    /*font-size:60px;*/
    width: 100%;
    min-width: 640px;
    height: 164px;
    background-image: url(//www.lgstatic.com/lg-openservice-fed/static/service/modules/common/img/banner_693a2f8.jpg);
    text-align: center;
    color: #fff;
    padding: 10px 0;
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

