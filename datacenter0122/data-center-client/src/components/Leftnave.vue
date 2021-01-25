<template>
  <el-aside width="250">
    <!--左边导航-->
    <el-menu
      ref="leftNav"
      :default-active="this.$route.path"
      router="true"
      class="el-menu-vertical-demo"
      background-color="#D3DCE6"
      text-color="#fff"
      active-text-color="#ffa21c">
      <el-menu-item index="/dataresource/1">
        <i class="el-icon-menu" :class="{icon:isDisplay==true}"></i>
        <span class="title2" @click="myClick()">公开数据</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/GF5">
        <span class="title3" :class="{icon:SatelliteID=='GF5'}">高分五号</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/ZY1E">
        <span class="title3" :class="{icon:SatelliteID=='ZY1E'}">资源一号</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/HJ2A">
        <span class="title3" :class="{icon:SatelliteID=='HJ2A'}">环境2A号</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/HJ2B">
        <span class="title3" :class="{icon:SatelliteID=='HJ2B'}">环境2B号</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/2">
        <i class="el-icon-menu"></i>
        <span class="title2" @click="myClick()">商业数据</span>
      </el-menu-item>
      <el-menu-item index="/dataresource/3">
        <i class="el-icon-menu"></i>
        <span class="title2" @click="myClick()">数 据 汇</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Leftnave',
  data () {
    return {
      isDisplay: false,
      SatelliteID: ''
    }
  },
  methods: {
    // 左边导航栏：当二级导航“高分五号”或者“资源一号”被选中的时候，以及导航“公开数据”也要被选中，即图标变为黄色
    isIcon () {
      if (this.$route.path === '/dataresource/2' || this.$route.path === '/dataresource/3') {
        this.isDisplay = false
      } else {
        this.isDisplay = true
      }
    },
    getSatelliteID () {
      this.SatelliteID = sessionStorage.getItem('SatelliteID')// || this.$route.path === '/dataresource/satallite'
    },
    myClick () {
      sessionStorage.setItem('SatelliteID', '')
    }
  },
  mounted () {
    this.isIcon()// 每次页面有变动的时候就调用isIcon函数
    this.getSatelliteID()
  },
  updated () {
    this.isIcon()
    this.getSatelliteID()
  }
}
</script>

<style scoped>
  .el-aside{
    width: 250px;
    padding-top: 60px;
    /*background: #d43c33;*/
  }
  .el-menu-vertical-demo{
    width: 250px;
    height: 100%;
    position: fixed;
    background: #D3DCE6;
    /*margin-top: 0.6rem;*/
    padding-top: 20px;
  }
  .title2{
    color: #000;
    font-size: 20px;
    font-weight: bold;
  }
  .title3{
    padding-left: 0.4rem;
    font-size: 0.16rem;
  }
  .icon{
    color: #ffa21c;
  }
</style>
