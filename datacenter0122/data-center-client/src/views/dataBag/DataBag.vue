<template>
  <el-container>
    <el-aside width="250">
      <!--左边导航-->
      <el-menu
        :default-active="this.$route.path||'/databag/1'"
        router="true"
        class="el-menu-vertical-demo"
        :default-openeds="openeds"
        @open="handleOpen"
        @close="handleClose"
        background-color="#D3DCE6"
        text-color="#fff"
        active-text-color="#ffa21c">
        <el-submenu index="/databag/1">
          <template slot="title">
            <i class="el-icon-menu" style="color: #ffa21c"></i>
            <span class="title1">数据众包</span>
          </template>
          <el-menu-item index="/databag/1"><span class="title2">需求汇</span></el-menu-item>
          <el-menu-item index="/databag/2"><span class="title2">任务汇</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main style="padding: 0">
    <!-- 中间正文部分-->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
// import Leftnave from '../components/Leftnave'
Vue.prototype.$axios = axios
export default {
  name: 'HeaderNav'

  /* methods: {
          this.$axios.get('/user?ID=12345')
              .then(function (response) {
                  console.log(response)
              })
              .catch(function (error) {
                  console.log(error)
              })
      } */
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
  .title1{
    color:black;
    width: 1.1rem;
    /*height: 100px;*/
    font-size: 20px;
    font-weight: bold;
  }
  .title2{
    padding-left: 0.4rem;
    font-size: 0.16rem;
  }
</style>
