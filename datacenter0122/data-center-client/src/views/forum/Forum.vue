<template>
   <div></div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      upload_url: '', // 上传URL
      upload_name: '', // 图片或视频名称
      ad_url: '', // 上传后的图片或视频URL
      ad_url_list: []// 预览列表
    }
  },
  methods: {
    handleExceed: function () {
      this.$notify({
        message: '请先删除选择的图片或视频，再上传',
        position: 'bottom-right',
        type: 'warning'
      })
    },
    handleRemove: function (res, file) {
      var self = this
      self.ad_url = ''
      var liItem = document.getElementsByClassName('hide-video-box')[0]
      liItem.innerHTML = ''
    },
    uploadSectionFile: function (params) {
      var self = this
      var file = params.file
      var fileType = file.type
      var isImage = fileType.indexOf('image') !== -1
      var isVideo = fileType.indexOf('video') !== -1
      var fileUrl = self.$refs.upload.uploadFiles[0].url

      var isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$notify({
          message: '上传图片或视频大小不能超过 2MB!',
          position: 'bottom-right',
          type: 'error'
        })
        self.$refs.upload.uploadFiles = []
        return
      }

      if (!isImage && !isVideo) {
        this.$notify({
          message: '请选择图片或视频',
          position: 'bottom-right',
          type: 'error'
        })
        self.$refs.upload.uploadFiles = []
        return
      }

      if (isImage) {
        var img = new Image()
        img.src = fileUrl
        img.onload = function () {
          if (img.width !== 750 || img.height !== 1125) {
            this.$notify({
              message: '图片尺寸为750*1125px',
              position: 'bottom-right',
              type: 'error'
            })
            // 将上传列表清空
            self.$refs.upload.uploadFiles = []
            return
          }
          // 图片上传
          self.upload_url = '你的图片上传URL'
          self.upload_name = 'file_img[]'
          self.uploadFile(file, isVideo, '')
        }
      } else if (isVideo) {
        var isMP4 = file.type === 'video/mp4'
        if (!isMP4) {
          this.$notify({
            message: '上传视频只支持 mp4 格式!',
            position: 'bottom-right',
            type: 'error'
          })
          self.$refs.upload.uploadFiles = []
          return
        }
        var videoDiv = document.createElement('video')
        var liItem = document.getElementsByClassName('hide-video-box')[0]
        videoDiv.src = fileUrl
        liItem.appendChild(videoDiv)

        videoDiv.onloadeddata = function (event) {
          var target = event.target
          var width = target.offsetWidth
          var height = target.offsetHeight

          if (width !== 750 || height !== 1125) {
            this.$notify({
              message: '视频尺寸为750*1125px',
              position: 'bottom-right',
              type: 'error'
            })
            // 将上传列表清空
            self.$refs.upload.uploadFiles = []
            return
          }

          // 视频上传
          self.upload_url = '你的视频上传URL'
          self.upload_name = 'file_video[]'
          self.uploadFile(file, isVideo, videoDiv)
        }
      }
    },
    uploadFile: function (file, isVideo, videoDiv) {
      var self = this
      var formData = new FormData()
      formData.append(self.upload_name, file)

      axios.post(self.upload_url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (res) {
          if (res.result === '0000') {
            self.ad_url = res.data[0]
            // 创建一个显示video的容器
            if (isVideo) {
              var liItem = document.getElementsByClassName('el-upload-list__item')[0]
              videoDiv.style.width = '278px'
              videoDiv.style.height = '415px'
              liItem.prepend(videoDiv)
            }
            return
          }
          this.$notify({
            message: '上传失败，请重新上传',
            position: 'bottom-right',
            type: 'error'
          })
          self.$refs.upload.uploadFiles = []
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
  .avatar-uploader{
    margin-bottom: 290px;
  }
  .upload-bg {
    margin-top: 100px;
    margin-bottom: 290px;
    background: red;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 280px;
    height: 417px;
  }
  .bg-box{
    width: 278px;
    height: 415px;
    line-height: 417px;
  }
  .avatar-uploader {
    position: relative;
    z-index: 999;
  }
  .el-upload-list--picture-card{
    position: absolute;
    top: 0;
    left: 420px;
  }
  .bg-box{
    position: absolute;
    left: 420px;
    top: 0;
    z-index: 998;
    margin-bottom: 20px;
    border: 1px solid #c0ccda;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    font-size: 13px;
  }
  .el-upload--picture-card{
    height: 40px;
    line-height: 40px;
  }
  span { color: #1AB394; }
  .hide-video-box {
    visibility: hidden;
    position: absolute;
    z-index: -999;
  }
</style>
