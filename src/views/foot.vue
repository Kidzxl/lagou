<template>
    <div id="foot">
      <div class="foot-item">
        <table style="width:100%;text-align: center">
          <tr>
            <th>企业服务</th>
            <th>用户帮助</th>
            <th>联系方式</th>
          </tr>
          <tr>
            <td>招聘强人宝典</td>
            <td>用户协议</td>
            <td>服务热线:暂无</td>
          </tr>
          <tr>
            <td>公司搜索</td>
            <td>隐私政策</td>
            <td>企业服务邮箱:暂无</td>
          </tr>
          <tr>
            <td>系统App</td>
            <td>在线提问</td>
            <td>联系我们</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>

    export default {
        //import引入的组件需要注入到对象中才能使用",
      name:"Foot",
        components: {},
        data() {
            //这里存放数据",
            return {};
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
        methods: {},
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
  .foot-item{
    width:50%;
    margin: 0 auto;
    margin-top:100px;
    /*background-color: bisque;*/
  }
  tr{
    height:40px;
  }

</style>

