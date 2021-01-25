<template>
  <div>
    <div class="block">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/banner' }">数据资源</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dataresource/1' }">公开数据</el-breadcrumb-item>
        <el-breadcrumb-item>资源一号L0级数据</el-breadcrumb-item>
      </el-breadcrumb>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumb">
      </el-pagination>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      tooltip-effect="light"
      style="width: 100%"
      @row-click="getRow"
      highlight-current-row="true"
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
        prop="FileName"
        label="文件名"
        width="450">
      </el-table-column>
      <el-table-column
        prop="Date"
        label="创建时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="Size"
        label="文件大小">
      </el-table-column>
      <el-table-column
        prop="Type"
        label="文件类型">
      </el-table-column>
      <el-table-column label="操作" type="index" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <div class="bottom">
              <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
                <el-button type="danger" icon="el-icon-download" size="mini" @click="download(scope.row)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-end">
                <el-button type="warning" icon="el-icon-star-off" size="mini" circle></el-button>
              </el-tooltip>
            </div>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumb"
      style="margin-top: 20px">
    </el-pagination>
  </div>

</template>

<script>
import { reqZy1eL0, reqTotalNumbL0, reqDownload, reqCollect } from '../../../api'
export default {
  name: 'ZY1EL0',
  methods: {
    getCount () {
      var SatelliteID = 'ZY1E'
      var result = reqTotalNumbL0(SatelliteID)
      result.then(response => {
        this.totalNumb = response.data
        console.log('总条数=', this.totalNumb)
      })
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (val) {
      this.satellites()
    },
    satellites () {
      var SatelliteID = 'ZY1E'
      console.log('SatelliteID=', SatelliteID)
      const result = reqZy1eL0(SatelliteID, this.currentPage, this.pagesize) // 返回的是一个Promise对象
      console.log('当前页码：', this.currentPage)
      console.log('每页显示条数：', this.pagesize)
      result.then(response => { // response为promise里的数据
        this.tableData = response.data
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
        this.$notify.success('请先登录')
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
    // 数据下载
    download (row) {
      this.$notify({
        message: '正在下载......',
        position: 'bottom-right',
        type: 'success'
      })
      // 要下载的文件路径
      var dir = 'D:\\Remote_sensing_images\\ZY1E0级数据'
      // 要下载的卫星数据文件名
      var name = row.FileName + '.DAT'
      console.log(name)
      // var filePath = { path: '123.doc' }
      const result = reqDownload(dir, name)
      result.then(response => { // response为promise里的数据
        // console.log(' response.data=', response)
        // 创建Blob并指定mine类型
        const blob = new Blob([response])//, { type: 'application/tar' }
        // 文件名命名
        // const fileName = filePath.path
        // 创建a标签，指定标签通过createObjectURL关联blob对象
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        // 通过download属性规定下载文件名
        link.download = name
        // click触发下载
        link.click()
        // 通过revokeObjectURL释放url对象
        window.URL.revokeObjectURL(link.href)
      })
    }
  },
  mounted () {
    this.satellites()
    this.getCount()
  },
  data () {
    return {
      tableData: [],
      imgSrc: '',
      totalNumb: 0,
      tableData3: [],
      currentRow: 1, // 当前行
      currentPage: 1, //  el-pagination 初始页
      pagesize: 10,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      loading: true
    }
  }

}
</script>

<style scoped>
  .block{
    margin-top: 60px;
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
    /*height: 1rem;*/
    /*width: 100%;*/
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
</style>
