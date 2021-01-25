<template>
    <div class="content">
      <div class="c1">
        <span>用户注册</span>
      </div>
      <div class="c2">
          <span id="sign-up-btn">已有帐号？<router-link to="/login">立刻登录</router-link></span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label=" 用 户 名 : " prop="username">
          <el-input type="text"  v-model="ruleForm.username" placeholder="请输入邮箱:" ></el-input>
        </el-form-item>

        <el-form-item label=" 邮 箱 : " prop="useremail">
          <el-input type="text" v-model="ruleForm.useremail" placeholder="请输入邮箱:" >
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱验证码: " prop="checkCode" >
          <div class="checkCode">
            <el-input type="text" autocomplete="off" v-model="ruleForm.checkCode" placeholder="请输入邮箱验证码">
              <el-button type="primary" slot="append" style="float: right" @click="getCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '发送邮箱验证码'}}
              </el-button>
            </el-input>
            <!--<img src="http://localhost:8080/captcha" @click="getCaptcha" alt="captcha" ref="captcha"/>-->
          </div>
        </el-form-item>

        <el-form-item label=" 密 码 : " prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码:"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户类型：">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="内部员工"></el-radio>
            <el-radio label="VIP客户"></el-radio>
            <el-radio label="普通客户"></el-radio>
<!--            <el-radio label="管理员"></el-radio>-->
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="userRegister('ruleForm')" style="margin-left: 70px">立即注册</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import '../../assets/css/accounts.css'
import { reqRegister, reqMeilCode } from '../../api'
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
        callback(new Error('请输入邮箱验证码'))
      } else if (value !== this.mailCode) {
        callback(new Error('邮箱验证码输入错误!'))
      } else {
        callback()
      }
    }
    return {
      computeTime: 0,
      mailCode: '',
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
        checkCode: [
          { validator: validateCheck, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 获取图片验证码
    getCode () {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 60
        this.intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            // 停止计时
            clearInterval(this.intervalId)
          }
        }, 1000)
        const result = reqMeilCode(this.ruleForm.useremail)
        result.then(response => {
          // 如果失败
          if (response.err === -1) {
            // 停止计时
            if (this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
            this.$confirm(response.msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.ruleForm.useremail = ''
            })
          } else { // 如果发送成功
            this.mailCode = response.data
            console.log(this.mailCode)
          }
        })
      }
    },
    userRegister (formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          const result = reqRegister(this.ruleForm) // 返回的是一个Promise对象
          result.then(response => { // response为promise里的数据
            if (response.code === 0) {
              // 去登录界面
              // this.$message.success('用户注册成功，请登录！')
              this.$notify({
                message: '用户注册成功，请登录！',
                position: 'bottom-right',
                type: 'success'
              })
              this.$router.replace('/login')
            } else {
              // this.$message.warning(response.msg)
              this.$notify({
                message: response.msg,
                position: 'bottom-right',
                type: 'warning'
              })
              this.$refs[formName].resetFields()
              // 刷新验证码
              this.getCaptcha()
            }
          })
        } else {
          console.log(valid)
          this.$message.error('信息提交失败')
          // 刷新验证码
          this.getCaptcha()
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
  .content{
    width: 400px;
    padding: 30px 40px;
    background: #d3dce6;
    /*background: #E9EEF3;*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-size: 24px;
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
</style>
