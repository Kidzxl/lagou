<template>
  <el-container id="login-container">
    <el-header height="43%" style="background-color: #00b38a;min-height: 400px;">
      <div style=" padding-left: 20%;
    padding-top: 2%;">
        <img src="http://www.lgstatic.com/lg-passport-fed/static/pc/modules/common/img/logo_e420e46.png" alt="">
      </div>
    </el-header>
    <el-main style="background-color: #f8f9fc;">
      <div style="height:45%;width:20%;background-color: #f8f9fc;border:1px solid #dce1e6;
      position: absolute;
    top: 17%;
    left: 30%;
    min-height: 350px;">
        <div style="height: 10%"></div>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10%;line-height: 1;">
          <el-tab-pane label="密码登录" name="first">
            <el-form  status-icon  label-width="100px" class="demo-ruleForm" style="position: relative;">
              <el-form-item label="手机号码" prop="tel">
                <el-input type="text" v-model="telPass" autocomplete="off"></el-input>
              </el-form-item>
              <div style="position: absolute;top: 40px;color: red;left: 100px;font-size: 14px;" v-if="telPassError">请输入正确的手机号码</div>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="pass" autocomplete="off"></el-input>
              </el-form-item>
              <div style="position: absolute;top: 105px;color: red;left: 100px;font-size: 14px;" v-if="passError">{{passMsg}}</div>
              <a href="#" class="submitBtn" @click="submitPass()">登录</a>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="second">
            <div class="register-form">
              <form action="">
                <ul style="padding-left:1px;">
                  <li class="register-form-li">
                    <input placeholder="请输入常用手机号" id="lp_phone" v-model="telCode" name="phone" autocomplete="off">
                    <span style="font-size: 13px;color:red;" v-if="telCodeError">{{telMsg}}</span>
                  </li>
                  <li class="register-form-li">
                    <input placeholder="请输入手机验证码" id="lp_coder" v-model="code" name="coder" autocomplete="on">
                    <span v-if="codeFlag"  class="getcode" @click="getCode()">获取验证码</span>
                    <span v-if="!codeFlag"  class="getcode">{{codeNum}}秒再次请求</span>
                    <div style="font-size:14px;color:red;" v-model="codeError" v-if="codeError">{{codeMsg}}</div>
                  </li>
                  <a href="#" class="submitBtn" @click="submitCode">登录</a>
                </ul>
              </form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        name:"Login",
        //import引入的组件需要注入到对象中才能使用",
        components: {},
        data() {
            //这里存放数据",
          return {
            telCodeError:false,
            telPassError:false,
            activeName: 'first',
            telPass:"",
            pass:"",
            code:"",
            telCode:"",
            passError:false,
            passMsg:"",
            rcode:"",
            codeNum:61,
            codeFlag:true,
            timer:"",// 验证码倒计时 定时器
            telMsg:"",//手机号码错误
            codeError:false,//显示验证码错误的标志
            codeMsg:"",//具体内容
          };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
             telPass: {
               handler(){
                 this.telPassError = false;
                 this.passError = false;
               }
             },
            pass:{
              handler(){
                this.telPassError = false;
                this.passError = false;
              }
            }
        },
      //方法集合",
      methods: {
        getCode:function () {
          var that = this;
          var re = /^1[0-9]{10}$/;
          if(re.test(this.telCode)){
            axios.get('api/getcode', {
              params: {tel: that.telCode, msg: "login"},
            }).then(function (response) {
                console.log(response)
              var key = that.telCode + ":code";
              that.$cookies.set(key,response.data.result,"300s");
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
            this.telMsg ="请输入正确的手机号码"
            this.telCodeError=true;
          }
        },
        openSuccess() {
          this.$message({
            duration:"1500",
            message: '登录成功',
            type: 'success'
          });
        },
        submitCode(){
          var re = /^1[0-9]{10}$/;
          if(re.test(this.telCode)){
            var key = this.telCode+":code";
            var c = this.$cookies.get(key);
            var that = this;
            if(this.code == c) {
              axios({
                url: 'api/user/loginCode',
                method: 'post',
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return Qs.stringify(data)
                }],
                data: {tel: that.telCode.toString(), code: that.code.toString()}
              }).then(function (response) {
                if(response.data.result.code == 200){
                  var token = response.data.result.data.token;
                  window.sessionStorage.setItem("token",token);
                  that.openSuccess();
                  console.log(response)
                  if(response.data.result.data.userInfo == -1){
                    that.$router.push("inituser");
                  }else{
                    that.$router.push('/');
                  }
                }else{
                  that.codeMsg="账号不存在";
                  that.codeError=true;
                }
              }).catch(function (error) {
                console.log(error);
              })
            }else{
              that.codeMsg="验证码错误";
              that.codeError=true;
            }
          }else{
            this.telMsg ="请输入正确的手机号码"
            this.telCodeError=true;
          }
        },
        submitPass(){
          var re = /^1[0-9]{10}$/;
          var that = this;
          if(re.test(this.telPass)){
              if( this.pass!= "" && this.pass.length>0){
                axios({
                  url: 'api/user/loginPass',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:{tel:that.telPass,password:that.pass}
                }).then(function (response) {
                  if(response.data.result.code == 200){
                    var token = response.data.result.data.token;
                     window.sessionStorage.setItem("token",token);
                     that.openSuccess();
                     if(response.data.result.data.userInfo == -1){
                         that.$router.push("inituser");
                     }else{
                         that.$router.push('/');
                     }
                  }else{
                    that.passMsg="账号不存在";
                    that.passError = true;
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              }else{
                  this.passError = true;
                  this.passMsg = "请输入密码"
              }
          }else{
            this.telPassError=true;
          }
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
//          console.log(tab, event);
        },
        init:function () {
          let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//              let h = document.documentElement.scrollHeight || document.body.scrollHeight
          let h = window.innerHeight;
          h = h - 30;
//              let h = window.screen.height;
          var register = document.getElementById('login-container');
          register.style.height = h + "px";
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
          this.init();
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

</script>

<style>
  .register-form-li input{
    border: 0px;
    outline:none;
    width: 50%;
    height: 90%;
    border-bottom: 1px solid #e6e6e6;
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
    height: 60px;
  }
  .el-tab-pane{

    color:#00b38a;
  }
  .el-form-item{
    padding-right: 40px;
  }
  .el-tabs__item.is-active{
    color:#00b38a;
  }
  .el-tabs__active-bar{
    background-color: #00b38a;
  }
</style>

