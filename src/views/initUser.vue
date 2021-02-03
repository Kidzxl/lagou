<template>
    <div id="initUser">
      <navigation></navigation>
      <div style="height: 300px;width:900px;margin: 0 auto;position:relative;margin-top: 10%;">
        <div>
          <div class="nav">填写个人信息</div>
        </div>
        <el-form :model="userInfo" ref="userInfo" :rules="rules"  class="demo-dynamic">
        <div :class="{'item':true,'activate':isActiveItem[0]}">

          <div class="text-rol">
            <div class="left">
              <div class="left-title" style="width:100px;">姓名</div>
              <el-form-item prop="name"
                            :rules="[
                    { required: true, message: '请输入名字', trigger: 'blur'}
                  ]"
              >
                <el-input v-model="userInfo.name" placeholder="请输入内容" style="width:245px;"></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <div class="right-title">性别</div>
              <div>
                <el-radio v-model="userInfo.sex" label="男">男</el-radio>
                <el-radio v-model="userInfo.sex" label="女">女</el-radio>
              </div>
            </div>
          </div>
          <div class="text-rol">
            <div class="left">
              <div class="left-title" style="width:100px;">生日</div>
              <el-date-picker
                v-model="userInfo.birth"
                type="date"
                placeholder="选择日期" style="width:245px;">
              </el-date-picker>
            </div>
            <div class="right">
              <div class="right-title">所在城市</div>
              <div>
                <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
              </div>
            </div>
          </div>
          <div class="text-rol">
            <div class="left">
              <div class="left-title" style="width:100px;">手机号码</div>
              <el-form-item  prop="tel">
                <el-input v-model="userInfo.tel" placeholder="请输入内容" style="width:245px;"></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <div class="right-title">联系邮箱</div>
              <div>
                <el-form-item
                  prop="email"
                  :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        </el-form>
        <div style="float: right;">
          <el-button style="margin-top: 12px;" @click="submit('userInfo')">完成</el-button>
        </div>

      </div>
    </div>
</template>

<script>
  import Navigation from "./navigation";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
    export default {
        name:"initUser",
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ElFormItem,
          ElForm,
          Navigation},
        data() {
            var checkTel= (rule, value, callback) => {
              var re = /^1[0-9]{10}$/;

              if (re.test(value)) {
                callback();
              }else if(value == ""){
                callback(new Error('请输入手机号码'));
              } else{
                callback(new Error('请输入正确的手机号码!'));
              }
            };
            //这里存放数据",
          return {
            userInfo:{
              name:"",
              sex:"",
              birth:"",
              tel:"",
              email:"",
              city:"",
              area:"",
              province:"",
            },
            rules:{
              tel: [
                { validator: checkTel, trigger: 'blur' }
              ]
            },
            active: 0,
            isActiveItem:[true,false]
          };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
            "userInfo.birth":{
                handler(newValue){
                  this.userInfo.birth = this.dateFormat(newValue)
                }
            }
        },
        //方法集合",
        methods: {
          dateFormat(dateData) {
            var date = new Date(dateData)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            const time = y + '-' + m + '-' + d
            return time
          },
          submit(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var user_info = {
                  name:this.userInfo.name,
                  tel:this.userInfo.tel,
                  birth:this.userInfo.birth,
                  email:this.userInfo.email,
                  province:this.userInfo.province,
                  city:this.userInfo.city,
                  area:this.userInfo.area,
                  sex:this.userInfo.sex,
                }
                var that = this;
                axios({
                  url: 'api/user/addUserInfo',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:user_info
                }).then(function (response) {
                  if(response.data.code == 200){
                      that.$router.push("/")
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              } else {
                alert('error submit!!');
                return false;
              }
            });

          },
          onChangeProvince(a){
            console.log(a)
            this.userInfo.province = a.value
          },
          onChangeCity(a){
            console.log(a)
            this.userInfo.city = a.value
          },
          onChangeArea(a){
            console.log(a)
            this.userInfo.area = a.value
//            this.show=false
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
  .nav{
    width: 100px;
    background: #eee;
    height: 150px;
    text-align: center;
    padding-top: 100px;
  }
  select{
    width: 100px;
  }
  .right-title{
    margin-right:10px;
    width: 80px;
    text-align: right;
  }
  .right{
    display: flex;
  }
  .left{
    display: flex;
  }
  .left-title{
    width: 150px;
    text-align: right;
    margin-right: 19px;
  }
  .text-rol{
    display: flex;
    margin-top: 20px;
  }
  .item{
    display: none;
    width: 800px;
    position: absolute;
    top: 30px;
    left: 20%;
  }
  .activate{
    display: block;
  }
</style>

