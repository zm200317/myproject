<template>
    <div class="content">
      <div class="c1">
        <span>密码重置</span>
      </div>
      <div class="c2">
        <span id="sign-up-btn"><router-link to="/login">返回登录界面</router-link></span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="useremail">
          <el-input type="text" v-model="ruleForm.useremail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import '../../assets/css/accounts.css'
import { reqResetPass } from '../../api'
// import SIdentify from '../components/SIdentify'
export default {
  name: 'ResetPassword',
  data () {
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
        if (this.ruleForm.checkCode !== '') {
          this.$refs.ruleForm.validateField('checkCode')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        useremail: '',
        password: '',
        checkCode: ''
      },
      rules: {
        useremail: [
          { validator: userEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkCode: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          const result = reqResetPass(this.ruleForm)
          result.then(response => { // response为promise里的数据
            if (response.code === 0) {
              // 去登录界面
              this.$message.success('密码修改成功，请登录！')
              this.$router.replace('/login')
            } else {
              // console.log('response.msg=' + response.msg)
              this.showAlert(response.msg)
            }
          })
        } else {
          this.$message.warning('信息提交失败！')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
</style>
