<template>
    <el-main>
      <div class="div2">
        <span class="title2">账号认证</span>
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:200px">
          <el-option label="未认证" value="ProductID"></el-option>
          <el-option label="基本信息认证" value="SceneID"></el-option>
          <el-option label="实名认证" value="SceneRow"></el-option>
        </el-select>

        <span class="title2" style="margin-left: 15px">账号状态</span>
        <el-select v-model="select1" slot="prepend" placeholder="请选择" style="width:200px">
          <el-option label="未激活" value="ProductID"></el-option>
          <el-option label="已激活" value="SceneID"></el-option>
          <el-option label="已停用" value="SceneRow"></el-option>
        </el-select>
      </div>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        tooltip-effect="light"
        style="width: 100%"
        @select="getRow"
        :header-cell-style="{background:'#409EFF',color:'white',fontWeight:'bold'}">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          width="80px"
          label="序号"
          class="title1">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="useremail"
          width="200px"
          label="用户邮箱">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用户等级">
        </el-table-column>
        <el-table-column
          prop="registerData"
          width="200px"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="lastLoginData"
          width="200px"
          label="最后登录时间">
        </el-table-column>
        <el-table-column
          prop="certification"
          label="认证情况">
        </el-table-column>
        <el-table-column
          prop="accountStatus"
          label="账号状态">
        </el-table-column>
        <el-table-column label="操作" type="index" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <div class="bottom">
                <!--<el-tooltip class="item" effect="dark" content="查看" placement="bottom-start">
                  <el-button type="info" icon="el-icon-info" size="mini"  @click="detail(scope.row)" circle></el-button>
                </el-tooltip>-->
                <el-button type="primary" size="mini"  @click="detail(scope.row)">查看</el-button>
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
    </el-main>
</template>

<script>
import { reqAccount } from '../../../api'
export default {
  name: 'UsersManage',
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      console.log('select=', this.select)
      // this.satellites()
    }
  },
  mounted () {
    reqAccount(this.currentPage, this.pagesize).then(response => {
      this.tableData = response.data.users
      this.loading = false
    })
  },
  data () {
    return {
      totalNumb: 0,
      tableData3: [],
      currentRow: 1, // 当前行
      currentPage: 1, //  el-pagination 初始页
      pagesize: 10,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      select: '',
      value: '',
      loading: true,
      downloading: true,
      downLoading: false
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
  .demo-image{
    position: absolute;
    left:10px;
    color: #409EFF;
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
  .bottom {
    clear: both;
    text-align: center;
  }
  .title1{
    color: black;
    font-size: 16px;
    text-align: center;
  }
  .title2{
    color: #2a3147;
    font-size: 14px;
    /*margin-right: 20px;*/
  }
  .el-breadcrumb-item:last-child {
    color: #d43c33;
  }
  .search-div{
    float: right;
  }
</style>
