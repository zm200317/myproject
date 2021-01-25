<template>
  <div>
<!--    <p>我是商业数据</p>-->
    <div style="margin-bottom: 25px;margin-top: 80px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/banner' }">平台首页</el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: #d43c33">商业数据</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name: 'Business'
}
</script>

<style scoped>

</style>
