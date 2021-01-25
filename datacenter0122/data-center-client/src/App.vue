<!--template用于编写当前组件的结构代码的-->
<template>
    <div id="app">
      <HeaderNav></HeaderNav>
      <router-view></router-view>
    </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
import { reqUserInfo } from './api'

// import { reqUserInfo } from './api'
export default {
  name: 'App',
  mounted () {
    // console.log('你好')
    this.getUser()
  },
  methods: {
    getUser () {
      const result = reqUserInfo(sessionStorage.user_id)
      result.then(response => { // response为promise里的数据
        if (response.code === 0) {
          // 将user保存到vuex的state
          const user = response.data
          this.$store.commit('saveUserInfo', user)
        }
      })
      // this.$store.commit('getUserInfo')
    }
  },

  components: {
    HeaderNav: HeaderNav
  }
}

</script>
<!--style用于编写当前组件的样式代码的-->
<style scoped>
</style>
