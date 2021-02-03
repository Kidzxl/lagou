<template>
    <div id="zhaopinDetail">

      <el-table
        :data="jobs"
        style="width: 100%"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.userDeliveries"
              stripe
              style="width: 40%;">
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="resumeName"
                label="简历"
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                label="状态">
                  <template slot-scope="soup" style="position:relative;">
                      <div style="display: inline-block">
                        <el-select  placeholder="请选择" v-model="soup.row.state" style="width: 180px;">
                          <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                          </el-option>
                        </el-select>
                      </div>
                      <div style="position: absolute;top:30%;left:70%;  cursor:pointer;" @click="changeState(soup.row.userId,soup.row.state)">保存</div>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="日期"
          width="180">
        </el-table-column>

        <el-table-column
          prop="positionTitle"
          label="职位名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="workState"
          label="工作状态">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'
  import Foot from "./foot";
    export default {
        //import引入的组件需要注入到对象中才能使用",
        name:"ZhaopinDetail",
        components: {},
        data() {
            //这里存放数据",
          return {
            jobs:[],
            bj:false,
            state:"",
            options:["投递成功","不合适","被查看","待沟通"]
          }
        },
      methods: {
        changeState(userId,state){
          let data = {
            userId:userId,
            state:state,
          }
          axios({
            url: 'api/deliver/update',
            method: 'post',
            transformRequest: [function (data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data)
            }],
            data:data
          }).then(function (response) {
            alert("修改成功")
          }).catch(function (error) {
            console.log(error);
          })

        },
        init(){
          let that = this;
          axios.get('api/job/jobdelivery',{
          }) .then(function (response) {
             that.jobs = response.data.result.data.jobs;
          }).catch(function (error) {
          });
        }
      },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
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

