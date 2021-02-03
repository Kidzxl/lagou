<template>
  <el-container>
    <el-header class="header-out">
      <div class="inner">
        <div class="logo"></div>
        <ul class="uls">
          <li class="tab-active">
            <a href="/">首页</a>
          </li>
          <li>
            <a href="">公司</a>
          </li>
          <li style="width: 94px;">
            <a href="">校园招聘</a>
          </li>
          <li>
            <a href="">直言</a>
          </li>
          <li>
            <a href="">课程</a>
          </li>
          <li>
            <a href="">APP</a>
          </li>
          <li></li>
          <li></li>
          <li style="color: #fff;" v-if="userName">
            <el-dropdown>
              <span class="el-dropdown-link" style="color:#AFB5C0;">
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="myresume">我的简历</a></el-dropdown-item>
                  <el-radio-group v-model="direction">
                    <el-dropdown-item @click.native="drawer = true" >
                      修改密码
                    </el-dropdown-item>
                  </el-radio-group>
                <el-dropdown-item ><a href="mycenter">投递记录</a></el-dropdown-item>
                <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li style="color: #AFB5C0;" v-if="userName">
            <a :href="url">企业版</a>
          </li>
          <li style="color: #AFB5C0;" v-if="!userName">
            <a href="login">登录</a>
          </li>
          <li style="color: #AFB5C0;" v-if="!userName">
            <a href="register">注册</a>
          </li>
        </ul>
      </div>
    </el-header>
    <!--<el-main>Main</el-main>-->
    <el-drawer
      title="修改密码"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-form :model="user" :rules="rules" ref="user" label-width="150px" class="demo-ruleForm">
        <el-form-item label="手机号码" labelWidth="150px" prop="tel">
          <el-input v-model="user.tel" :disabled="true" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="验证码" labelWidth="150px" prop="code">
          <el-input style="width:200px;" v-model="user.code"></el-input>
          <span @click="getCode()" v-if="codeFlag">获取验证码</span>
          <span v-if="!codeFlag" >{{codeNum}}秒再次请求</span>
        </el-form-item>
        <el-form-item label="输入当前密码" labelWidth="150px" prop="pass">
          <el-input type="password" style="width:200px;" v-model="user.pass"></el-input>
        </el-form-item>
        <el-form-item label="输入修改密码" labelWidth="150px" prop="checkPass">
          <el-input type="password" style="width:200px;" v-model="user.checkPass"></el-input>
        </el-form-item>
        <el-button type="success" @click="submit('user')" style="margin-left:40%;">提交</el-button>
      </el-form>
    </el-drawer>
  </el-container>

</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";

  export default {
    //import引入的组件需要注入到对象中才能使用",
    name:"Navigation",
    components: {
      ElForm,
      ElInput,
      ElFormItem},
    data() {
      var validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(value != this.rcode){
            return callback(new Error("验证码错误"))
        }else{
            return callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }else if(value != this.hUser.password){
          return callback(new Error("密码错误"))
        }else{
            return callback();
        }
      };
      //这里存放数据",
      return {
        codeNum:61,
        codeFlag:true,
        userName:null,
        url:"coreCenter",
        direction:'rtl',
        drawer:false,
        rcode:"1234",
        user:{
          tel:"",
          userId:1,
          pass:"",
          checkPass:"",
          code:"",
        },
        hUser:{},
        rules: {
          code: [
            {required: true, validator: validateCode, trigger: 'blur' }
          ],
          pass: [
            { required: true,validator:validatePass, trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      };
    },
    //监听属性 类似于data概念",
    computed: {},
    //监控data中的数据变化",
    watch: {},
    //方法集合",
    methods: {
      getCode:function () {
        var that = this;
        var re = /^1[0-9]{10}$/;
        if(re.test(this.user.tel)){
          axios.get('api/getcode', {
              params: {tel: that.user.tel, msg: "register"},
            }).then(function (response) {
              var key = that.tel + ":change:code";
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
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
                userId:this.user.userId,
                password:this.user.checkPass,
            }
            let that = this;
            axios({
              url: 'api/user/changePassword',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:data
            }).then(function (response) {
                alert("修改成功")
                that.loginOut();

            }).catch(function (error) {
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        getUserName(){
           let that = this;
          axios.get('api/user/getUserName',{
          }) .then(function (response) {
              if(response.data !=-1){
                that.userName = response.data.result.data.userName;
                that.getUrl();
              }else{
                that.userName = null;
              }

          }).catch(function (error) {
          });
        },
        getUser(){
          let that = this;
          axios.get('api/user/get',{
          }) .then(function (response) {
            if(response.data !=-1){
              that.hUser = response.data.result.data.user;
              that.user.tel = that.hUser.tel
              that.user.userId = that.hUser.id;
            }
          }).catch(function (error) {
          });
        },
        getUrl(){
          let that = this;
          axios.get('api/staff/exist',{
          }) .then(function (response) {
            let staff = response.data.result.data.staff;
            if(staff == null){
                that.url = 'coreCenter'
            }else{
                that.url = 'zhaopinCenter'
            }
          }).catch(function (error) {
          });
        },
        loginOut(){
            window.sessionStorage.clear("token");
            this.userName=null;
            this.$router.push("/")
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
        this.getUserName();
        this.getUser();
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

  .uls{
    width: 800px;
    display: -webkit-flex;
    display: flex;
    float: left;
    margin-left: 34px;
  }
  .tab-active a{
    color:#fff !important;
  }
  .uls li a{
    color:#AFB5C0;
  }

  .tab-active{
    float: left;
    display: inline-block;
    color: #fff;
    background: #24282c;
    cursor: default;
  }

  .inner{
    width: 1200px;
    height: 40px;
    margin: 0 auto;
    background: #32373e;
    font-size: 14px;
    cursor: default;
  }
  .uls>li{
    text-align: center;
    /*float: left;*/
  }

  .uls li{
    flex:1;
    list-style-type: none;
  }
  .logo{
    float: left;
    width: 43px;
    height: 40px;
    background-image: url(//www.lgstatic.com/lg-www-fed/common/widgets/header_c/modules/topbar/img/sprite_361857f.png);
    background-repeat: no-repeat;
    background-position: -10px -1px;
    background-size: 64px 128px;
  }
  .header-out{
    height: 40px !important;
    line-height: 40px;
    background-color: #32373e;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

