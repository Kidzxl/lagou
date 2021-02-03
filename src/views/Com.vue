<template>
    <div>
      <input type="file" ref="file">
      <button @click="getFile()">提交</button>
      <button @click="download()">下载</button>
    </div>
</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
    export default {
        name:"Com",
        //import引入的组件需要注入到对象中才能使用",
        component: {},
        data() {
            //这里存放数据",
            return {
              file:"",
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {

        },
        //方法集合",
        methods: {
          getFile(){
            var file = this.$refs.file.files
            let formData = new FormData();
            formData.append("file", file[0]);
            console.log(file)
            console.log(formData)
            axios.post(
              "api/file/upload",
              formData
            )
              .then(res=>{
                console.log("请求成功时",res)
                //请求成功是返回数据
              })
              .catch(err=>{
                console.log("请求失败",err)
                //请求失败返回原因
              })

          },
          download(){
            axios.get('api/file/get',{
              params:{flag:false,file:"张小龙.pdf"},
              }) .then(function (response) {
              var url = response.data;
              window.open(response.data);
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

</style>

