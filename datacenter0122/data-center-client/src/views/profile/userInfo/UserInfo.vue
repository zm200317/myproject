<template>
  <div class="content">
    <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像" prop="username">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          ref="upload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="this.$store.state.userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="useremail">
        <el-input v-model="this.$store.state.userInfo.useremail" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" required>
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-col >
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="academic">
        <el-select v-model="ruleForm.academic" placeholder="请选择">
          <el-option value="专科">专科</el-option>
          <el-option value="本科">本科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="个人优势" prop="desc" required>
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 200px;margin-left: 100px" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')" style="width: 200px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { reqUploadHeader, reqImproveUserInfo } from '../../../api'

export default {
  name: 'userInfo',
  data () {
    return {
      imageUrl: this.$store.state.userInfo.headerImg,
      ruleForm: {
        username: '',
        name: '',
        region: '',
        phone: '',
        address: '',
        academic: '',
        useremail: '',
        date1: '',
        sex: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写个人优势', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    uploadResult () {
      this.$refs.upload.action.then(response => {

      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(JSON.stringify(this.$refs[formName]))
          reqImproveUserInfo(JSON.stringify(this.$refs[formName]))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      var userId = this.$store.state.userInfo._id
      console.log('res=', res)
      var srcUrl = res.data.url
      reqUploadHeader(srcUrl, userId)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    httpRequest (params) {
      console.log(params.file)
      // var userId = this.$store.state.userInfo._id
      const file = params.file
      const fileType = file.type
      console.log(file)
      const isImage = fileType.indexOf('image') !== -1
      const isLt2M = file.size / 1024 / 1024 < 2
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error('只能上传图片格式png、jpg、gif!')
        return
      }
      if (!isLt2M) {
        this.$message.error('只能上传图片大小小于2M')
        return
      }
      // console.log(res.id)
      // 根据后台需求数据格式
      const form = new FormData()
      // 文件对象
      form.append('file', file)
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      // form.append('clientType', 'http://localhost:8080/uploadImage')
      // 项目封装的请求方法，下面做简单介绍
      console.log(form)
      // reqUploadHeader(file)
      /* imageUpload({ form, userId })
        .then(res => {
          // 自行处理各种情况
          const code = res && parseInt(res.code, 10)
          if (code === 200) {
            // xxx
          } else {
            // xxx
          }
        })
        .catch(() => {
          // xxx
        }) */
    }
  }
}
</script>
<style scoped>
  .content{
    /*width: 400px;*/
    padding: 30px 40px;
    background: #d3dce6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-size: 18px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;
  }
</style>
