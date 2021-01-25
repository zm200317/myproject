<template>
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
      prop="date"
      label="收藏日期">
    </el-table-column>
    <el-table-column label="操作" type="index" width="150">
      <template slot-scope="scope">
        <el-button-group>
          <div class="bottom">
            <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
              <el-button ref="downloadbutton" type="danger" icon="el-icon-download" size="mini" @click="download(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom-end">
              <el-button type="warning" icon="el-icon-delete" @click="myDelete(scope.row)" size="mini" circle></el-button>
            </el-tooltip>
          </div>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { reqMyCollection, reqDelete } from '../../../api'
export default {
  name: 'Collection',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    showCollection () {
      var userID = sessionStorage.getItem('user_id')
      const result = reqMyCollection(userID)
      result.then(response => { // response为promise里的数据
        this.tableData = response.data
      })
    },
    myDelete (row) {
      var userID = sessionStorage.getItem('user_id')
      console.log('userID=', userID)
      var info = {
        _id: userID,
        satelliteInfo: row
      }
      const result = reqDelete(info)
      result.then(response => { // response为promise里的数据
        this.tableData = response.data
        this.$notify.success('删除成功')
        this.showCollection()
      })
    }
  },
  mounted () {
    this.showCollection()
  }
}
</script>

<style scoped>

</style>
