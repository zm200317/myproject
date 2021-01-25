<template>
  <el-container>
    <el-aside width="250">
      <!--左边导航-->
      <el-menu
        :default-active="this.$route.path"
        router="true"
        class="el-menu-vertical-demo"
        :default-openeds="openeds"
        @open="handleOpen"
        @close="handleClose"
        background-color="#D3DCE6"
        text-color="#fff"
        active-text-color="#ffa21c">
        <el-menu-item index="/profile/1"><i class="el-icon-menu"></i><span class="title1" >我的共享数据</span></el-menu-item>
        <el-menu-item index="/profile/2"><i class="el-icon-menu"></i><span class="title1">我的收藏数据</span></el-menu-item>
        <el-menu-item index="/profile/3"><i class="el-icon-menu"></i><span class="title1">我的下载</span></el-menu-item>
        <el-menu-item index="/profile/4"><i class="el-icon-menu"></i><span class="title1">完善个人信息</span></el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="padding-top: 100px">
      <!-- 中间正文部分-->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'OnServer'
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
    color: #000;
    font-size: 20px;
    font-weight: bold;
  }
</style>
