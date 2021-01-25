<template>
  <div>
    <!--<div class="search">
      &lt;!&ndash; 搜索框&ndash;&gt;
      <div class="search-div">
        <el-input v-model="input" suffix-icon="el-icon-search" placeholder="请输入内容" style="margin-top: 0px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="query()">搜索</el-button>
      </div>
    </div>-->
    <div style="margin-bottom: 25px;margin-top: 80px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/banner' }">平台首页</el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: #d43c33">公开数据</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,key) in satellitesList"  :key="key">
        <div class="grid-content bg-purple" @click="query(col)">
          <router-link to="/dataresource/satallite" >
            <img class="detail-img" :src="item.imgPath" @click="getSatelliteID(item.SatelliteID)">
          </router-link>
          <div class="pText">
            <p class="p1">{{item.satelliteName}}卫星数字产品</p>
            <p class="p2">发布：管理员</p>
            <p class="p2">数据量：{{item.dataNum}}GB</p>
            <p class="p2">标签：无</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="this.$store.state.userInfo.type==='内部员工'">
        <div class="grid-content bg-purple">
          <router-link to="/dataresource/ZY1EL0" @click="query()">
            <img src="../../../assets/images/ZY1EL0.jpg" class="detail-img" @click="getSatelliteID('GF5')"/>
          </router-link>
          <div class="pText">
            <p class="p1">高分五号AHSI L0级数据产品</p>
            <p class="p2">发布：管理员</p>
            <p class="p2">数据量：20GB</p>
            <p class="p2">标签：无</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="this.$store.state.userInfo.type==='内部员工'">
        <div class="grid-content bg-purple">
          <router-link to="/dataresource/satallite">
            <img src="../../../assets/images/ZY1EL0.jpg" class="detail-img"/>
          </router-link>
          <div class="pText">
            <p class="p1">资源一号AHSI L0级数据产品</p>
            <p class="p2">发布：管理员</p>
            <p class="p2">数据量：20GB</p>
            <p class="p2">标签：无</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import axios from 'axios'
// import { reqSatellites, reqTotalNumb } from '../api'
import { reqDataSize } from '../../../api' // 接口函数
export default {
  name: 'PublicData',
  data () {
    return {
      input: '',
      totalNumb: 0,
      satellitesInfo: [],
      satellitesList: [
        {
          SatelliteID: 'GF5',
          imgPath: require('../../../assets/images/GF5.jpg'),
          satelliteName: '高分五号AHSI L1级',
          dataNum: 0
        },
        {
          SatelliteID: 'ZY1E',
          imgPath: require('../../../assets/images/ZY1E.jpg'),
          satelliteName: '资源一号AHSI L1级',
          dataNum: 0
        },
        {
          SatelliteID: 'HJ2A',
          imgPath: require('../../../assets/images/HJ2A.jpg'),
          satelliteName: '环境2A号IRS L2级',
          dataNum: 0
        },
        {
          SatelliteID: 'HJ2B',
          imgPath: require('../../../assets/images/HJ2B.jpg'),
          satelliteName: '环境2B号IRS L2级',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/244.jpg'),
          satelliteName: '高分五号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/246.jpg'),
          satelliteName: '高分五号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/248.jpg'),
          satelliteName: '资源一号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/249.jpg'),
          satelliteName: '资源一号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/250.jpg'),
          satelliteName: '资源一号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/251.jpg'),
          satelliteName: '资源一号',
          dataNum: 0
        },
        {
          imgPath: require('../../../assets/images/252.jpg'),
          satelliteName: '资源一号',
          dataNum: 0
        }
      ]
    }
  },
  methods: {
    query (value) {
      // console.log('value', value)
    },
    // 获取卫星ID，用于获得指定卫星的数据
    getSatelliteID (value) {
      this.$store.commit('getSatelliteID', value)
      sessionStorage.setItem('SatelliteID', value)
    },
    // 获取指定卫星ID的数据大小
    getDataSize () {
      const result1 = reqDataSize('GF5') // 返回的是一个Promise对象
      result1.then(response => { // response为promise里的数据
        this.satellitesList[0].dataNum = response.data
      })

      const result2 = reqDataSize('ZY1E') // 返回的是一个Promise对象
      result2.then(response => { // response为promise里的数据
        this.satellitesList[1].dataNum = response.data
      })

      const result3 = reqDataSize('GF5') // 返回的是一个Promise对象
      result3.then(response => { // response为promise里的数据
        this.satellitesList[2].dataNum = response.data
      })

      const result4 = reqDataSize('HJ2B') // 返回的是一个Promise对象
      result4.then(response => { // response为promise里的数据
        this.satellitesList[3].dataNum = response.data
      })
    }
  },
  mounted () {
    this.getDataSize()
  }
}
</script>

<style scoped>
  .demo-input-size{
    height: 40px;
  }
  .el-row {
    margin-bottom: 0.2rem;
  }
  .el-col {
    border-radius: 0.04rem;
    margin-bottom: 0.1rem;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 0.04rem;
    min-height: 0.46rem;
  }
  .row-bg {
    padding: 0.1rem 0;
    background-color: #f9fafc;
  }
  p{
    font-size: 0.12rem;
  }
  .detail-img{
    width: 100%;
  }
  .block{
    float: right;
    /*height: 50px;*/
  }
  .pText{
    height: 1rem;
  }
  .p1{
    font-size: 0.16rem;
    color: #242424;
    font-weight: bold;
    white-space: nowrap;
    padding-left: 0.15rem;
    margin-bottom: 0.1rem;
  }
  .p2{
    font-size: 0.12rem;
    color: #242424;
    white-space: nowrap;
    padding-left: 0.15rem;
    margin-top: 0.05rem;
  }
  .search{
    width:100%;
    height: 1.4rem;
    /*background: #d43c33;*/
  }
  .search-div{
    /*margin-top: 0.06rem;*/
    /*width:100%;*/
    float: right;
    /*height: 0.8rem;*/
    /*line-height: 0.5rem;*/
    /*padding: 0.2rem 0.1rem;*/
    /*background: black;*/
  }
  .el-input{
    width: 1.8rem;
  }
</style>
