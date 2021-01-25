<template>
    <!--d顶部导航栏-->
    <div>
      <el-menu
        ref="header"
        :default-active="this.$route.path"
        router="true"
        class="el-menu-demo header"
        mode="horizontal"
        background-color="white"
        text-color="#545c64"
        style="font-size: 20px"
        active-text-color="#ffa21c">
        <el-menu-item index="/banner">
          <img src="../assets/logo.jpg" />
        </el-menu-item>
        <el-submenu index="/dataresource">
          <template slot="title"><span class="title1">数据资源</span></template>
          <el-menu-item index="/dataresource/1" @click="myClick">公开数据</el-menu-item>
          <el-menu-item index="/dataresource/2" @click="myClick">商业数据</el-menu-item>
          <el-menu-item index="/dataresource/3" @click="myClick">数据汇</el-menu-item>
          <el-menu-item index="/dataresource/GF5" style="display: none">高分五号</el-menu-item>
          <el-menu-item index="/dataresource/ZY1E" style="display: none">资源一号</el-menu-item>
          <el-menu-item index="/dataresource/HJ2A" style="display: none">环境2A号</el-menu-item>
          <el-menu-item index="/dataresource/HJ2B" style="display: none">环境2B号</el-menu-item>
          <el-menu-item index="/dataresource/satallite" style="display: none">satellites</el-menu-item>
          <el-menu-item index="/dataresource/ZY1EL0" style="display: none">satellites</el-menu-item>
        </el-submenu>
          <el-menu-item index="/search">
            <span class="title1">高级搜索</span>
          </el-menu-item>
        <el-submenu index="/databag">
          <template slot="title" class="title1"><span class="title1">数据众包</span></template>
          <el-menu-item index="/databag/1">需求汇</el-menu-item>
          <el-menu-item index="/databag/2">任务汇</el-menu-item>
        </el-submenu>
        <el-submenu index="/onlineserve">
          <template slot="title" class="title1"><span class="title1">在线服务</span></template>
          <el-menu-item index="/onlineserve/1">DEM切割</el-menu-item>
          <el-menu-item index="/onlineserve/2">交互编程</el-menu-item>
        </el-submenu>
        <el-menu-item index="/forum">
          <span class="title1">论坛</span>
        </el-menu-item>
        <!--<el-menu-item index="/behind" v-if="userInfo.type==='内部员工'">
          <span class="title1">后台管理</span>
        </el-menu-item>-->
        <el-submenu index="/behind" v-if="userInfo.type==='内部员工'">
          <template slot="title" class="title1"><span class="title1">后台管理</span></template>
          <el-menu-item index="/behind/1">数据库</el-menu-item>
          <el-menu-item index="/behind/2">审核</el-menu-item>
          <el-menu-item index="/behind/3">统计</el-menu-item>
          <el-menu-item index="/behind/4">用户管理</el-menu-item>
        </el-submenu>
        <div class="login">
          <el-submenu index="/profile" v-if="userInfo._id" style="float: left">
            <template slot="title" class="title1">
              <img v-if="userInfo.headerImg"
                   :src="userInfo.headerImg"
                   class="user-avatar"
              >
              <i v-else class="el-icon-user-solid"></i>
              <span class="title1">{{userInfo.username}}</span>
<!--              <span class="title1">{{this.$store.state.userInfo.headerImg}}</span>-->
            </template>
            <el-menu-item index="/profile/1">我的共享数据</el-menu-item>
            <el-menu-item index="/profile/2">我的收藏数据</el-menu-item>
            <el-menu-item index="/profile/3">我的下载</el-menu-item>
            <el-menu-item index="/profile/4">完善个人信息</el-menu-item>
          </el-submenu>
          <el-menu-item  v-if="userInfo._id" style="float: right" @click="logout">
            <span  class="title2"> 注销 </span><i class="el-icon-delete"></i>
          </el-menu-item>
          <el-menu-item  v-else style="float: right" index="/login" >
            <span class="title1">登录|注册</span><i class="el-icon-user"></i>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import { reqUploadHeader } from '../../../api'
export default {
  name: 'HeaderNav',
  computed: {
    ...mapState(['userInfo']) // 将 this.$store.state.userInfo 映射成 userInfo
  },
  data: function () {
    return {
      path: '/1610696891526.jpg',
      srcUrl: require('D:\\VueWorkSpace\\datacenter0107\\datacenter_server\\routes\\upload\\1610692789446.jpg'),
      // srcUrl: require(`${this.$store.state.userInfo.headerImg}`),
      navList: [
        { name: '/dataresource', navItem: '数据资源' },
        { name: '/search', navItem: '高级搜索' },
        { name: '/databag', navItem: '数据众包' },
        { name: '/onlineserve', navItem: '在线服务' },
        { name: '/forum', navItem: '论 坛' }
      ]
    }
  },
  mounted () {
    console.log(require('D:\\VueWorkSpace\\datacenter0107\\datacenter_server\\routes\\upload\\1610692789446.jpg'))
    console.log('headerImg=', this.$store.state.userInfo.headerImg)
    // console.log('dsffs=', require(`${this.$store.state.userInfo.headerImg}`))
  },
  methods: {
    logout () {
      this.$confirm('退出登录，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$store.state.userInfo)
        // 清空用户登录信息
        this.$store.commit('userLogout')
        // console.log(this.$store.state.userInfo)
        // 删除session里存储的用户id
        delete sessionStorage.user_id
        this.$router.replace('/banner')
      }).catch(() => {

      })
    },
    myClick () {
      sessionStorage.setItem('SatelliteID', '')
      console.log('this.$refs.header.default_active=', this.$refs.header.router)
    }
  }

}
</script>

<style scoped>
  .header{
    width: 100%;
    /*height: 0.8rem;*/
    position: fixed;
    z-index: 998;
  }
  img{
    height: 0.55rem;
  }
  .title1{
    width: 1.1rem;
    /*height: 100px;*/
    font-size: 0.2rem;
    font-weight: bold;
  }
  .title2{
    width: 1.1rem;
    /*height: 100px;*/
    font-size: 0.16rem;
    /*color:blue;*/
  }
  .login{
    float: right;
  }
  .user-avatar{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
