<template>
  <div class="crowd-main">
    <div class="demand-wrap">
      <!-- 介绍 -->
      <div class="row1">
        <img class="img1" src="./images/t1.jpg" />
<!--        <img class="img3" src="./images/t1.jpg" />-->
        <div class="con1">
          <p class="p1">
            <a class="a11">有需求,</a><a class="a12">交给我们</a>
          </p>
          <p class="p2">
            <a class="a21">电话：</a>
            <a class="a22">18049834076(数据业务)</a>
            <a class="a22">18500059931(商务合作)</a>
            <a class="a22">18036160804(网站问题)</a>
          </p>
          <p class="p2">
            <a class="a21">邮箱：</a><a class="a22">18036160804@163.com</a>
          </p>
          <p class="p3">
            <!--                    <input type="button" class="btn btn-primary goline_write" value="提交需求">-->
            <el-button type="danger" @click="dialogVisible = true">提交需求</el-button>
          </p>
          <div class="con2">
            <p class="p1">
              需求汇是遥感卫星数据管理平台（以下简称RSDM）新开发的功能模块，是面向数据需求者的需求汇集地。RSDM服务十几年，积累约800TB数据，40万真实用户，我们的用户都有地学遥感背 景，分布各行各业、
              遍布全国各地，其中不乏地学遥感领域的专家和技术能手，无论您的需求多么特殊，我们相信,总有一
              人可以满足您的需求，况且还有RSDM为您的数据质量严格把关。如果您需要某类地学或遥感数据产品，如果您没有时间，或者您缺乏必要的基础数
              据、技术和环境支持，请联系我们！您只负责提要求，RSDM会为您提供高质量数据产品。RSDM携其九万专业用户期待为您提供贴心服务。
            </p>
          </div>
        </div>
        <el-dialog
          title="收集需求"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose">
          <span>请输入您的需求：</span>
          <el-input></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 服务范围 -->
      <div class="row2">
        <p class="p1">
          服务范围
        </p>
        <div class="div1">
          <div class="dd dd-left"
               @mouseenter="changeImageSrc(1, 'hover')"
               @mouseleave="changeImageSrc(1, '')">
            <img class="f1" :src="f1Src"/>
            <p class="dp1">
              遥感影像解译
            </p>
            <p class="dp2">
              基于不同精度的遥感影像进行解译，解译标准由您提出，或者和RSDM商讨后共同确定。可以解译的数据包括平台拥有的数据资源、高精度商业数据资源、或者您提供的其他遥感影像。
            </p>
          </div>
          <div class="dd"
               @mouseenter="changeImageSrc(2, 'hover')"
               @mouseleave="changeImageSrc(2, '')">
            <img class="f2" :src="f2Src" />
            <p class="dp1">
              专题图制作
            </p>
            <p class="dp2">
              基于已有的地图资料、统计数据、实验数据等，对您需要的区域、要素等进行制图，输出独立值图、分类符号图、等级色彩图、点制图、统计图、组合符号图等不同类型专题图。
            </p>
          </div>
          <div class="dd"
               @mouseenter="changeImageSrc(3, 'hover')"
               @mouseleave="changeImageSrc(3, '')">
            <img class="f3" :src="f3Src" />
            <p class="dp1">
              地图矢量化
            </p>
            <p class="dp2">
              可以对各类精度的纸质图件或电子图件进行矢量化，如果图件属于涉密成果，我们承诺会严格保密并签署保密协议。
            </p>
          </div>
        </div>
        <div class="div1">
          <div class="dd dd-left"
               @mouseenter="changeImageSrc(4, 'hover')"
               @mouseleave="changeImageSrc(4, '')">
            <img class="f4" :src="f4Src" />
            <p class="dp1">
              大数据计算
            </p>
            <p class="dp2">
              利用RSDM现有的数据资源软件技术、人才积累和云基础设施，解决您在科研应用中针对大规模数据处理遇到的难题。
            </p>
          </div>
          <div class="dd"
               @mouseenter="changeImageSrc(5, 'hover')"
               @mouseleave="changeImageSrc(5, '')">
            <img class="f5" :src="f5Src" />
            <p class="dp1">
              数据预处理
            </p>
            <p class="dp2">
              对各类数据进行预处理，包括几何校正、图像配准、图像融合、图像镶嵌与裁剪、大气校正、去云、去阴影等。
            </p>
          </div>
          <div class="dd"
               @mouseenter="changeImageSrc(6, 'hover')"
               @mouseleave="changeImageSrc(6, '')">
            <img class="f6" :src="f6Src" />
            <p class="dp1">
              其他数据定制
            </p>
            <p class="dp2">
              任何您需要的数据定制，都可以与我们联系！我们会竭诚为您提供解决方案！
            </p>
          </div>
        </div>
      </div>
      <!-- 服务流程 -->
      <div class="row3">
        <p class="p1">
          服务流程
        </p>
        <table class="row3-con">
          <tr class="div1 border-bottom1">
            <td class="dd dd1">
              <img class="w1" src="./images/w1.png" />
              <p class="dp1">
                需求提出
              </p>
              <p class="dp2">
                用户向RSDM提出数据需求
              </p>
            </td>
            <td class="dd dd2 border-left1 border-right1">
              <img class="w2" src="./images/w2.png" />
              <p class="dp1">
                服务确认
              </p>
              <p class="dp2">
                RSDM和用户联系，进行需求确认，签订数据服务合同
              </p>
            </td>
            <td class="dd dd3">
              <img class="w3" src="./images/w3.png" />
              <p class="dp1">
                任务领取
              </p>
              <p class="dp2">
                需求任务启动，RSDM进行合理的任务拆分，并在RSDM官网、微博、微信等平台发布，用户报名领取任务，经过多重筛选后，优选多人领取此任务，并签订任务领取协议
              </p>
            </td>
          </tr>
          <tr class="div1">
            <td  class="dd dd-img border-right1" rowspan="2" colspan="2" align="center">
              <img class="e-img" src="./images/d5.png" />
            </td>
            <td class="dd dd4 border-bottom1">
              <img class="w4" src="./images/w4.png" />
              <p class="dp1">
                数据加工
              </p>
              <p class="dp2">
                任务领取人进行数据加工，需定期向RSDM反馈任务进度，并在规定期限内向RSDM返回数据成果及对应说明文档
              </p>
            </td>
          </tr>
          <tr class="div1 border-bottom1">
            <td class="dd dd5 border-bottom1"> <img class="w5" src="./images/w5.png" />
              <p class="dp1">
                质量检查
              </p>
              <p class="dp2">
                RSDM组织数据质量评估员对数据质量进行评估，RSDM选用数据质量达标的最优数据结果，并将数据结果交付给需求用户
              </p>
            </td>
          </tr>
          <tr class="div1">
            <td class="dd dd8">
              <img class="w8" src="./images/w8.png" />
              <p class="dp1">
                售后服务
              </p>
              <p class="dp2">
                保证期内，RSDM将承诺对此数据进行修正等服务保证期后RSDM会持续对此数据提供咨询服务
              </p>
            </td>
            <td class="dd dd7 border-left1 border-right1">
              <img class="w7" src="./images/w7.png" />
              <p class="dp1">
                需求完成
              </p>
              <p class="dp2">
                如果用户确认数据成果合格RSDM将合格数据交付给用户，需求任务完成
              </p>
            </td>
            <td class="dd dd6">
              <img class="w6" src="./images/w6.png" />
              <p class="dp1">
                用户确认
              </p>
              <p class="dp2">
                需求用户进行最后确认，如果用户不满意，提出修正意见，返回给RSDM，重复数据加工、质量检查、用户确认的流程
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import './css/new-crowd.css'
export default {
  name: 'XuQiuHui',
  data () {
    return {
      dialogVisible: false,
      f1Src: require('./images/f1.png'),
      f2Src: require('./images/f2.png'),
      f3Src: require('./images/f3.png'),
      f4Src: require('./images/f4.png'),
      f5Src: require('./images/f5.png'),
      f6Src: require('./images/f6.png')
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // “服务范围”：hover的时候，换蓝色的图标，否正是灰色的图标
    changeImageSrc (key, way) {
      let tempStr = way === 'hover' ? 'Hover' : ''
      switch (key) {
        case 1:
          this.f1Src = require(`./images/f1${tempStr}.png`)
          break
        case 2:
          this.f2Src = require(`./images/f2${tempStr}.png`)
          break
        case 3:
          this.f3Src = require(`./images/f3${tempStr}.png`)
          break
        case 4:
          this.f4Src = require(`./images/f4${tempStr}.png`)
          break
        case 5:
          this.f5Src = require(`./images/f5${tempStr}.png`)
          break
        case 6:
          this.f6Src = require(`./images/f6${tempStr}.png`)
          break
      }
    }
  }
}
</script>
<style scoped>
  .el-dialog__header{
    padding:20px 20px 10px;
    background-color: #B3EBF5;
    background: red;
  }
</style>
