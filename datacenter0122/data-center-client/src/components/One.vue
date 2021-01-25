<template>
  <div class="upload_pictures">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <!-- 多图片上传 -->
        <el-col :span="24">
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
                style="display:block;width: 80px; height: 80px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'One',
  data () {
    return {
      imageUrl: '', // 头像
      fileList: [], // 上传给后台的附件数据
      form: {
        iflag: '', // 头像路径
        oldFilesName: [], // 存放附件的数组
        caseImglist: [] // 多图片上传的案例图片数组
      },
      dialogImageUrl: '',
      dialogVisible: false,
      casefileList: [] // 存放图片的数组
    }
  },
  methods: {

    beforeUpload (file) {
      console.log(file)
    },
    // 多图片上传
    handleRemove (file, fileList) {
      let _this = this
      _this.form.caseImglist = []
      for (let i = 0; i < fileList.length; i++) {
        // let fileName = fileList[i].name
        var reader = new FileReader()
        if (fileList[i].raw === undefined) {
          _this.form.caseImglist.push(fileList[i].url)
        } else {
          reader.readAsDataURL(fileList[i].raw)
          reader.onload = function (e) {
            var base = e.target.result
            _this.form.caseImglist.push(base)
          }
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
    },
    caseImglistOnChange (file, fileList) {
      let _this = this
      _this.form.caseImglist = []
      for (let i = 0; i < fileList.length; i++) {
        // let fileName = fileList[i].name
        var reader = new FileReader()
        if (fileList[i].raw === undefined) {
          _this.form.caseImglist.push(fileList[i].url)
        } else {
          reader.readAsDataURL(fileList[i].raw)
          reader.onload = function (e) {
            var base = e.target.result
            _this.form.caseImglist.push(base)
          }
        }
      }
    },
    // 头像上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const ispng = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log('file=', file)
      if (!ispng && !isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M && isJPG
    },
    flagOnchange (file, fileList) {
      var _this = this
      // var event1 = event || window.event
      // var file1 = event1.target.files[0]
      var reader = new FileReader()
      // 转base64
      reader.onload = function (e) {
        _this.imageUrl = e.target.result // 将图片路径赋值给src
        _this.form.iflag = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // 附件上传
    handleUpload (raw) {
      this.files.push(raw.file)
    },
    onChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    onRemove (file, fileList) {
      this.fileList.map((val, i) => {
        if (val.name === file.name) {
          this.fileList.splice(i, 1)
        }
      })
    },
    /* fielDownload (file) {
      saveAs(file.url, file.name, { type: 'text/plain;charset=utf-8' })
    }, */
    submitForm () {
      var uploadForm = new FormData()
      // 头像
      uploadForm.append('iflag', this.form.iflag)
      // 多图片上传
      if (this.form.caseImglist.lenght > 0) {
        for (var i = 0; i < this.form.caseImglist.length; i++) {
          uploadForm.append('caseImglist', this.form.caseImglist[i])
        }
      }
      // 附件上传
      if (this.fileList.length > 0) {
        for (var j = 0; j < this.fileList.length; j++) {
          if (this.fileList[j].raw === undefined) {
            uploadForm.append('oldFilesName', this.fileList[j].name)
            this.form.oldFilesName = this.fileList[j].name
          } else {
            uploadForm.append('files', this.fileList[j].raw)
            this.form.files = this.fileList[j].raw
          }
        }
      }
      console.log(this.form.caseImglist)
      console.log(this.form.iflag)
      console.log(this.fileList)
    }
  },
  created: function () {
    // 回填数据此代码西在初始化成功后的接口成功回调函数里面
    // 获取多图片后处理路径
    if (this.form.caseImglist != null && this.form.caseImglist.length > 0) {
      for (var i = 0; i < this.form.caseImglist.length; i++) {
        let caseImg = this.form.caseImglist[i]
        var caseImgFile = {}
        caseImgFile.name = i + '.' + caseImg.split(';')[0].split('/')[1]
        caseImgFile.url = caseImg
        this.casefileList.push(caseImgFile)
      }
    }
    // 获取附件路径后处理路径
    if (this.form.oldFilesName != null) {
      for (i = 0; i < this.form.oldFilesName.length; i++) {
        var oldFile = {}
        oldFile.name = this.form.oldFilesName[i]
        oldFile.url = this.form.iAttachment + '/' + this.form.oldFilesName[i] // "../assets/image/login-background1.jpg";
        // alert(this.form.oldFilesName[i]);
        this.fileList.push(oldFile)
      }
    }
    this.imageUrl = this.form.iflag
  }
}
</script>
<!--注意点: 默认情况下组件中的style中设置的样式是全局的样式-->
<style scoped>
  .upload_pictures {
    width: 1200px;
    height: 800px;
    margin: 0 auto;
  }
</style>
