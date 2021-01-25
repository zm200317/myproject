<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/uploadImage"
      :on-preview="handlePreview"
      :before-upload="beforeUpload"
      :on-success="handleAvatarSuccess"
      :show-file-list="true"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>

export default {
  computed: {},
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    // methods中的方法
    beforeUpload (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }, // :on-remove="handleRemove"
    // :before-remove="beforeRemove"
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }

}

</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
  }
</style>
