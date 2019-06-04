<template>
  <div class="detail">
    <cube-tab-bar v-model="active" show-slider inline class="header"> <!-- 头部 -->
      <cube-tab v-for="(item) in headerItem" :label="item.label" :key="item.label" class="m-lf-10 p-0">
         <p>{{item.label}}</p>
      </cube-tab>
    </cube-tab-bar>
    <p class="clearance"></p>
    <div class="container" v-show="!addProduction"> <!-- 主体 -->
      <cube-slide ref="slide" :initial-index="initialIndex" :autoPlay="false" :show-dots="false" :options="slideOptions" @change="changePage">
        <cube-slide-item v-for="(item, index) in headerItem" :key="index">
            <cube-scroll class="plr-10" :data="headerItem" :ref="item.ref" :options="item.scrollOptions" @pulling-down="onPullingDown(item, index)" @pulling-up="onPullingUp(item, index)">
              <Fabric v-if="index === 0" :item="item.data"></Fabric>
              <Material v-if="index === 1" :item="item.data"></Material>
              <OrderStyle v-if="index === 2" :item="item.data"></OrderStyle>
              <Production v-if="index === 3" :item="item.data" @add="productionShow"></Production>
            </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
    <add v-show="addProduction" @cancel="cancel" @save="save" :productionProps="headerItem[3].data"></add>
  </div>
</template>

<script>
import Fabric from '../views/List/Fabric'
import Material from '../views/List/Material'
import OrderStyle from '../views/List/OrderStyle'
import Production from '../views/List/Production'
import add from './Add'
export default {
  name: "detail",
  components: {
    Fabric,
    Material,
    OrderStyle,
    Production,
    add
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name === 'detail') {
          this.headerItem.forEach(r => {
            r.firstHttp = false
          })
          this.changePage(0)
        }
      }
    }
  },
  data() {
    return{
      active: '订单款式',
      headerItem: [ // value 头部总数 currentPage 当前页 sum 总数 
        { label: '订单款式', ref: 'subordinate_a', address: 'trackings/detail', firstHttp: false, currentPage:1, sum: 0, data: {}, scrollOptions: {scrollbar: false, pullDownRefresh:false, pullUpLoad: false}},
        { label: '面料信息', ref: 'subordinate_b', address: 'trackings/fabric', firstHttp: false, currentPage:1, sum: 0,  data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}},
        { label: '辅料信息', ref: 'subordinate_c', address: 'trackings/excipient', firstHttp: false, currentPage:1, sum: 0, data: [], scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}},
        { label: '生产日报', ref: 'subordinate_c', address: 'trackings/daily_report', firstHttp: false, currentPage:1, sum: 0, data: {}, scrollOptions: {scrollbar: false, pullDownRefresh: {txt: ' ', stopTime: 0}, pullUpLoad: false}}
      ],
      slideOptions: {
        listenScroll: true
      },
      addProduction: false
    }
  },
  methods:{
    productionShow() {
      this.addProduction = true
    },
    cancel() {
      this.addProduction = false
    },
    save() {
      this.addProduction = false
    },
    onPullingDown(item, index) { // 下拉刷新
      item.data.splice(0) // 先把数据全部清掉
      item.currentPage = 1 // 当前页重置为1
      let parameter = { type: index + 1, pageIndex: item.currentPage, pageSize: 10 }
      this.httpPublic(parameter).then((data) => {
        item.data = item.data.concat(data.result.items) // 数组拼接
        this.$nextTick(() => {
          this.$refs[item.ref][0].forceUpdate(true)
        })
      })
    },
    onPullingUp(item, index) { // 上翻请求新数据
      item.currentPage++
      let parameter = { type: index + 1, pageIndex: item.currentPage, pageSize: 10 }
      this.httpPublic(parameter).then((data) => {
        item.data = item.data.concat(data.result.items) // 数组拼接
        this.$nextTick(() => {
          this.$refs[item.ref][0].forceUpdate(true)
        })
      })
    },
    changePage(val, _boolean) { // 点击头部，和左右滑动
      let item = this.headerItem[val]
      this.active = item.label
      if (_boolean || !item.firstHttp) { // 如果第一次没有调用过
        this.httpPublic(item, this.ginseng).then((data) => {
          item.firstHttp = true // 解决第一次调用
          if (val === 0 || val === 3) {
            item.data = data
          } else {
            item.data = item.data.concat(data.products) // 数组拼接
          }
        })
      }
    },
    async httpPublic (item, parameter) { // 公共调用接口方法
      let data = await this.$http('GET', item.address, parameter)
      return data.data
    }
  },
  mounted(){
    this.changePage(0)
  },
  computed: {
    initialIndex () { // 当前第几页
      let index = 0
      this.headerItem.forEach((item, _index) => {
        if (item.label === this.active) index = _index
      })
      return index
    },
    ginseng () {
      let query = {}
      query.tracking_gid = this.$route.query.id
      return query
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

