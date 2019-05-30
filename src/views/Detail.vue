<template>
  <div class="detail">
    <cube-tab-bar v-model="active" show-slider inline class="header"> <!-- 头部 -->
      <cube-tab v-for="(item) in headerItem" :label="item.label" :key="item.label" class="m-lf-10 p-0">
         <p>{{item.label}}</p>
      </cube-tab>
    </cube-tab-bar>
    <p class="clearance"></p>
    <div class="container"> <!-- 主体 -->
      <cube-slide ref="slide" :initial-index="initialIndex" :autoPlay="false" :show-dots="false" :options="slideOptions" @change="changePage">
        <cube-slide-item v-for="(item, index) in headerItem" :key="index">
            <cube-scroll class="plr-10" :data="headerItem" :ref="item.ref" :options="item.scrollOptions" @pulling-down="onPullingDown(item, index)" @pulling-up="onPullingUp(item, index)">
              <Fabric v-if="index === 0"></Fabric>
              <Material v-if="index === 1"></Material>
              <OrderStyle v-if="index === 2"></OrderStyle>
              <Production v-if="index === 3"></Production>
            </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Fabric from '../views/List/Fabric'
import Material from '../views/List/Material'
import OrderStyle from '../views/List/OrderStyle'
import Production from '../views/List/Production'

export default {
  name: "detail",
  components: {
    Fabric,
    Material,
    OrderStyle,
    Production
  },
  data() {
    return{
      active: '订单款式',
      headerItem: [ // value 头部总数 currentPage 当前页 sum 总数 
        { label: '订单款式', ref: 'subordinate_a', firstHttp: false, id: 'lastOverQty',  value: 0, currentPage:1, sum: 0, data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}},
        { label: '面料信息', ref: 'subordinate_b', firstHttp: false, id: 'todayTaskQty', value: 0, currentPage:1, sum: 0,  data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}},
        { label: '辅料信息', ref: 'subordinate_c', firstHttp: false, id: 'outTaskQty', value: 0, currentPage:1, sum: 0, data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}},
        { label: '生产日报', ref: 'subordinate_c', firstHttp: false, id: 'outTaskQty', value: 0, currentPage:1, sum: 0, data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}}
      ],
      slideOptions: {
        listenScroll: true
      }
    }
  },
  methods:{
    onPullingDown(item, index) { // 下拉刷新
      item.data.splice(0) // 先把数据全部清掉
      item.currentPage = 1 // 当前页重置为1
      let parameter = { type: index + 1, pageIndex: item.currentPage, pageSize: 10 }
      this.httpGetBranchTaskPage(parameter).then((data) => {
        item.scrollOptions.pullUpLoad = data.result.items.length < 10 ? false : {txt: ' ', stopTime: 0}
        item.data = item.data.concat(data.result.items) // 数组拼接
        this.$nextTick(() => {
          this.$refs[item.ref][0].forceUpdate(true)
        })
      })
    },
    onPullingUp(item, index) { // 上翻请求新数据
      item.currentPage++
      let parameter = { type: index + 1, pageIndex: item.currentPage, pageSize: 10 }
      this.httpGetBranchTaskPage(parameter).then((data) => {
        item.scrollOptions.pullUpLoad = data.result.items.length < 10 ? false : {txt: ' ', stopTime: 0}
        item.data = item.data.concat(data.result.items) // 数组拼接
        this.$nextTick(() => {
          this.$refs[item.ref][0].forceUpdate(true)
        })
      })
    },
    changePage(val) { // 点击头部，和左右滑动
      let item = this.headerItem[val], parameter = { type: val + 1, pageIndex: item.currentPage, pageSize: 10 }
      this.active = item.label
      if (!item.firstHttp && item.value) { // 如果第一次没有调用过
        this.httpGetBranchTaskPage(parameter).then((data) => {
          item.firstHttp = true // 解决第一次调用
          item.data = item.data.concat(data.result.items) // 数组拼接
          item.sum = Math.ceil(Number(data.result.totalCount)/10) // 总页
          item.scrollOptions.pullUpLoad =  item.sum > 1 ? {txt: ' ', stopTime: 0} : false
        })
      }
    },
    httpGetBraTaskTotal () { // 页面初始化加载的方法
        let data = {
          result : {}
        }
        this.headerItem.forEach((item) => {
          item.value = data.result[item.id]
        })
    },
    // type  任务统计 1.昨日完成 2.今日到期 3.全部逾期 订单统计 1.作日新增 2.今日新增 3.本周截止 4.过期业务 ,
    async httpGetBranchTaskPage (parameter) { // 公共调用接口方法
      let data = await this.$http('post', 'api/services/app/rptTotal/GetBranchTaskPage', parameter)
      if (data.data.success === true ) {
        return data.data
      } else {
        this.$global.toast(data.data.error.message,'error')
      }
    }
  },
  mounted(){
    this.httpGetBraTaskTotal() // 先调用头部接口
  },
  computed: {
    initialIndex () {
      let index = 0
      this.headerItem.forEach((item, _index) => {
        if (item.label === this.active) index = _index
      })
      return index
    }
  }
}
</script>
<style lang="stylus" scoped>
.font-green
  color rgb(70, 226, 96)
.font-yellow
  color rgb(250, 187, 53)
.font-red
  color rgb(255, 75, 75)
.detail
  position relative
  height 100%
  color #666666
  .header
    height 1rem
    line-height 1rem
    font-size .28rem
  .clearance
    height .2rem
    background #eee
  .container
    position absolute
    top 1.2rem
    left 0
    right 0
    bottom 0
</style>
<style lang="stylus">
.cube-tab_active
  color rgb(82,156,248)
.cube-tab-bar-slider
  background-color rgb(82,156,248)
</style>

