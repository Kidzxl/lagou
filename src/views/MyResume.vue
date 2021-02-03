<template>
    <div>
      <navigation></navigation>
      <el-container >
        <el-header></el-header>
        <el-main  style="background: #fff;text-align: left;line-height: 2;">
          <div class="main">
            <div class="selfResume">
              <el-container>
                <el-header height="4%" style="padding: 0;">
                  <div>简历完整度100%</div>
                </el-header>
                <el-main style="text-align: left;line-height: 2;background: #fff;">
                  <div class="myresume">
                    <div class="resume-header">
                      <div class="title">个人信息</div>
                      <div >
                        <el-button type="primary" icon="el-icon-edit" circle @click="userInfoIsActive=false">编辑</el-button>
                      </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div v-if="!userInfoIsActive" style="background: #f5f5f5;">
                      <div class="w_title">编辑个人资料</div>
                      <div class="text-rol">
                        <div class="left">
                          <div class="left-title">姓名</div>
                          <el-input v-model="userInfoNew.name" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="right">
                          <div class="right-title">性别</div>
                          <div>
                            <el-radio v-model="userInfoNew.sex" label="男">男</el-radio>
                            <el-radio v-model="userInfoNew.sex" label="女">女</el-radio>
                          </div>
                        </div>
                      </div>
                      <div class="text-rol">
                        <div class="left">
                          <div class="left-title" style="width:100px;">生日</div>
                          <el-date-picker
                            v-model="userInfoNew.birth"
                            type="date"
                            placeholder="选择日期" >
                          </el-date-picker>
                          <!--<el-input v-model="userInfo_new.birth" placeholder="请输入内容"></el-input>-->
                        </div>
                        <div class="right">
                          <div class="right-title">所在城市</div>
                          <div>
                            <v-distpicker
                              :province="userInfoNew.province" :city="userInfoNew.city" :area="userInfoNew.area"
                              @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
                            ></v-distpicker>
                          </div>
                        </div>
                      </div>
                      <div class="text-rol">
                        <div class="left">
                          <div class="left-title">手机号码</div>
                          <el-input v-model="userInfoNew.tel" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="right">
                          <div class="right-title">联系邮箱</div>
                          <div>
                            <el-input type="email" v-model="userInfoNew.email" placeholder="请输入内容"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="text-rol">
                        <div class="left">
                          <div class="left-title" style="margin-left: -50px;"></div>
                          <div style="margin-bottom: 20px;">
                            <el-button type="success" @click="submitUserInfoNew(1)">确认</el-button>
                            <el-button type="success" @click="submitUserInfoNew(0)">取消</el-button>
                          </div>
                        </div>
                        <!--<div class="right">-->
                          <!--<div class="right-title">联系邮箱</div>-->
                          <!--<div>-->
                            <!--<el-input v-model="name" placeholder="请输入内容"></el-input>-->
                          <!--</div>-->
                        <!--</div>-->
                      </div>

                      <!--<el-date-picker type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>-->
                    </div>
                    <a id="user-info"></a>
                    <div class="user-info" v-if="userInfoIsActive">
                        <h2>姓名: {{userInfo.name}}</h2>
                        <table >
                          <tr>
                            <td >性别: {{userInfo.sex}}</td>
                            <td>生日: {{userInfo.birth}}</td>
                            <td>城市: {{userInfo.province}}-{{userInfo.city}}-{{userInfo.area}}</td>
                          </tr>
                          <tr>
                            <td colspan="2">联系方式:{{userInfo.tel}}</td>
                            <td colspan="2">邮箱:{{userInfo.email}}</td>
                          </tr>
                        </table>
                    </div>
                    <div class="kill">
                      <div class="resume-header">
                        <div class="title">个人技能</div>
                        <div >
                          <el-button type="primary" icon="el-icon-edit" circle @click="killActive=false">编辑</el-button>
                        </div>
                      </div>
                      <div class="editor" v-if="!killActive" style="padding:0;background-color: #eee">
                        <div>
                          <quill-editor ref="skillContentNew" v-model="skillContentNew" :options="editorOption" style="height: 200px;"></quill-editor>
                        </div>
                        <div class="left">
                          <div class="left-title" style="margin-left: -50px;"></div>
                          <div style="margin-bottom: 20px;">
                            <el-button type="success" @click="submitSkillNew(1)">确认</el-button>
                            <el-button type="success" @click="submitSkillNew(0)">取消</el-button>
                          </div>
                        </div>
                      </div>
                      <div class="editor" v-html="skillContent" v-if="killActive">
                      </div>
                    </div>
                    <a id="work"></a>
                    <div class="work">
                      <div class="resume-header">
                        <div class="title">工作经历</div>
                        <div>
                          <el-button type="primary" icon="el-icon-edit" circle @click="workActive=false;">添加</el-button>
                        </div>
                      </div>
                      <div class="work-div">
                        <div v-if="!workActive">
                          <el-form :model="workNew" ref="workNew" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="公司名称" prop="name">
                              <el-input v-model="workNew.companyName"></el-input>
                            </el-form-item>
                            <el-form-item label="公司部门" prop="region" >
                              <el-input v-model="workNew.companyDepartment" style="width: 30%;"></el-input>
                            </el-form-item>
                            <el-form-item label="职位名称" prop="region"  class="position" >
                              <el-input v-model="workNew.positionName"></el-input>
                            </el-form-item>
                            <el-form-item label="在职时间" required>
                              <el-col :span="11">
                                <el-form-item prop="date1">
                                  <el-date-picker type="date" placeholder="选择日期" v-model="workNew.workingTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                              </el-col>
                              <el-col :span="2">&nbsp;</el-col>
                              <el-col :span="8">
                                <el-form-item prop="date1">
                                  <el-date-picker type="date" placeholder="选择日期" v-model="workNew.departureTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="工作内容" prop="date1">
                              <quill-editor ref="workEditor" v-model="workNew.context" :options="editorOption" style="height: 200px;"></quill-editor>
                            </el-form-item>
                          </el-form>
                          <div class="left">
                            <div class="left-title" style="margin-left: -50px;"></div>
                            <div style="margin-bottom: 20px;">
                              <el-button type="success" @click="addWork()">确认</el-button>
                              <el-button type="success" @click="cancelWork()">取消</el-button>
                            </div>
                          </div>
                        </div>

                        <div v-if="workActive" v-for="(work,index) in works" class="info-item">
                          <div  class="info-item-btn">
                            <el-button type="primary" icon="el-icon-edit" circle @click="changeWork(index)">编辑</el-button>
                            <el-button type="primary" icon="el-icon-edit" circle @click="deleteWork(index)">删除</el-button>
                          </div>

                          <div>{{work.companyName}}</div>
                          <div style="clear: both;height:0px;"></div>
                          <div style="float: right;">{{work.companyDepartment}}-{{work.positionName}}</div>
                          <div>
                            <span>在职时间:</span>
                            <span>{{work.workingTime}}-{{work.departureTime}}</span>
                          </div>
                          <div style="clear: both;"></div>
                          <div>
                            <span>工作内容:</span>
                            <div style="padding-left:30px;" v-html="work.context"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a id="project"></a>
                    <div class="project">
                      <div class="resume-header">
                        <div class="title">项目经历</div>
                        <div >
                          <el-button type="primary" icon="el-icon-edit" circle @click="projectActive=false;">添加</el-button>
                        </div>
                      </div>
                      <div class="work-div">
                        <div v-if="!projectActive">
                          <el-form :model="projectNew"  ref="projectNew" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="项目名称" prop="name">
                              <el-input v-model="projectNew.projectName"></el-input>
                            </el-form-item>
                            <el-form-item label="项目职位" prop="region" >
                              <el-input v-model="projectNew.projectPosition" style="width: 30%;"></el-input>
                            </el-form-item>
                            <el-form-item label="项目链接" prop="region"  class="position" >
                              <el-input v-model="projectNew.projectLink"></el-input>
                            </el-form-item>
                            <el-form-item label="项目时间" required>
                              <el-col :span="11">
                                <el-form-item prop="date1">
                                  <el-date-picker type="date" placeholder="选择日期" v-model="projectNew.projectStartTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                              </el-col>
                              <el-col :span="2">&nbsp;</el-col>
                              <el-col :span="8">
                                <el-form-item prop="date1">
                                  <el-date-picker type="date" placeholder="选择日期" v-model="projectNew.projectEndTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="项目内容" prop="date1">
                              <quill-editor ref="projectEditor" v-model="projectNew.projectContext" :options="editorOption" style="height: 200px;"></quill-editor>
                            </el-form-item>
                          </el-form>
                          <div class="left">
                            <div class="left-title" style="margin-left: -50px;"></div>
                            <div style="margin-bottom: 20px;">
                              <el-button type="success" @click="addProject()">确认</el-button>
                              <el-button type="success" @click="cancelProject()">取消</el-button>
                            </div>
                          </div>
                        </div>
                        <div v-if="projectActive" v-for="(project,index) in projects" class="info-item">
                          <div  class="info-item-btn">
                            <el-button type="primary" icon="el-icon-edit" circle @click="changeProject(index)">编辑</el-button>
                            <el-button type="primary" icon="el-icon-edit" circle @click="deleteProject(index)">删除</el-button>
                          </div>

                          <div>{{project.projectName}}</div>
                          <div style="clear: both;height:0px;"></div>
                          <div style="float: right;">{{project.projectPosition}}-{{project.projectLink}}</div>
                          <div>
                            <span>在职时间:</span>
                            <span>{{project.projectStartTime}}-{{project.projectEndTime}}</span>
                          </div>
                          <div style="clear: both;"></div>
                          <div>
                            <span>工作内容:</span>
                            <div style="padding-left:30px;" v-html="project.projectContext"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a id="edu"></a>
                    <div class="edu">
                      <div class="resume-header">
                        <div class="title">教育经历</div>
                        <div >
                          <el-button type="primary" icon="el-icon-edit" circle @click="eduActive=false;">添加</el-button>
                        </div>
                      </div>
                      <div v-if="!eduActive">
                        <el-form :model="educationNew" ref="educationNew" label-width="100px" class="demo-ruleForm">
                          <el-form-item label="学校名称" prop="name">
                            <el-input v-model="educationNew.schoolName"></el-input>
                          </el-form-item>
                          <el-form-item label="学历" prop="region" >
                            <el-input v-model="educationNew.eduBackground" style="width: 30%;"></el-input>
                          </el-form-item>
                          <el-form-item label="在校时间" required>
                            <el-col :span="11">
                              <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="educationNew.startTime" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="8">
                              <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="educationNew.endTime" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="专业" prop="date1">
                            <el-input v-model="educationNew.majorName"></el-input>
                          </el-form-item>
                        </el-form>
                        <div class="left">
                          <div class="left-title" style="margin-left: -50px;"></div>
                          <div style="margin-bottom: 20px;">
                            <el-button type="success" @click="addEdu()">确认</el-button>
                            <el-button type="success" @click="cancelEdu()">取消</el-button>
                          </div>
                        </div>
                      </div>
                      <div v-if="eduActive" v-for="(edu ,index) in educations" class="info-item">
                        <div  class="info-item-btn">
                          <el-button type="primary" icon="el-icon-edit" circle @click="changeEdu(index)">编辑</el-button>
                          <el-button type="primary" icon="el-icon-edit" circle @click="deleteEdu(index)">删除</el-button>
                        </div>

                        <div>{{edu.schoolName}}</div>
                        <div style="clear: both;height:0px;"></div>
                        <div style="float: right;">{{edu.eduBackground}}</div>
                        <div>
                          <span>入学时间:</span>
                          <span>{{edu.startTime}}-{{edu.endTime}}</span>
                        </div>
                        <div style="clear: both;"></div>
                        <div>
                          <span>专业</span>
                          <div style="padding-left:30px;" v-html="edu.majorName"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-main>
              </el-container>
            </div>
            <div class="fileResume">
              <div style="display: flex;border: 1px solid #e6e6e6">
                <div>附件简历</div>
                <div>
                  <el-upload
                    class="upload-demo"
                    :show-file-list="false"
                    :action="url"
                    :on-remove="handleRemove"
                    :headers="headers"
                     :multiple="false"
                    :limit="3"
                    :on-success="successLoad"
                    >
                  <el-button type="primary" icon="el-icon-edit">添加</el-button>
                  </el-upload>
                  <div class="files">
                    <ul>
                      <li class="file-item" v-for="(file,index) in files">
                        <span @click="openFile(index,false)">{{file.fileName}}</span>
                        <el-button  icon="el-icon-bottom" circle class="but" @click="openFile(index,true)">下载</el-button>
                        <el-button  icon="el-icon-delete" circle class="but-delete"  @click="deleteFile(index)"></el-button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style="margin-top: 50px;border: 1px solid #e6e6e6;">
                <div class="item">
                  <i class="el-icon-user-solid"></i>
                  <a href="#edu">个人信息</a>
                </div>
                <div  class="item">
                  <i class="el-icon-s-order"></i>
                  <a href="#edu">个人技能</a>
                </div>
                <div  class="item">
                  <i class="el-icon-wallet"></i>
                  <a href="#edu">工作经历</a>
                </div>
                <div  class="item">
                  <i class="el-icon-notebook-1"></i>
                  <a href="#edu">教育经历</a>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer>
          <foot></foot>
        </el-footer>
      </el-container>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor';
  import Navigation from "./navigation.vue"
  import Foot from "./foot.vue"
  import Editor from './Editor.vue'
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main";
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main";
  import VDistpicker from 'v-distpicker'
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Qs from 'qs'

    export default {
        //import引入的组件需要注入到对象中才能使用",
        components: {
          ElFormItem,
          Editor,
          VDistpicker,
          ElMain,
          ElHeader,
          ElContainer,
          Navigation,
          quillEditor,
          Foot,
        },
      props: {
        title: {
          type: String,
          default: 'hello world'
        }
      },
        data() {
          var token = window.sessionStorage.getItem('token');
            //这里存放数据",
            return {
              resumeId:"",
              userInfoIsActive:true, //显示userInfo
              killActive:true,
              changeWorkFlag:-1,
              workActive:true,
              projectActive:true,
              changeProjectFlag:-1,
              eduActive:true,
              changeEduFlag:-1,
              userInfo:"",
              userInfoNew :{
                  name:"",
                  tel:"",
                  email:"",
                  birth:"",
                  sex:"",
                  province:"",
                  city:"",
                  area:"",

                },
              skillContent:"",
              skillContentNew: '',
              editorOption: {
                modules:{
                  toolbar:[// toggled buttons
                    [{ 'list': 'ordered'}, { 'list': 'bullet'},],
                  ]
                },
                placeholder:"insert text here..",
              },
              works:[],
              workNew:{
                companyName:"",
                companyDepartment:"",
                positionName:"",
                workingTime:"",
                departureTime:"",
                context:""
              },
              projects:[
              ],
              projectNew:{
                projectName:"",
                projectPosition:"",
                projectLink:"",
                projectStartTime:"",
                projectEndTime:"",
                projectContext:"",
              },
              educations:[
              ],
              educationNew:{
                schoolName:"",
                eduBackground:"",
                startTime:"",
                endTime:"",
                majorName:"",
              },
              url:"http://localhost:8081/api/resume/file/upload",
              headers:{
                  "token":token,
              },
              files:[],
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
          "userInfoNew.birth":{
            handler(newValue){
              this.userInfoNew.birth = this.dateFormat(newValue)
            }
          },
          "workNew.workingTime":{
            handler(newValue){
              this.workNew.workingTime = this.dateFormat(newValue)
            }
          },
          "workNew.departureTime":{
            handler(newValue){
              this.workNew.departureTime = this.dateFormat(newValue)
            }
          },
          "projectNew.projectStartTime":{
            handler(newValue){
              this.projectNew.projectStartTime = this.dateFormat(newValue)
            }
          },
          "projectNew.projectEndTime":{
            handler(newValue){
              this.projectNew.projectEndTime = this.dateFormat(newValue)
            }
          },
          "educationNew.startTime":{
            handler(newValue){
              this.educationNew.startTime = this.dateFormat(newValue)
            }
          },
          "educationNew.endTime":{
            handler(newValue){
              this.educationNew.endTime = this.dateFormat(newValue)
            }
          },
        },

        //方法集合",
        methods: {
          cancelEdu(){
            this.educationNew = {
              schoolName:"",
              eduBackground:"",
              startTime:"",
              endTime:"",
              majorName:"",
            }
            this.eduActive=true;
          },
          addEdu(){
            if(this.changeEduFlag == -1){
              var that = this;
              var education = this.educationNew;
              education['resumeId'] = this.resumeId;
              console.log(education)
              axios({
                url: 'api/resume/edu/insert',
                method: 'post',
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return Qs.stringify(data)
                }],
                data:education,
              }).then(function (response) {
                console.log(response)
                if(response.data.code == 200){
                  that.openSuccess("填加成功");
                  education.id = response.data.result.data.id;
                  delete education.resumeId;
                  that.educations.push(education);
                }
              }).catch(function (error) {
                console.log(error);
              })

            }else{
              var education = this.educationNew;
              education.id = this.educations[this.changeEduFlag].id;
              axios({
                url: 'api/resume/edu/update',
                method: 'post',
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return Qs.stringify(data)
                }],
                data:education,
              }).then(function (response) {
                console.log(response)
                if(response.data.code == 200){
                  that.openSuccess("更新成功");
                  delete this.educationNew.id;
                  this.educations[this.changeEduFlag] = this.educationNew;
                  this.changeEduFlag = -1;
                }
              }).catch(function (error) {
                console.log(error);
              })

            }
            this.educationNew = {
              schoolName:"",
              eduBackground:"",
              startTime:"",
              endTime:"",
              majorName:"",
            }
            this.eduActive=true;
          },
          deleteEdu(index){
            var that = this;
            let eduId = this.educations[index].id;
            axios({
              url: 'api/resume/edu/delete',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:{eduId:eduId},
            }).then(function (response) {
              if(response.data.code == 200){
                that.openSuccess("删除成功");
                that.educations.splice(index, 1)
              }
            }).catch(function (error) {
              console.log(error);
            })

          },
          changeEdu(index){
            this.changeEduFlag= index;
            this.eduActive=false;
            this.educationNew = this.educations[index];
          },
          cancelProject(){
            this.projectNew = {
              projectName:"",
              projectPosition:"",
              projectLink:"",
              projectStartTime:"",
              projectEndTime:"",
              projectContext:"",
            }
            this.projectActive=true;
          },
          addProject(){
              if(this.changeProjectFlag == -1){
                var that = this;
                var project = this.projectNew;
                project['resumeId'] = this.resumeId;
                axios({
                  url: 'api/resume/project/insert',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:project,
                }).then(function (response) {
                  console.log(response)
                  if(response.data.code == 200){
                    that.openSuccess("填加成功");
                    project.id = response.data.result.data.id;
                    delete project.resumeId;
                    that.projects.push(project);
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              }else{
                var project = this.projectNew;
                project.id = this.projects[this.changeProjectFlag].id;
                axios({
                  url: 'api/resume/project/update',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:project,
                }).then(function (response) {
                  console.log(response)
                  if(response.data.code == 200){
                    that.openSuccess("更新成功");
                    delete this.projectNew.id;
                    this.projects[this.changeProjectFlag] = this.projectNew;
                    this.changeProjectFlag = -1;
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              }
            this.projectNew = {
              projectName:"",
              projectPosition:"",
              projectLink:"",
              projectStartTime:"",
              projectEndTime:"",
              projectContext:"",
            }
            this.projectActive=true;
          },
          deleteProject(index){
            var that = this;
            let projectId = this.projects[index].id;
            axios({
              url: 'api/resume/project/delete',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:{projectId:projectId},
            }).then(function (response) {
              if(response.data.code == 200){
                that.openSuccess("删除成功");
                that.projects.splice(index, 1)
              }
            }).catch(function (error) {
              console.log(error);
            })
          },
          changeProject(index){
            this.changeProjectFlag= index;
            this.projectActive=false;
            this.projectNew = this.projects[index];
          },
          cancelWork(){
            this.workNew = {
              companyName: "",
              companyDepartment: "",
              positionName: "",
              workingTime: "",
              departureTime: "",
              context: ""
            }
            this.workActive=true;
          },
          addWork(){
            if(this.changeWorkFlag == -1){
              var that = this;
              var work = this.workNew;
              work['resumeId'] = this.resumeId;
              axios({
                url: 'api/resume/work/insert',
                method: 'post',
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return Qs.stringify(data)
                }],
                data:work,
              }).then(function (response) {
                  console.log(response)
                if(response.data.code == 200){
                    that.openSuccess("填加成功");
                  work.id = response.data.result.data.id;
                  delete work.resumeId;
                  that.works.push(work);
                }
              }).catch(function (error) {
                console.log(error);
              })
            }
            else{
              var work = this.workNew;
              work.id = this.works[this.changeWorkFlag].id;
              axios({
                url: 'api/resume/work/update',
                method: 'post',
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return Qs.stringify(data)
                }],
                data:work,
              }).then(function (response) {
                console.log(response)
                if(response.data.code == 200){
                  that.openSuccess("更新成功");
                  delete this.workNew.id;
                  this.works[this.changeWorkFlag] = this.workNew;
                  this.changeWorkFlag = -1;
                }
              }).catch(function (error) {
                console.log(error);
              })
            }
            this.workNew = {
              companyName: "",
              companyDepartment: "",
              positionName: "",
              workingTime: "",
              departureTime: "",
              context: ""
            }
            this.workActive=true;
          },
          deleteWork(index){
            var that = this;
            let workId = this.works[index].id;
            axios({
              url: 'api/resume/work/delete',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:{workId:workId},
            }).then(function (response) {
              if(response.data.code == 200){
                that.openSuccess("删除成功");
                that.works.splice(index, 1)
              }
            }).catch(function (error) {
              console.log(error);
            })
          },
          changeWork(index){
            this.changeWorkFlag = index;
            this.workActive=false;
            this.workNew = this.works[index];
          },
          submitUserInfoNew(ok){
              if ( ok == 1){
                var that = this;
                var userInfo = this.userInfoNew;
                axios({
                  url: 'api/user/updateUserInfo',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:userInfo,
                }).then(function (response) {
                  console.log(response)
                  if(response.data.code == 200){
                    that.openSuccess("更新成功");
                    that.userInfo = that.userInfoNew;
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              }else{
                  this.userInfoNew = this.userInfo;
              }
              this.userInfoIsActive=true;
            },
          submitSkillNew(ok){
              if ( ok == 1){
                  var that = this;
                  var skill = this.skillContentNew;
                axios({
                  url: 'api/resume/user/skill',
                  method: 'post',
                  transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return Qs.stringify(data)
                  }],
                  data:{skill:skill},
                }).then(function (response) {
                  console.log(response)
                  if(response.data.code == 200){
                    that.openSuccess("更新成功");
                    that.skillContent = that.skillContentNew;
                  }
                }).catch(function (error) {
                  console.log(error);
                })
              }else{
                  this.skillContentNew = this.skillContent;
              }
              this.killActive=true
            },
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
          openSuccess(msg) {
            var date = "修改成功"
            if(msg != ""){
                date = msg;
            }
            this.$message({
              message: date,
              type: 'success'
            });
          },
          onChangeProvince(a){
            this.userInfoNew.province = a.value
          },
          onChangeCity(a){
            this.userInfoNew.city = a.value
          },
          onChangeArea(a){
            this.userInfoNew.area = a.value
//            this.show=false
          },
          onEditorChange({ editor, html, text }) {
            console.log(html)
            this.content = html;
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          getResumeAll(){
              /*
                获取完整简历
               */
              var that = this;
              axios.get('api/resume/getAll',{
//                params:{uid:this.user.uid},
              }) .then(function (response) {
                  console.log(response);
                if(response.data.code != '-1'){
                  let result = response.data.result;
                  if(result.code == 200){
                    let resumeAll = result.data.resumeAll;
                    that.resumeId =resumeAll.resume.id;
                    that.userInfo = resumeAll.userInfo;
                    that.userInfoNew = resumeAll.userInfo;
                    that.skillContent = resumeAll.resume.skill;
                    that.works = resumeAll.works;
                    that.educations = resumeAll.educations;
                    that.projects = resumeAll.projects;
                    for(var i =0 ; i<result.data.resumeFiles.length;i++){
                        delete result.data.resumeFiles[i].userId;
                    }
                    that.files = result.data.resumeFiles;
                  }
                }else{
                    alert("请先登录")
                    that.$router.push("login")
                }

              }).catch(function (error) {
              });
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
          successLoad(response, file, fileList){
            console.log(file)
            var that = this;
            axios({
              url: 'api/resume/file/insert',
              method: 'post',
              transformRequest: [function (data) {
              // 对 data 进行任意转换处理
               return Qs.stringify(data)
              }],
              data:{fileName:file.name}
              }).then(function (response) {
                  var f = {
                      id:response.data.result.data.id,
                    fileName:file.name,
                  }
                that.files.push(f)
              }).catch(function (error) {
              console.log(error);
            })
          },
          openFile(index,flag){
            var that = this;
            var fileName = this.files[index].fileName;
            axios.get('api/resume/file/download',{
              params:{flag:flag,fileName:fileName},
            }) .then(function (response) {
              console.log(response)
              var url = response.data
              window.open(url)
            }).catch(function (error) {
            });
          },
          deleteFile(index){
            var that = this;
            axios({
              url: 'api/resume/file/delete',
              method: 'post',
              transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
              }],
              data:that.files[index],
            }).then(function (response) {
                that.files.splice(index,1);
            }).catch(function (error) {
              console.log(error);
            })
          },
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
          this.getResumeAll();
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
  /*ol li{*/
    /*list-style: decimal !important;*/
  /*}*/
  .files li span{
    cursor:pointer;
  }
  .files li {
    list-style:none;
  }
  .but-delete:active{
    background-color: #fff;
  }
  .but-delete:focus{
    background-color: #fff;
  }
  .but-delete:hover{
    background-color: #fff;
  }
  .but:active{
    background-color: #fff;
  }
  .but:focus{
    background-color: #fff;
  }
  .but:hover{
    background-color: #fff;
  }
  .but{
    border: 0px solid #DCDFE6;
  }
  .title{

  }
  .info-item:hover .info-item-btn{
    display: block;
  }
  .info-item:hover{
    -webkit-box-shadow: #ccc 3px 3px 3px;
    -moz-box-shadow: #ccc 3px 3px 3px;
    box-shadow: #ccc 3px 3px 3px;
  }
  .info-item-btn{
    float: right;
    display: none;
  }
  .info-item{
    padding:10px;
    border: 1px solid #eee;
    margin-bottom: 20px;
  }
  tr{
    height: 70px;
  }
  td{
    width: 250px;
  }
  .item:hover{
    /*opacity: 1 #00b88d;*/
    background: #bfeee2;
  }
  .item{
    padding-left: 50px;
    color: #000000;
    height: 50px
  }
  .work-div{
    padding-top: 20px;
    /*background: #e6d0d0;*/
    padding-right: 56px;
    position: relative;
  }
  .position{
    position: absolute;
    top: 15.5%;
    left: 54.5%;
  }
  .ql-container{
    height: 75%;
  }
  .editor{
    padding-left: 30px;
    padding-top: 10px;
    list-style: decimal;
    /*background: bisque;*/
    min-height: 100px;
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
  .el-button--primary{
    background: #fff;
    color:#02B28A;
    border-color: #fff;
}

  .el-button--primary:hover{
    background: #fff;
    color: #02b29f;
    border-color: #fff;
  }
  .el-button--primary:focus {
    background: #fff;
    color: #02b29f;
    border-color: #fff;
  }
  .el-button--primary:active{
    background: #fff;
    color: #02b29f;
    border-color: #fff;
  }

.resume-header{
display: flex;
margin-top:20px;
}
.title{
  border-left:3px solid #00B38A;
flex: 1;
  padding-left:10px;
}
.main{
display: flex;
margin: 0 auto;
width: 1216px;
/* margin-bottom: 100px; */
    /*background: red;*/
    /*height: 100%;*/
  }
  .el-main{
    text-align: left;
    background: #fff;
    padding:0;
  }
  .selfResume{
    width: 65%;
    height: 100%;
  }
  .fileResume{
    padding-left:20px;
    /*flex: 1;*/
    /*background: #2c6cac;*/
     width: 35%;
    height: 100%;
  }
  .myresume{
    height: 100%;
    border: 1px solid #eee;
  }
  .user-info{
    height: 200px;
    background: #F8F9FB;
  }
  .kill{
    width: 100%;
    /*background-color: beige;*/
  }
</style>

