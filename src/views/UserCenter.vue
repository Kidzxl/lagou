<template>
    <div>
      <navigation></navigation>
      <div class="context">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="个人信息" name="first">
            <div>张小龙</div>
            <div>职业信息</div>
            <div>个人介绍</div>
          </el-tab-pane>
          <el-tab-pane label="账号绑定" name="second">
            <div>
              <div>账号:17752607014</div>
              <div>绑定后，你可以同时使用以下方式登录拉勾</div>
            </div>
            <ul>
              <li>
                绑定邮箱账号
              </li>
              <li>

              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="third">
            <div>登录账号： 17752607014</div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input ></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import Navigation from "./navigation";

    export default {
        //import引入的组件需要注入到对象中才能使用",
        components: {Navigation},
      data() {
        return {
          activeName: 'first'
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
.context{
  width:600px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>

