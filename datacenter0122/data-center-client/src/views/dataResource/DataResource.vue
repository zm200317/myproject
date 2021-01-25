<template>
  <el-container>
    <Leftnave></Leftnave>
      <el-main>
        <!-- 中间正文部分-->
        <router-view></router-view>
      </el-main>
  </el-container>
</template>

<script>
import Leftnave from '../../components/Leftnave'
export default {
  name: 'DataResource',
  components: {
    Leftnave
  }
}
</script>

<style scoped>
</style>
