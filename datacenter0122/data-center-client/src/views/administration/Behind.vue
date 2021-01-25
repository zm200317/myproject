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
        <el-menu-item index="/behind/1"><i class="el-icon-menu"></i><span class="title1" >数据库</span></el-menu-item>
        <el-menu-item index="/behind/2"><i class="el-icon-menu"></i><span class="title1">审核</span></el-menu-item>
        <el-menu-item index="/behind/3"><i class="el-icon-menu"></i><span class="title1">统计</span></el-menu-item>
        <el-menu-item index="/behind/4"><i class="el-icon-menu"></i><span class="title1">用户管理</span></el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="margin-top: 80px;padding: 0">
      <!-- 中间正文部分-->
      <el-header style="height: 100px">
        <div class="block">遥感数据库管理后台</div>
      </el-header>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Behind'
}
</script>

<style scoped>
  .el-aside{
    width: 250px;
    padding-top: 60px;
    /*background: #d43c33;*/
  }
  .el-header {
    margin-top: -10px;
    /*background-color: #B3C0D1;*/
    /*text-align: center;*/
    line-height: 100px;
  }
  .block{
    /*margin-bottom: 30px;*/
    color: #ffa21c;
    font-size: 28px;
    /*text-align: center;*/
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
