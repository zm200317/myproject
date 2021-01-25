<template>
    <el-main>
      <div class="div2">
        <span style="font-size: 16px">关键词搜索：</span>
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:150px">
          <el-option label="卫星号" value="SatelliteID"></el-option>
          <el-option label="产品号" value="ProductID"></el-option>
          <el-option label="景号" value="SceneID"></el-option>
          <el-option label="行编号" value="SceneRow"></el-option>
          <el-option label="日期" value="ProduceTime"></el-option>
          <el-option label="云量" value="CloudPercent"></el-option>
          <el-option label="经度" value="CenterLatitude"></el-option>
          <el-option label="纬度" value="CenterLongitude"></el-option>
          <el-option label="全部" value="Total"></el-option>
        </el-select>
        <el-input placeholder="请输入内容" v-model="value" class="input-with-select" @change="satellites()" style="width: 200px">
          <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        tooltip-effect="light"
        style="width: 100%"
        @select="getRow"
        :header-cell-style="{background:'darkblue',color:'white',fontWeight:'bold'}">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          width="80px"
          label="编号"
          class="title1">
        </el-table-column>
        <el-table-column
          prop="SatelliteID"
          label="卫星号">
        </el-table-column>
        <el-table-column
          prop="ProductID"
          label="产品号">
        </el-table-column>
        <el-table-column
          prop="SceneID"
          label="景号">
        </el-table-column>
        <el-table-column
          prop="SceneRow"
          label="行编号">
        </el-table-column>
        <el-table-column
          prop="ProduceTime"
          label="生产日期">
        </el-table-column>
        <el-table-column
          prop="CloudPercent"
          label="云量%">
        </el-table-column>
        <el-table-column
          prop="CenterLatitude"
          label="经度">
        </el-table-column>
        <el-table-column
          prop="CenterLongitude"
          label="纬度">
        </el-table-column>
        <el-table-column
          prop="ThumbFile"
          label="缩略图">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title=""
              trigger="hover">
              <img :src="scope.row.ThumbFile" height="400"/>
              <img slot="reference" :src="scope.row.ThumbFile" style="height: 50px;width:50px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" type="index" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="详情" placement="bottom-start">
                  <el-button type="info" icon="el-icon-info" size="mini"  @click="detail(scope.row)" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
                  <el-button ref="downloadbutton" type="danger" icon="el-icon-download" size="mini" @click="download(scope.row)" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-end">
                  <el-button type="warning" icon="el-icon-star-off" @click="collect(scope.row)" size="mini" circle></el-button>
                </el-tooltip>
              </div>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogTableVisible">
        <el-row :gutter="20">
          <el-col :span="12" style="padding: 0" >
            <div class="grid-content bg-purple">
              <p class="title">位置</p>
              <img src="../../../assets/position.png" height="250" width="450"/>
              <p class="title">缩略图</p>
              <div class="image">
                <img class="image" :src="imgSrc" height="200"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="padding: 0" >
            <div class="grid-content bg-purple" style="background: red">
              <el-table :data="xmlData" height="540px" :header-cell-style="{background:'darkblue',color:'white',fontWeight:'bold'}">
                <el-table-column property="attribute" label="属性" :cell-style="{color:'black',fontWeight:'bold'}"></el-table-column>
                <el-table-column  property="attributeValue" label="属性值"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <hr/>
        <el-footer>
          <el-button type="info" @click="dialogTableVisible = false" style="float: right">关 闭</el-button>
        </el-footer>
      </el-dialog>

      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumb">
        </el-pagination>
      </div>
    </el-main>
</template>

<script>
// import axios from 'axios'
import { reqXmlDetail, reqSatellites, reqDownload, reqCollect, resDelThumb } from '../../../api' // 接口函数
// import '../../../fiters'// 加载日期过滤器
export default {
  name: 'DataBase',
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      console.log('select=', this.select)
      this.satellites()
    },
    detail (row) {
      this.xmlData = []
      const result = reqXmlDetail(row.XMLName) // 返回的是一个Promise对象
      result.then(response => { // response为promise里的数据
        for (let item in response) {
          //  将属性和属性值放到xmlData数组中
          this.xmlData.push({ attribute: item, attributeValue: response[item] })
        }
      })
      this.dialogTableVisible = true
      this.imgSrc = row.ThumbFile
    },
    satellites () {
      var SatelliteID = sessionStorage.getItem('SatelliteID')
      console.log('SatelliteID=', SatelliteID)
      var info = {
        satelliteID: SatelliteID,
        select: this.select,
        value: this.value,
        currentPage: this.currentPage,
        pagesize: this.pagesize
      }
      const result = reqSatellites(info) // 返回的是一个Promise对象
      result.then(response => { // response为promise里的数据
        // console.log(' response.data=', response.data)
        this.tableData = response.data.satellites
        this.totalNumb = response.data.count
        this.loading = false
      })
    },
    // 格式化时间显示
    dateFormt (fmt, date) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S+': date.getMilliseconds()
      }
      // 因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
      if (/(y+)/.test(fmt)) {
        // 第一种：利用字符串连接符“+”给date.getFullYear()+''，加一个空字符串便可以将number类型转换成字符串。
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          // 第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)))
        }
      }
      return fmt
    },
    // 数据收藏
    collect (row) {
      var date = new Date()
      var time = this.dateFormt('yyyy-MM-dd', date)
      console.log(time)
      row.date = time
      console.log(row)
      var userInfo = {
        _id: this.$store.state.userInfo._id,
        satelliteCollection: row
      }
      if (userInfo._id === undefined) {
        this.$notify({
          message: '请先登录',
          position: 'bottom-right',
          type: 'warning'
        })
      } else {
        const result = reqCollect(userInfo)
        result.then(response => { // response为promise里的数据
          this.$notify({
            message: '收藏数据成功',
            position: 'bottom-right',
            type: 'success'
          })
        })
      }
    },
    // 批量收藏
    collects () {
      var userID = this.$store.state.userInfo._id
      if (userID === undefined) {
        this.$notify({
          message: '请先登录',
          position: 'bottom-right',
          type: 'warning'
        })
      } else {
        this.collections.forEach(row => {
          var date = new Date()
          var time = this.dateFormt('yyyy-MM-dd', date)
          console.log(time)
          row.date = time
          var userInfo = {
            _id: this.$store.state.userInfo._id,
            satelliteCollection: row
          }
          const result = reqCollect(userInfo)
          result.then(response => { // response为promise里的数据

          })
        })
        this.$notify({
          message: '收藏数据成功',
          position: 'bottom-right',
          type: 'success'
        })
      }
    },
    // 数据下载
    download (row) {
      // this.loading = true
      this.$notify({
        message: '正在下载......',
        position: 'bottom-right',
        type: 'success'
      })
      // 要下载的文件路径
      var dir = 'D:\\Remote_sensing_images\\'
      // 要下载的卫星数据文件名
      var a = row.ThumbPath.split('/')
      var name = a[2] + '.tar'
      // console.log(name)
      // var filePath = { path: '123.doc' }
      const result = reqDownload(dir, name)
      result.then(response => { // response为promise里的数据
      // console.log(' response.data=', response)
      // 创建Blob并指定mine类型
        const blob = new Blob([response])//, { type: 'application/tar' }
        // 创建a标签，指定标签通过createObjectURL关联blob对象
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        // 通过download属性规定下载文件名
        link.download = name
        // click触发下载
        link.click()
        // 通过revokeObjectURL释放url对象
        window.URL.revokeObjectURL(link.href)
        this.loading = false
      })
    },
    myClick () {
      sessionStorage.setItem('SatelliteID', '')
    }
  },
  mounted () {
    this.satellites()
  },
  beforeDestroy () {
    var result = resDelThumb()
    result.then(response => {
      console.log(response.data)
    })
  },
  data () {
    return {
      SatelliteID: sessionStorage.getItem('SatelliteID'),
      collections: [],
      imgSrc: '',
      totalNumb: 0,
      tableData3: [],
      currentPage: 1, //  el-pagination 初始页
      pagesize: 10,
      xmlData: [], // 存放xml信息
      tableData: [],
      dialogTableVisible: false,
      select: '',
      value: '',
      loading: true
    }
  }
}
</script>

<style scoped>
  .div2{
    margin-bottom: 20px;
    color: #2a3147;
    font-size: 16px;
  }
  .title2{
    color: #2a3147;
    font-size: 14px;
    /*margin-right: 20px;*/
  }
  .demo-image{
    position: absolute;
    left:10px
  }
  .table{
    position: absolute;
    right:10px
  }
  .title{
    color: #d43c33;
    font-size: 0.18rem;
    margin: 0.1rem auto;
    text-align: center;
  }
  .image{
    vertical-align: middle;
    text-align: center;
  }
  .el-pagination{
    /*background: #d43c33;*/
    height: 0.4rem;
  }
  .bottom {
    clear: both;
    text-align: center;
  }
  .title1{
    color: black;
    font-size: 16px;
    text-align: center;
  }
  .el-breadcrumb-item:last-child {
    color: #d43c33;
  }
  .search-div{
    float: right;
  }
</style>
