<template>
    <div>
      <navigation></navigation>
      <el-container>
        <el-header height="5%" style="background-color: #F2F5F4;">
          <div class="search-title" style="display: flex;">
            <div class="search-title-item">职位</div>
            <div class="search-title-item" style="margin-left: 20px">公司</div>
          </div>
          <div class="search">
            <div class="search-text">
              <el-input  placeholder="请输入职位" style="height:90px;width: 60%;
    display: inline-block;" v-model="jobTitle"> </el-input>
              <el-button type="primary" icon="el-icon-search" @click="getSearchData(1)">搜索</el-button>
            </div>
          </div>
        </el-header>
        <el-main  style="background: #fff;line-height: 1;line-height: 1;text-align: left;padding: 0;height: 95%;overflow:hidden;">
          <div class="search-condition">
            <ul class="search-ul" >
              <!--地点-->
              <li class="search-item">
                <div style="display:flex;">
                  <div style="padding-top:5px;">工作地点:</div>
                  <div style="width: 83%;">
                    <div style="display: inline-block;height:16px;padding:2px;margin-left: 15px;border: 1px solid #eee;
                    background-color: #fff">
                      <span v-if="condition.address==null">全国</span>
                      <span v-else>{{condition.address}}</span>
                    </div>
                    <el-radio-group v-model="condition.address">
                      <el-radio-button class="item" :label="null">全国</el-radio-button>
                      <el-radio-button class="item" :label="item" v-for="(item,index) in address" :key="index" ></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div style="clear: both;"></div>
                  <!-- Customize region toggle -->
                  <v-region type="group"  @values="regionChange" :area="false" :town="false">
                    <template #default="{ region, show }">
                      <div style="margin-left: 27px;    margin-top: 5px;">
                        更多
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                    </template>
                  </v-region>
                </div>
              </li>
              <li class="search-item">
                <div style="display:flex;">
                  <div>经验要求:</div>
                  <div style="width: 80%;">
                    <el-radio-group v-model="condition.experienceId">
                      <el-radio-button class="item" :label="null">不限</el-radio-button>
                      <el-radio-button class="item" :label="item.id" v-for="(item,index) in experiences" :key="index" >{{item.experienceCondition}}</el-radio-button>
                    </el-radio-group>
                  </div>
                  <!-- Customize region toggle -->
                </div>
              </li>
              <li class="search-item">
                <div style="display:flex;">
                   <div>学历要求:</div>
                  <div style="width: 80%;">
                    <el-radio-group v-model="condition.eduBackgroundId">
                      <el-radio-button class="item" :label="null">不限</el-radio-button>
                      <el-radio-button class="item" :label="item.id" v-for="(item,index) in eduBackgrounds" :key="index" >{{item.eduCondition}}</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </li>
              <li class="search-item">
                <div style="display:flex;">
                  <div>公司规模:</div>
                  <div style="width: 80%;">
                    <el-radio-group v-model="condition.scaleId">
                      <el-radio-button class="item" :label="null">不限</el-radio-button>
                      <el-radio-button class="item" :label="item.id"  v-for="(item,index) in scales" :key ="index" >{{item.numCondition}}</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </li>
              <li class="search-item">
                <div class="gm">
                  <div >公司领域:</div>
                  <div class="last-more">
                    更多
                    <i class="el-icon-caret-bottom" style="float: right;"></i>
                    <div class="more-li">
                      <div style="clear: both;"></div>
                      <div class="more" >
                        <el-radio-group v-model="condition.domainId">
                           <el-radio-button class="item" :label="item.id" v-for="(item,index) in doMains" :key ="index" v-if="index>8" >{{item.fieldName}}</el-radio-button>
                        </el-radio-group>
                      </div>
                    </div>
                    <div style="clear: both;"></div>
                  </div>
                  <div class="group-div">
                    <el-radio-group v-model="condition.domainId">
                      <el-radio-button class="item" :label="null">不限</el-radio-button>
                      <el-radio-button class="item" :label="item.id"   v-for="(item,index) in doMains" :key ="index" v-if="index<=8" >{{item.fieldName}}</el-radio-button>
                    </el-radio-group>

                  </div>
                </div>
              </li>
            </ul>

          </div>
          <div class="context">
            <ul v-if="searchData.length!=0">
              <li v-for="(data,index) in searchData" :key="index" style="margin-bottom: 20px;">
                <div class="list-item-top">
                  <div class="info">
                    <div class="top">
                      <div class="context-title">
                        <a :href="'job?jobId='+data.searchData.id" class="company-name">{{data.searchData.positionTitle}}</a>
                      </div>
                      <span class="context-time">{{data.searchData.time}}发布</span>
                    </div>
                    <div class="bottom">
                      <div style="color:red;">{{data.searchData.pay}}</div>
                      <div style="margin-left: 30px;">{{data.searchData.experienceCondition}} / {{data.searchData.eduCondition}}</div>
                    </div>
                  </div>
                  <div class="company">
                    <div class="company-name">
                      {{data.searchData.name}}
                    </div>
                    <div class="other-info">
                      <span v-for="(domain,index) in data.domains" :key="index"> {{domain}} </span>
                       / {{data.searchData.numCondition}}
                    </div>
                  </div>
                  <div class="log">
                    <img :src="data.searchData.logo" :alt="data.searchData.name" width="100" height="80">
                  </div>
                </div>
                <div class="list-item-bot" v-html="data.searchData.tempt">
                </div>
              </li>
            </ul>

            <div v-else>
              暂无数据
            </div>
          </div>
        </el-main>
        <foot></foot>
      </el-container>

    </div>
</template>

<script>
    import Navigation from "./navigation.vue"
    import ElMain from "../../node_modules/element-ui/packages/main/src/main";
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Qs from 'qs'
    import ElRadioButton from "../../node_modules/element-ui/packages/radio/src/radio-button";
    import Foot from "./foot";

    export default {
        //import引入的组件需要注入到对象中才能使用",
        name:'Position',
        components: {
          Foot,
          ElRadioButton,
          ElMain,
          Navigation,
        },
        data() {
            //这里存放数据",
            return {
              eduBackgrounds: [],
              experiences: [],
              scales: [],
              doMains: [],
              more: false,
              address: ["北京", "上海", "深圳", "广州", "杭州", "成都", "武汉", "西安", "厦门", "长沙", "苏州", "天津", "南京"],
              condition: {
                experienceId: null,
                eduBackgroundId: null,
                scaleId: null,
                domainId: null,
                address: null,
              },
              active:false,
              searchData:[],
              jobTitle: null,
              jobTitleSubmit:null,
            };
        },
        //监听属性 类似于data概念",
        computed: {},
        //监控data中的数据变化",
        watch: {
            condition:{
              handler(newValue,oldValue){
                if(this.active){
                  this.getSearchData(0);
                }

              },
              deep: true,
            },
        },
        //方法集合",
        methods: {

          setCondition(){
            let data = this.$route.query;
            console.log(data.jobTitle)
            console.log('jobTitle' in data)
            if(data.jobTitle == "null" || 'jobTitle' in data == false){
                this.jobTitle = null
                this.jobTitleSubmit = null
            }else{
              this.jobTitle = data.jobTitle
              this.jobTitleSubmit = data.jobTitle
            }
            if(data.domainId == "null" || 'domainId' in data == false){
              this.condition.domainId = null
            }else{
              this.condition.domainId = data.domainId
            }
            if(data.eduBackgroundId == "null" || 'eduBackgroundId' in data == false){
              this.condition.eduBackgroundId = null
            }else{
              this.condition.domainId = data.domainId
            }

            if(data.experienceId == "null" || 'experienceId' in data == false){
              this.condition.experienceId = null
            }else{
              this.condition.domainId = data.experienceId
            }

            if(data.scaleId == "null" || 'scaleId' in data == false){
              this.condition.scaleId = null
            }else{
              this.condition.domainId = data.scaleId
            }
            if(data.address == "null" || 'address' in data == false){
              this.condition.address = null
            }else{
              this.condition.domainId = data.address
            }
            this.getSearchData(0);
            this.active = true;
          },
          getSearchData(f){
            var data = this.condition;
              if(f==0){
                data.jobTitle = this.jobTitleSubmit;
              }else{
                this.jobTitleSubmit = this.jobTitle;
                data.jobTitle = this.jobTitle;
              }
            var that = this;
            axios.get('api/search/get',{
              params:data,
            }) .then(function (response) {
              console.log(response)
              that.searchData = response.data.result.data.searchJobs;
            }).catch(function (error) {
            });
          },
          unShowMore(){
            this.more = false;
          },
          showMore(){
            this.more = true;
          },
          getCondition(){
            var that = this;
            axios.get('api/search/getCondition',{
            }) .then(function (response) {
              that.eduBackgrounds = response.data.result.data.eduBackgrounds;
              that.experiences = response.data.result.data.experiences;
              that.scales = response.data.result.data.scales;
              that.doMains = response.data.result.data.doMains;
            }).catch(function (error) {
            });
          },
          regionChange(data){
            console.log(data);
            if(data.city != null){
                this.condition.address = data.city.value;
            }
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
          this.getCondition();
          this.setCondition();
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
  .gm{
    position: relative;
    display:flex;
  }
  .search-ul{
   border: 1px solid #e6e6e6;
    background: #F2F5F4;
    padding: 15px;
  }
  .more-li{
    float: right;
  }
  .more span {
    margin-bottom: 5px;
  }
  .more{
    text-align: left;
    top:30px;
    padding-bottom: 10px;
    left:-831px;
    width: 820px;
    padding-left:80px;
    background:  #F2F5F4;
    position: absolute;
    display: none;
  }
  .last-more{
    cursor: pointer;
    text-align: right;
    width:50px;
    height: 40px;
    /*background-color: red;*/
    display: inline-block;
    position: absolute;
    left: 94%;
  }
  .group-div{
    width: 75%;
    position: relative;
  }
  .last-more:hover .more{
    display: inline-block !important;
  }

  li{
    list-style: none;
  }
  .company-name{
    display: inline-block;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #00b38a;
    font-size: 16px;
    vertical-align: middle;
  }
  .context ul li{
    border: 1px solid #ededed;
  }
  .bottom div{
    padding-top:10px;
    display: inline-block;
  }
  .log{
    width: 100px;
    height: 80px;
    background: navajowhite;
  }
  .list-item-top{
    display: flex;
    background: #fff;
    width: 900px;
    height: 80px;
  }
  .list-item-bot{
    background: #F2F5F4;
    width: 900px;
    height: 40px;
    /*float: left;*/
    /*width: 380px;*/
    /*height: 40px;*/
    padding-left:20px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .other-info{
    padding-top: 10px;
  }
  .company{

    width: 300px;
    height: 80px;
    padding-top:20px;
    padding-left:15px;
    /*background-color: darkgoldenrod;*/
  }
  .info{
    padding-top:20px;
    padding-left:15px;
    width: 490px;
    height: 60px;
    font-size: 16px;
    /*background-color: darkolivegreen;*/
  }
  .top{
    /*width: 190px;*/
  }
  .context-title{
    display: inline-block;
  }
  .context{
    width:900px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .activate{
    background: #00B38A;
  }
  .mid-item-title{
    display:inline-block;
    margin-top:14px;
  }
  .mid-item-div{
    font-size:17px;
    width: 40px;
    height: 20px;
    display:inline-block;
  }
  .mid-item{
    /*padding-top:15px;*/
    display: inline-block;
  }
  .search-mid{
    width: 900px;
    margin: 0 auto;
    margin-top: 30px;
    height: 50px;
    background: rgb(242,245,244);
  }

  .search-item{
    margin-bottom: 15px;
  }
  .item{
    display: inline-block;
    margin-left: 15px;
  }
  .item span{
    background-color: rgb(242,245,244);
    border:0;
    font-weight: 500;
    color: #000;
    text-align: left;
    padding:0;
    font-size: 16px;
  }
  .search-condition{
    width: 900px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .search-title{
    display: flex;
    width: 400px;
    margin-left: 490px;
  }
  .search-title-item{
    width: 100px;
    height: 35px;
    background-color: #00b38a;
    color: #fff;
    margin-top: 20px;
    text-align: center;
    padding-top: 8px;
  }
  .search{
    /*position: fixed;*/
    width: 70%;
    z-index: 110;
  }
  .search-text{
    width: 100%;
    margin-left:37%;
    margin-top:1%;
  }

</style>

