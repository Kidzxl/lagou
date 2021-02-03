<template>
    <div style="" class="join-div">
      <el-form ref="recruit" :model="recruit" label-width="100px" :inline="true">
        <el-form-item label="岗位名称">
          <el-input v-model="recruit.positionTitle"></el-input>
        </el-form-item>
        <el-form-item label="工作部门">
          <el-input v-model="recruit.positionDepartment"></el-input>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input v-model="recruit.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="岗位薪资">
          <el-input v-model="recruit.pay"></el-input>
        </el-form-item>
        <div style="margin-left: 30px;" >
          <span>工作经验</span>
          <el-select v-model="recruit.experienceId" filterable placeholder="请选择" style="margin-left: 15px;">
            <el-option
              v-for="(item,index) in experiences"
              :key="index"
              :label="item.experienceCondition"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div style="position:absolute;overflow:hidden;top: 126px;left: 342px;">
          <span style="width: 67px;
    display: inline-block;
  padding-left:10px;">学历</span>
          <el-select v-model="recruit.eduBackgroundId" filterable placeholder="请选择" >
            <el-option
              v-for="(item,index) in eduBackgrounds"
              :key="index"
              :label="item.eduCondition"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div  class="p-lable">
          <span style="">公司标签</span>
          <el-select v-model="classifyList"  :multiple-limit="4" multiple placeholder="请选择" style="margin-left: 15px;">
            <el-option-group
              v-for="(group,index) in classify"
              :key="index"
              :label="group.type">
              <el-option-group
                v-for="(childGroup,index) in group.child"
                :key="index"
                :label="childGroup.type">
                  <el-option
                  v-for="(item,index) in childGroup.child"
                  :key="index"
                  :label="item.type"
                  :value="item.id">
                  </el-option>
              </el-option-group>
            </el-option-group>
          </el-select>
        </div>
        <el-form-item label="简历邮箱" style="margin-top: 20px;" class="email-ipt">
          <el-input type="email"  v-model="recruit.receptionEmail"></el-input>
        </el-form-item>
        <div class="state">
          <el-radio v-model="recruit.workState" label="全职" border style="padding-right:17px;margin-right:0px;">全职</el-radio>
          <el-radio v-model="recruit.workState" label="兼职" border style="padding-right:17px;margin-right:0px;">兼职</el-radio>
          <el-radio v-model="recruit.workState" label="实习" border style="padding-right:17px;margin-right:0px;">实习</el-radio>
        </div>
        <div class="edi">
          <span class="edi-title">职位诱惑</span>
          <quill-editor ref="tempt" v-model="recruit.tempt" :options="editorOption" style="height: 100px;"></quill-editor>
        </div>
        <div class="edi" style="height:230px;">
          <span class="edi-title">职位描述</span>
          <quill-editor ref="context" v-model="recruit.context" :options="editorOption" style="height: 150px;"></quill-editor>
        </div>
        <div class="submit">
          <el-button type="success" @click="submitPosition">发布</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor';
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import Editor from './Editor.vue'
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        name:"Join",
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ElInput,
          ElFormItem,
          Editor,
        },
      props: {
        title: {
          type: String,
          default: 'hello world'
        }
      },
        data() {
            //这里存放数据",
          return {
            radio1:"",
            content: '',
            positionContent: '',
            editorOption: {
              modules:{
                toolbar:[// toggled buttons
                  [{ 'list': 'ordered'}, { 'list': 'bullet'},],
                ]
              },
              placeholder:"insert text here..",
            },
            eduBackgrounds:[],
            experiences:[],
            classify:[],
            classifyList:"",
            recruit:{
              eduBackgroundId:"",
              experienceId:"",
              positionTitle:"",
              positionDepartment:"",
              pay:"",
              addressDetail:"",
              workState:"",
              receptionEmail:"",
              context:"",
              tempt:"",
            },
          };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {},
        //方法集合",
        methods: {
          submitPosition(){
              var that = this;
              var data = that.recruit
            if(data.experienceId == ""){
                  delete data.experienceId;
            }
            if(data.eduConditionId == ""){
                  delete data.eduConditionId;
            }
            data.classifyList =JSON.stringify(this.classifyList)
            axios({
              url: 'api/recruit/addPosition',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:data,
            }).then(function (response) {
                if(response.data.result.data.id !=-1){
                  alert("成功")
                  that.recruit = {
                    eduBackgroundId:"",
                      experienceId:"",
                      positionTitle:"",
                      positionDepartment:"",
                      pay:"",
                      addressDetail:"",
                      workState:"",
                      receptionEmail:"",
                      context:"",
                      tempt:"",
                  };
                }else{
                  alert("失败")
                }
//              }else{
//                alert("请先登录")
//                that.$router.push("login")
//              }

            }).catch(function (error) {
              console.log(error);
            })
          },
          getExperienceConditions(){
            var that = this;
            axios.get('api/recruit/getExperience',{
            }) .then(function (response) {
              that.experiences = response.data.result.data.experiences;
            }).catch(function (error) {
            });
          },
          getEduConditions(){
            var that = this;
            axios.get('api/recruit/getEduCondition',{
            }) .then(function (response) {
              that.eduBackgrounds = response.data.result.data.eduBackgrounds;
            }).catch(function (error) {
            });
          },
          getClassify(){
            var that = this;
            axios.get('api/classify/get',{
            }) .then(function (response) {
              that.classify = response.data.result.data.classify;
            }).catch(function (error) {
            });
          },
          init(){
            this.getEduConditions();
            this.getExperienceConditions();
            this.getClassify();
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
          let token = window.sessionStorage.getItem("token");
          console.log(token)
          if(token == null){
            alert("请先登录")
            this.$router.push("login")
          }
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
  a{

  }
  .submit{
    margin-left: 80%;
  }
  .state{
    position: absolute;
    top: 245px;
    left: 352px;
  }
  .p-lable{
    margin-left:30px;
    margin-top: 20px;
  }
  .p-lable input{
    width:520px !important;
  }
  .edi{
    overflow:hidden;
    width: 600px;
    height:190px;
    padding-left: 30px;
  }
  .edi-title{
    display: inline-block;
    margin-bottom: 15px;
  }
  .join-div{
    font-size: 14px;
    position: relative;
    width:700px;
    margin: 0 auto;
    margin-top: 2%;
  }
  .join-div input{
    width:200px;
  }
  .email-ipt input{
    width:200px;
  }
</style>

