<template>
  <div class="content">
    <div class="c1">
      <span>用户登录</span>
      <span>{{this.$store.state.resetUserInfo}}</span>
    </div>
    <div class="c2">
      <span id="sign-up-btn">没有帐号？<router-link to="/register">立刻注册</router-link></span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label=" 用 户 名 : " prop="username">
        <el-input type="text" v-model="ruleForm.username" placeholder="请输入邮箱:" ></el-input>
      </el-form-item>
      <el-form-item label=" 邮 箱 : " prop="useremail">
        <el-input type="text" v-model="ruleForm.useremail" placeholder="请输入邮箱:" ></el-input>
      </el-form-item>
      <el-form-item label=" 密 码 : " prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码:"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验 证 码: " prop="checkCode" >
        <div class="checkCode">
          <el-input type="text" autocomplete="off" v-model="ruleForm.checkCode" placeholder="请输入验证码">
          </el-input>
          <img src="http://localhost:8080/captcha" @click="getCaptcha" alt="captcha" ref="captcha"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 10px">立即登录</el-button>
        <el-button @click="resetPass"> 忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import '../../assets/css/accounts.css'
import { reqLogin } from '../../api'
export default {
  name: 'Login',
  data () {
    var userName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var userEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== document.cookie.split('=')[1]) { // document.cookie.split('=')[1]
        callback(new Error('验证码输入错误!'))
      } else {
        callback()
      }
      console.log('captcha=', document.cookie.split('=')[1])
      console.log('value=', value)
    }
    return {
      ruleForm: {
        username: '',
        useremail: '',
        password: '',
        checkCode: ''
      },
      rules: {
        username: [
          { validator: userName, trigger: 'blur' }
        ],
        useremail: [
          { validator: userEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkCode: [
          { validator: validateCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取图片验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:8080/captcha?time=' + Date.now()
      // this.$store.state.resetUserInfo = 'buhao'
      /* const result = reqCaptcha(Date.now())
      result.then((response) => {
        console.log('captcha=', response)
        // sessionStorage.setItem('captcha', response.data)
        response.type('svg')
        return response.data
      }) */
      // var captcha = sessionStorage.getItem('captcha')
      // console.log('captcha=', captcha)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(document.cookie.split('=')[1])
        console.log(valid)
        if (valid) {
          const result = reqLogin(this.ruleForm) // 返回的是一个Promise对象
          result.then(response => { // response为promise里的数据
            if (response.code === 0) {
              // 将user保存到vuex的state
              const user = response.data
              console.log('response.data', response.data)
              // this.$store.dispatch('recordUser', user)
              // this.$store.state.userInfo = user
              this.$store.commit('saveUserInfo', user)
              sessionStorage.setItem('user_id', user._id)
              sessionStorage.setItem('type', user.type)
              console.log(sessionStorage)
              // 去主界面
              /* this.$confirm('登录成果', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              }) */
              // this.$message.success('用户登录成功')
              this.$router.replace('/banner')
            } else {
              console.log('Captcha=', response.data)
              // 刷新验证码
              this.getCaptcha()
              this.$confirm('用户名或密码错误,请重新登录！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            message: '登录信息提交失败',
            type: 'error'
          })
          // 刷新验证码
          this.getCaptcha()
          return false
        }
      })
    },
    resetPass () {
      this.getCaptcha()
      this.$router.replace('/reset_password')
    }

  }
}
</script>
<style scoped>
.content{
  width: 400px;
  padding: 30px 40px;
  background: #d3dce6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  font-size: 18px;
}
.c1{
  font-size: 20px;
  margin: 5px;
}
.c2{
  font-size: 15px;
  text-align: right;
  margin-bottom:10px;
}
.checkCode{
   display: flex;
 }
.get-code{
  margin-left: 4px;
  width: 100px;
}
</style>
