<!--<template>-->
  <!--<div class="wrap">-->

    <!--<div class="select">-->

      <!--<p class="cityChoice" type="text" @click="ChoiceAddress()" :CityCode="addressCode">{{address}} <img src="../../../static/img/index/sj.png" /> </p>-->
      <!--<div class="wrap_Address" v-show="ifWrap_Address">-->
        <!--<div class="wrap_Address_top"></div>-->

        <!--<div class="hotCity">-->
          <!--<ul>-->
            <!--<li v-for="(item,index) in hotCityData" :key="index" @click="btn_user($event)" :CityCode="item.linkageid">{{item.name}}</li>-->
          <!--</ul>-->
        <!--</div>-->

        <!--<div class="PressLetterQuery">-->
          <!--<ul>-->
            <!--<li v-for="(item,index) in PressLetterQueryData" :key="index" @click="btn_letters($event,index)">{{item.letters}}</li>-->
          <!--</ul>-->
        <!--</div>-->

        <!--<div class="RollCentent" @scroll="yourmethod">-->
          <!--<div class="LetterList" v-for="(item,index) in LetterCity" :key="index">-->
            <!--<div class="LetterList_left fl">-->
              <!--<span>{{item.letter}}</span>-->
            <!--</div>-->
            <!--<div class="LetterList_right rig" v-for="(item2,index2) in item.childArr" :key="index2">-->
              <!--<div class="provinceList fl">{{item2.name}}</div>-->
              <!--<div class="regionList fl">-->
                <!--<div class="fl" v-for="(item3,index3) in item2.childArr" :key="index3"  :CityCode="item3.linkageid" @click="btn_regionList($event)">{{item3.name}}</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->

      <!--</div>-->
    <!--</div>-->


  <!--</div>-->

<!--</template>-->

<!--<script>-->
  <!--import Vuex from 'vuex'-->
  <!--import api from "@/untils/requst.js";-->
  <!--export default {-->
    <!--props: {-->
      <!--initList: {-->
        <!--type: Function,-->
        <!--default: null,-->
      <!--}-->
    <!--},-->
    <!--name: "Header",-->
    <!--data(){-->
      <!--return{-->
        <!--address:"通辽市",-->
        <!--addressCode:150500,-->
        <!--ifWrap_Address:false,-->

        <!--hotCityData:[],//热门城市-->
        <!--PressLetterQueryData:[],//首字母-->
        <!--LetterCity:[],-->
        <!--RollCententScrollTop:0,-->

      <!--}-->
    <!--},-->
    <!--methods:{-->

      <!--ChoiceAddress:function(){//点击选择地址-->
        <!--this.ifWrap_Address=true-->
        <!--this.getCityList()-->
      <!--},-->

      <!--yourmethod(event){//滚动事件-->
        <!--this.RollCententScrollTop=event.target.scrollTop-->
      <!--},-->
      <!--btn_user (e) {//热门城市-->
        <!--this.address=e.target.innerHTML, //获取热门地区文字-->
          <!--this.addressCode=e.target.getAttribute('CityCode') //获取热门地区编码-->
        <!--this.$store.commit("setcityCode",this.addressCode)-->
        <!--sessionStorage.setItem('address',JSON.stringify(this.address));-->
        <!--sessionStorage.setItem('setcityCode',JSON.stringify(this.addressCode));-->
        <!--var setslaughterSearch=JSON.parse(sessionStorage.getItem("setslaughterSearch"));-->
        <!--setslaughterSearch.city_id=this.addressCode-->
        <!--sessionStorage.setItem('setslaughterSearch',JSON.stringify(setslaughterSearch));-->
        <!--if (this.initList) {-->
          <!--this.initList();-->
        <!--}-->
        <!--this.$parent.initList();-->
        <!--this.ifWrap_Address=false-->
      <!--},-->
      <!--btn_regionList (e){-->
        <!--this.address=e.target.innerHTML //获取地区文字-->
        <!--sessionStorage.setItem('address',JSON.stringify(this.address));-->
        <!--this.addressCode=e.target.getAttribute('CityCode') //获取地区编码-->
        <!--this.$store.commit("setcityCode",this.addressCode)-->
        <!--sessionStorage.setItem('setcityCode',JSON.stringify(this.addressCode));-->
        <!--var setslaughterSearch=JSON.parse(sessionStorage.getItem("setslaughterSearch"));-->
        <!--setslaughterSearch.city_id = this.addressCode-->
        <!--sessionStorage.setItem('setslaughterSearch',JSON.stringify(setslaughterSearch));-->
        <!--if (this.initList) {-->
          <!--this.initList();-->
        <!--}-->
        <!--this.$parent.initList();-->
        <!--this.ifWrap_Address=false-->
      <!--},-->
      <!--btn_letters (e,index){//点击省份首字母-->
        <!--// this.address=e.target.innerHTML-->
        <!--var LetterList_Dom=document.getElementsByClassName("LetterList");-->
        <!--var LetterList_Dom_height=[];-->
        <!--for(var a=0;a<LetterList_Dom.length;a++){-->
          <!--LetterList_Dom_height.push(-->
            <!--{"height":LetterList_Dom[a].offsetHeight}-->
          <!--)-->
        <!--}-->
        <!--var zongHeight=0;-->
        <!--for(var b=0;b<index;b++){-->
          <!--zongHeight+=LetterList_Dom_height[b].height-->
        <!--}-->
        <!--if(index>=1){-->
          <!--zongHeight=zongHeight+10-->
        <!--}-->
        <!--var box=document.getElementsByClassName("RollCentent");-->
        <!--box[0].scrollTop=zongHeight-->
      <!--},-->
      <!--//获取首字母城市json-->
      <!--getCityList () {-->
        <!--this.PressLetterQueryData=[]-->
        <!--var LetterCityData=JSON.parse(sessionStorage.getItem("LetterCityData"));-->
        <!--this.LetterCity=LetterCityData-->
        <!--for(var a=0;a<LetterCityData.length;a++){-->
          <!--this.PressLetterQueryData.push(-->
            <!--{letters:LetterCityData[a].letter}-->
          <!--)-->
        <!--}-->
        <!--//默认城市编码-->
        <!--this.$store.commit("setcityCode",this.addressCode)-->
        <!--sessionStorage.setItem('setcityCode',JSON.stringify(this.addressCode));-->
      <!--},-->
      <!--hotCity (){//获取热门城市-->
        <!--let that = this-->
        <!--api.post("/api/index/getOpenCityListInfo",{-->
          <!--source: 1,-->
        <!--}).then(function (res) {-->
          <!--if(res.data.code=="1000"){-->
            <!--that.hotCityData=res.data.data-->
          <!--}-->
        <!--});-->
        <!--var address=JSON.parse(sessionStorage.getItem("address"));-->
        <!--var setcityCode=JSON.parse(sessionStorage.getItem("setcityCode"));-->
        <!--if(address){-->
          <!--this.address=address-->
          <!--this.addressCode=setcityCode-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--mounted(){-->
      <!--this.hotCity()-->
      <!--this.SelectionType()-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.fl{-->
    <!--float: left;-->
  <!--}-->
  <!--.rig{-->
    <!--float: right;-->
  <!--}-->
  <!--.wrap{-->
    <!--width: 1200px;-->
    <!--margin: 0 auto;-->
    <!--height: 110px;-->
    <!--display: flex;-->
    <!--justify-content: space-between;-->

  <!--}-->
  <!--.select{-->
    <!--margin-top: 55px;-->
    <!--margin-left: 30px;-->
    <!--position: relative;-->
  <!--}-->
  <!--.select .cityChoice{-->
    <!--width: 230px;-->
    <!--height: 24px;-->
    <!--border-radius: 5px;-->
    <!--border: 1px solid #ccc;-->
    <!--font-size: 18px;-->
    <!--padding: 1px 1px;-->
    <!--color: #333;-->
    <!--line-height: 24px;-->
    <!--text-indent: 5px;-->
    <!--cursor:pointer;-->
    <!--position: relative;-->
  <!--}-->
  <!--.select .cityChoice img{-->
    <!--position: absolute;-->
    <!--right: 5px;-->
    <!--top: 5px;-->
  <!--}-->
  <!--.select .wrap_Address{-->
    <!--width: 420px;-->
    <!--height: 370px;-->
    <!--border-radius: 5px;-->
    <!--border: 1px solid #ccc;-->
    <!--background: #fff;-->
    <!--position: absolute;-->
    <!--left: 0;-->
    <!--top: 25px;-->
    <!--z-index: 999;-->
    <!--cursor:pointer;-->
  <!--}-->
  <!--.select .wrap_Address_top{-->
    <!--width: 232px;-->
    <!--height: 2px;-->
    <!--background: #fff;-->
    <!--position: relative;-->
    <!--top: -1px;-->
    <!--left: 0;-->
  <!--}-->
  <!--.select .hotCity{-->
    <!--width: 100%;-->
    <!--height: 50px;-->
    <!--padding: 0 10px;-->
  <!--}-->
  <!--.select .hotCity li{-->
    <!--float: left;-->
    <!--margin:0 5px;-->
    <!--line-height: 50px;-->
    <!--font-size: 14px;-->
    <!--color: #3d6dcc;-->
  <!--}-->
  <!--.select .PressLetterQuery{-->
    <!--height: 40px;-->
    <!--border-bottom: 1px solid #ccc;-->
    <!--padding: 0 10px;-->
  <!--}-->
  <!--.select .PressLetterQuery li{-->
    <!--float: left;-->
    <!--padding:0 7px;-->
    <!--font-size: 18px;-->
    <!--color: #3d6dcc;-->
    <!--margin-top: 5px;-->
  <!--}-->
  <!--.select .PressLetterQuery li:hover{-->
    <!--text-decoration:underline;-->
  <!--}-->
  <!--.select .RollCentent{-->
    <!--width: 100%;-->
    <!--height: 265px;-->
    <!--padding: 10px 10px;-->
    <!--box-sizing: border-box;-->
    <!--overflow-y:auto;-->
  <!--}-->
  <!--/*滚动条样式*/-->
  <!--.select .RollCentent::-webkit-scrollbar {/*滚动条整体样式*/-->
    <!--width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/-->
    <!--height: 4px;-->
  <!--}-->
  <!--.select .RollCentent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/-->
    <!--border-radius: 5px;-->
    <!--/* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */-->
    <!--background: rgba(0,0,0,0.2);-->
  <!--}-->
  <!--.select .RollCentent::-webkit-scrollbar-track {/*滚动条里面轨道*/-->
    <!--/* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */-->
    <!--border-radius: 0;-->
    <!--background: rgba(0,0,0,0.1);-->
  <!--}-->
  <!--.select .RollCentent .LetterList{-->
    <!--width: 100%;-->
    <!--overflow: hidden;-->

  <!--}-->
  <!--.select .RollCentent .LetterList .LetterList_left{-->
    <!--width: 10%;-->
    <!--font-size: 24px;-->
    <!--line-height: 24px;-->
    <!--font-weight: 700;-->
    <!--color: #ccc;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.select .RollCentent .LetterList .LetterList_right{-->
    <!--width: 90%;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.select .RollCentent .LetterList .provinceList{-->
    <!--width: 20%;-->
    <!--white-space: nowrap;-->
    <!--line-height: 26px;-->
    <!--color: #3d6dcc;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.select .RollCentent .LetterList .regionList{-->
    <!--width: 80%;-->
    <!--padding-right: 10px;-->
    <!--box-sizing: border-box;-->
  <!--}-->
  <!--.select .RollCentent .LetterList .regionList div{-->
    <!--color: #3d6dcc;-->
    <!--white-space: nowrap;-->
    <!--margin-right: 9px;-->
    <!--line-height: 26px;-->
    <!--font-size: 14px;-->
  <!--}-->
  <!--.select .RollCentent .LetterList .regionList div:hover{-->
    <!--text-decoration:underline;-->
  <!--}-->
  <!--select{-->
    <!--border: none;-->
    <!--outline: none;-->
  <!--}-->

<!--</style>-->
