<template>
  <div >
    <!--动态将图片轮播图的容器高度设置成与图片一致-->
    <el-carousel :height="fullHeight + 'px'" class="banner">
      <el-carousel-item >
        <div class="first1">
          <div class="first1-con">
            <p class="p1">
              遥感数据一站式服务
            </p>
            <p class="p2">
              <span>全球免费数据，持续更新</span>
              <span>国产高分辨率遥感数据，一站尽得</span>
            </p>
            <p class="p3">
              <router-link to="dataresource/1">查看详情</router-link>
            </p>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="first2">
          <div class="first2-con">
            <p class="p1">
              全球免费数据持续更新
            </p>
            <p class="p2">
              全球覆盖、永久免费、登录即可查询、下载:LANDSAT、SENTINEL、MODIS、DEM、NOAA、LUCC...
            </p>
            <p class="p3">
              <router-link to="dataresource/">查看详情</router-link>
            </p>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="first3">
          <div class="first3-con">
            <p class="p1">
              国产商业数据一站尽得
            </p>
            <p class="p2">
              <span>数据实时同步，需求个性定制，遥感数据一站式服务，即刻起航 </span>
              <span>高分1/2/3/4/5/6号、资源3号、高景数据、遥感编程数据</span>
            </p>
            <p class="p3">
              <router-link to="dataresource/2">查看详情</router-link>
            </p>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="first4">
          <div class="first4-con">
            <div class="first4-con-left">
              <p class="p1">
                数据众包价值惠大众
              </p>
              <p class="p2">
                <span>需求汇，专业团队为您按需打造专业服务；数据汇，打通数据价值链，发现隐藏价值；  </span>
                <span>任务汇，闲暇时间磨练技能，发挥专长实现价值。 </span>
              </p>
              <p class="p3">
                <router-link to="databag/1">查看详情</router-link>
              </p>
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="first5">
          <div class="first5-con">
            <p class="p1">
              <span class="span1">在线计算</span>
              <span class="span2">即时科学分析</span>
            </p>
            <p class="p2">
              <span>在线模型：应用汇集，模型天地，无需安装，数据在线处理随时响应</span>
              <span>IA编程：基于容器技术的科学数据云端分析，即时在线编程及分析</span>
            </p>
            <p class="p3">
              <router-link to="search">查看详情</router-link>
            </p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--最底端-信息-->
    <div class="bottom-info row">
      <div class="bottom1-info col-md-5">
        <img class="logo-b" src="http://www.gscloud.cn/static/icons/home/logo_b.png" />
        <p class="logo-b-name">
          <a>
            南通智能感知研究院 邮箱:
          </a>
          <a>
            电话:18049834076(数据业务) 18500059931(商务合作) 18036160804(网站问题)
          </a>
          <a>
            感谢“国家基础学科公共科学数据中心”提供支持 备案号:京ICP备09112257-62
          </a>
        </p>
      </div>
      <div class="bottom2-info col-md-2">

      </div>
      <div class="bottom3-info col-md-5">
        <ul>
          <li>
            <p>41.01万</p>
            <p>用户总数</p>
          </li>
          <li>
            <img class="line" src="http://www.gscloud.cn/static/icons/home/line.png" />
          </li>
          <li>
            <p>321</p>
            <p>昨日注册</p>
          </li>
          <li>
            <img class="line" src="http://www.gscloud.cn/static/icons/home/line.png" />
          </li>
          <li>
            <p>60849</p>
            <p>计算任务</p>
          </li>
          <li>
            <img class="line" src="http://www.gscloud.cn/static/icons/home/line.png" />
          </li>
          <li>
            <p>772TB</p>
            <p>总数据量</p>
          </li>
        </ul>
        <img class="more" src="http://www.gscloud.cn/static/icons/home/more1.png" />
      </div>
    </div>
  </div>
</template>

<script>
// import '../assets/css/TongJi.css'

import './js/rem.js'
export default {
  name: 'Banner',
  data () {
    return {
      // 图片父容器高度
      fullHeight: document.documentElement.clientHeight
    }
  },
  watch: {
    fullHeight (val) { // 监控浏览器高度变化
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    this.get_bodyHeight()
  },
  methods: {
    get_bodyHeight () { // 动态获取浏览器高度
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    }
  }
}
</script>

<style scoped>
  .banner{
    width: 100%;
    height: 100%;
    background:  #070b17;;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    margin-top: 80px;
  }
  body {
    background: #070b17;
  }

  .first1 {
    background: url("./images/4.jpg") no-repeat;
    height: 100%;
    background-size: 100% 100%; }
  .first1 .first1-con {
    width: 16.2rem;
    height: 3rem;
    padding: 0 2rem;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    text-align: right; }
  .first1 .first1-con .p1 {
    font-size: 0.6rem;
    color: white; }
  .first1 .first1-con .p2 {
    font-size: 0.18rem;
    color: #dbdbdb;
    margin-top: 20px; }
  .first1 .first1-con .p2 span {
    display: block; }
  .first1 .first1-con .p3{
    margin-right: 0;
  }

  .first2 {
    background: url("./images/5.jpg") top center no-repeat;
    background-color: #000;
    height: 100%;
    background-size: 100% 100%; }
  .first2 .first2-con {
    width: 19.2rem;
    height: 3rem;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    text-align: center; }
  .first2 .first2-con .p1 {
    font-size: 0.6rem;
    color: #ffa21c; }
  .first2 .first2-con .p2 {
    font-size: 0.18rem;
    color: #dbdbdb;
    margin-top: 20px; }

  .first3 {
    background: url("./images/earth.jpg") no-repeat;
    height: 100%;
    background-size: 100% 100%; }
  .first3 .first3-con {
    width: 16.2rem;
    height: 3rem;
    padding: 0 1rem;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    text-align: left; }
  .first3 .first3-con .p1 {
    font-size: 0.6rem;
    color: white; }
  .first3 .first3-con .p2 {
    font-size: 0.18rem;
    color: #dbdbdb;
    margin-top: 20px; }
  .first3 .first3-con .p2 span {
    display: block; }
  .first3 .first3-con .p3{
    margin-right: 0;
  }

  .first4 {
    width: 19.2rem;
    background: url("./images/1.jpg") no-repeat;
    height: 100%;
    background-size: 100% 100%; }
  .first4 .first4-con {
    width: 19.2rem;
    height: 4.96rem;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%); }
  .first4 .first4-con .first4-con-left {
    padding-left: 1rem;
    height: 3rem;
    color: white;
    flex: 1;
    text-align: left; }
  .first4 .first4-con .first4-con-left .p1 {
    font-size: 0.6rem;
    color: white; }
  .first4 .first4-con .first4-con-left .p2 {
    font-size: 0.18rem;
    color: #dbdbdb;
    margin-top: 20px; }
  .first4 .first4-con .first4-con-left .p3 {
    margin-left: 0;
  }
  .first4 .first4-con .first4-con-left .p2 span {
    display: block; }
  .first4 .first4-con .first4-con-right {
    width: 4.96rem;
    height: 4.96rem;
    margin-right: 4.12rem;
    position: relative; }
  .first4 .first4-con .first4-con-right .img1 {
    width: 4.96rem; }
  .first4 .first4-con .first4-con-right .img2 {
    width: 1.2rem;
    position: absolute;
    top: 51%;
    left: 52%;
    /*transform: translate;*/
    transform: translate(-50%, -50%); }
  .first5 {
    background: url("./images/2.jpg") no-repeat;
    height: 100%;
    background-size: 100% 100%; }
  .first5 .first5-con {
    width: 16.2rem;
    height: 3rem;
    padding: 0 2rem;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    text-align: right; }
  .first5 .first5-con .p1 {
    font-size: 0.6rem;
    color: white; }
  .first5 .first5-con .p2 {
    font-size: 0.18rem;
    color: #dbdbdb;
    margin-top: 20px; }
  .first5 .first5-con .p2 span {
    display: block; }
  .first5 .first5-con .p3{
    margin-right: 0;
  }

  .main-content {
    width: 19.2rem;
    position: absolute;
    height: 9.66rem;
    background: #070b17;
    margin: 0;
    top: 50%;
    transform: translate(0, -50%);
    /*margin-top: 80px;*/
  }
  .p3{
    font-size: 0.18rem;
    margin: 0.25rem;
  }
  .p3 a{
    padding:0.12rem 0.24rem;
    color: #dbdbdb;
    border: 2px solid #dbdbdb;
  }
  .bottom-info {
    width: 19.2rem;
    position: absolute;
    left: 0;
    padding: 0;
    bottom: 0.5rem;
    height: 0.63rem;
    z-index: 2;
    font-size: 0.12rem;
    margin: 0; }
  .bottom-info .bottom1-info {
    padding-left: 0.25rem;
    font-size: 0.12rem; }
  .bottom-info .bottom1-info .logo-b {
    width: 34px;
    position: relative;
    top: 0px; }
  .bottom-info .bottom1-info .logo-b-name {
    padding-left: 0.09rem;
    display: inline-block;
    color: #ccc; }
  .bottom-info .bottom1-info .logo-b-name a {
    display: block;
    overflow: hidden;
    white-space: nowrap; }

  .bottom-info .bottom3-info {
    text-align: right;
    margin-top: -0.5rem;
  }
  .bottom-info .bottom3-info ul {
    display: inline-block;
    margin: 0; }
  .bottom-info .bottom3-info ul li {
    display: inline-block; }
  .bottom-info .bottom3-info ul li p {
    margin: 0; }
  .bottom-info .bottom3-info ul li p:first-child {
    font-size: 0.14rem;
    color: white; }
  .bottom-info .bottom3-info ul li p:last-child {
    font-size: 0.12rem;
    color: #7e8085; }
  .bottom-info .bottom3-info ul li .line {
    vertical-align: baseline;
    padding: 0 0.22rem; }
  .bottom-info .bottom3-info .more {
    padding: 0.16rem 0.25rem 0 0.40rem;
    vertical-align: top; }
</style>
