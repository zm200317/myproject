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
        <el-breadcrumb-item :to="{ path: '/dataresource/1' }"><span @click="myClick()">公开数据</span></el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: #d43c33">资源一号</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,key) in imgList"  :key="key">
        <div class="grid-content bg-purple">
          <router-link to="/dataresource/satallite">
            <img class="detail-img" :src="item.imgPath" @click="getSatelliteID('ZY1E')">
          </router-link>
          <div class="pText">
            <p class="p1">{{item.satelliteName}}卫星数字产品</p>
            <p class="p2">发布：管理员</p>
            <p class="p2">数据量：{{item.dataNum}}GB</p>
            <p class="p2">标签：无</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reqDataSize } from '../../../api' // 接口函数
export default {
  name: 'ZY1E',
  methods: {
    myClick () {
      sessionStorage.setItem('SatelliteID', '')
    },
    getSatelliteID (value) {
      this.$store.commit('getSatelliteID', value)
      sessionStorage.setItem('SatelliteID', 'ZY1E')
    },
    // 获取指定卫星ID的数据大小
    getDataSize (value) {
      const result = reqDataSize(value) // 返回的是一个Promise对象
      result.then(response => { // response为promise里的数据
        this.imgList[0].dataNum = response.data
        this.$store.state.satelliteInfo.Size = response.data
      })
    }
  },
  mounted () {
    this.getDataSize('ZY1E')
    this.getSatelliteID('ZY1E')
  },
  data () {
    return {
      imgList: [
        {
          imgPath: require('../../../assets/images/ZY1E.jpg'),
          imgIndex: '/dataresource/241',
          satelliteName: '资源一号AHSI L1级',
          dataNum: 0
        },
        {
          imgPath: 'http://www.gscloud.cn/thumb/product/251',
          imgIndex: '/dataresource/241',
          satelliteName: '资源一号AHSI L0级',
          dataNum: 0
        },
        {
          imgPath: 'http://www.gscloud.cn/thumb/product/252',
          imgIndex: '/dataresource/241',
          satelliteName: '资源一号AHSI L2级',
          dataNum: 0
        },
        {
          imgPath: 'http://www.gscloud.cn/thumb/product/253',
          imgIndex: '/dataresource/241',
          satelliteName: '资源一号AHSI L2A级',
          dataNum: 0
        },
        {
          imgPath: 'http://www.gscloud.cn/thumb/product/254',
          imgIndex: '/dataresource/241',
          satelliteName: '资源一号AHSI L1B级',
          dataNum: 0
        }
      ]
    }
  }
}
</script>

<style scoped>
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
  .detail-img{
    width: 100%;
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
