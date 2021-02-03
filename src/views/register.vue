<template>
  <el-container id="register-container" style="height: 800px;">
    <el-header height="10%">
        <div style="padding-top: 1%;
    padding-left: 25%;">
          <img src="https://www.lgstatic.com/lg-landingpage-fed/pc/images/logo-slogan_443548c6.png" style="width: 15%">
        </div>
    </el-header>
    <el-main >
      <div class="el-main-img">
        <div class="content">
            <div class="content-head" style="height: 8%"></div>
            <div v-if="!subPass" class="register">
              <div class="register-title"><font color="#00b38a">一键</font>注册 轻松找兼职全职</div>
              <div  class="register-form">
                <form action="">
                  <ul style="padding-left:1px;">
                    <li class="register-form-li">
                      <input placeholder="请输入常用手机号" v-model="tel" id="lp_phone" name="phone" autocomplete="off">
                      <div class="tel-error" v-if="telError">请输入正确的手机号</div>
                    </li>
                    <li class="register-form-li">
                      <input placeholder="请输入手机验证码" id="lp_coder" v-model="code" name="coder" autocomplete="on">
                      <div  class="getcode" @click="getCode()" >
                        <span v-if="codeFlag">获取验证码</span>
                        <span v-if="!codeFlag" >{{codeNum}}秒再次请求</span>
                      </div >
                    </li>
                    <div class="tel-error" v-if="codeError">{{codeMsg}}</div>
                    <a href="#" class="submitBtn" @click="submit()">立即注册</a>
                    <span style="    padding-left: 20px;">注册代表你已同意「招聘用户协议」</span>
                    <div style="height: 20px;"></div>
                    <a href="login" class="login">已有帐号，直接登录</a>
                  </ul>
                </form>
              </div>
            </div >
            <div v-else class="register" >
              <div class="register-title"><font color="#00b38a">填写</font>密码</div>
              <div class="register-form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitPassword('ruleForm')">提交</el-button>
                    <el-button @click="goLogin()">跳过</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
        </div>
        <div class="footer"></div>
      </div>
    </el-main>
    <el-footer height="10%">
      <div class="footer-div" style="margin-left: 20%;">快速入职</div>
      <div class="footer-div">隐私保护</div>
      <div class="footer-div">薪资透明</div>
      <div class="footer-div">海量信息</div>
    </el-footer>
  </el-container>
</template>

<script>
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main";
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  import ElFooter from "../../node_modules/element-ui/packages/footer/src/main";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        name:"Register",
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ElFooter,
          ElHeader,
          ElContainer},
        data() {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
            //这里存放数据",
            return {
              ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
              },
              tel:"",
              code:"",
              timer:"",
              rcode:"",
              codeNum:61,
              codeFlag:true,
              telError:false,
              codeError:false,
              subPass:false,
              codeMsg:"",
              user_id:"",
              rules: {
                pass: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass2, trigger: 'blur' }
                ],
              },
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
            tel:{
                handler(newValue,oldValue){
                    this.telError=false;
                }
            },
            code:{
                handler(){
                    this.codeError = false;
                }
            }
        },
        //方法集合",
        methods: {
          goLogin:function () {
            this.$router.push("login");
          },
          getCode:function () {
              var that = this;
              var re = /^1[0-9]{10}$/;
              if(re.test(this.tel)){
                axios.get('api/getcode', {
                  params: {tel: that.tel, msg: "register"},
                }).then(function (response) {
                  var key = that.tel + ":code";
                  that.$cookies.set(key,response.data.result,"120s");
                  that.rcode = response.data.result;
                }).catch(function (error) {
                  console.log(error)
                });
                this.timer = setInterval(() => {
                  if (this.codeNum == 0) {
                    this.codeNum = 60;
                    this.codeFlag = true;
                    clearInterval(this.timer);
                  } else {
                    this.codeNum -= 1;
                    this.codeFlag = false;
                  }
                },1000)
              }else{
                this.telError=true;
              }
            },
          submit:function () {
            var key = this.tel+":code";
            var c = this.$cookies.get(key);
            var that = this;
            if(this.code == c){
                axios({
                  url: 'api/user/register',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:{tel:that.tel,code:that.code}
                }).then(function (response) {
                  let userId = response.data.result.data.userId;
                  if(userId == -1){
                    that.codeError=true;
                    that.codeMsg="注册失败，账号已存在"
                    console.log("注册失败，账号已存在");
                  }else{
                      that.user_id = userId;
                      // 注册成功 提示填写个密码
                      that.subPass = true;
//                    that.$router.push("login");
                  }
                }).catch(function (error) {
                  console.log(error);
                })
            }else if(this.code == "" || this.code.length==0){
                this.codeError=true;
                this.codeMsg="请输入验证码"
            }else{
              this.codeError=true;
              this.codeMsg="验证码错误"
            }
          },
          submitPassword(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  axios({
                  url: 'api/user/addPassword',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:{id:that.user_id,password:that.ruleForm.pass}
                }).then(function (response) {
                  if(response.data.result.code == 200){
                      that.$router.push("login");
                  }else{
                      alert("出错了")
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        },

        //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
        mounted() {
//            this.init();
        },

    }


//  axios.get('http://localhost:8081/join/has',{
//    params:{uid:this.user.uid},
//  }) .then(function (response) {
//
//  }).catch(function (error) {
//  });


//  axios({
//    url: 'http://localhost:8081/user/add',
//    method: 'post',
//    transformRequest: [function (data) {
//      // 对 data 进行任意转换处理
//      return Qs.stringify(data)
//    }],
//    data:user
//  }).then(function (response) {
//    console.log(response)
//  }).catch(function (error) {
//    console.log(error);
//  })

</script>

<style>
  .tel-error{
    font-size: 10px;
    color: red;
    /*display: none;*/
  }
  .activate{
    display: inline-block;
  }
  .login{
    font-size: 14px;
    color: #00b38a;
    text-decoration: underline;
    padding-left: 80px;
  }
  .footer-div{
    padding-top:2%;
    text-align:center;
    margin:0 auto;
    width: 15%;
    height: 130%;
    float: left;
  }
  .submitBtn{
    margin-top:40px;
    display: block;
    width: 300px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 16px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(90deg,#09cb9d,#02b389);
    border-radius: 3px;
  }
  .getcode{
    cursor:pointer;
    display: inline-block;
    /*height: 38px;*/
    font-size: 14px;
    /*line-height: 38px;*/
    color: #00b38a;
    text-align: center;
    /*text-decoration: none;*/
    /*border-radius: 3px;*/
  }
  .register-form-li{
    list-style-type:none;
    /*height: 60px;*/
  }
  input{
    border: 0px;
    outline:none;
    width: 50%;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
  .content{
    height: 70%;
  }
  .footer{
    /*margin-left:1%;*/
    height: 30%;
    /*min-height: 694px;*/
    background-image: url("http://www.lgstatic.com/lg-landingpage-fed/pc/images/bg_49338802.png");
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding:0;
    line-height: 1;
    overflow:hidden;
  }
  .el-footer{
    padding:0;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .register
  {
    margin-left:50%;
    padding-top:50px;
    padding-left:47px;
    width:20%  ;
    height: 92%;
    background-color: #fff;
    min-width: 400px;
  }
  .el-main-img{
    height: 100%;
    background-color: #00b38a;
  }
  .register-title{
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    position: relative;
    line-height: 26px;
    margin-bottom: 47px;
  }
</style>

