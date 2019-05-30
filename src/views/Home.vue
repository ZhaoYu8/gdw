<template>
  <div class="home">
    <globalSearch :options="inputOptions"></globalSearch>
    <div class= "content-list">  <!-- 列表区域 -->
     <trackingScrollPage :list ="items" :pageSize ='search.pageSize' :pageIndex ='search.pageIndex' :options ='options' @getList ='getList' @scrollEnd="scrollEnd"> 
       <ul>
        <li v-for ="(item, index) in items" :key ="index">
           <div class="list p-10 pr-12 pl-12">
            <p class="pb-10 f-14">
              头部
            </p>
            <div class="d-f" @click="goDetails">
              <img src="../assets/img/default.jpg" alt="">
              <div class="f-1 c-666 d-f f-d-c j-c-s-b ml-10 f-12">
                <p class="f-w-5">客户名称：<span>测试李三</span></p>
                <p class="f-w-5">款式名称：<span>测试新款</span></p>
                <p class="f-w-5">加工厂名称：<span>测试李三加工厂</span></p>
              </div>
              <div class="d-f a-i-c button t-c">
                <p class="c-fff bgc-blue248 f-14">审批</p>
              </div>
            </div>
           </div>
        </li>
       </ul>
     </trackingScrollPage>
    </div>
  </div>
</template>

<script>
import GlobalSearch from '../components/common/GlobalSearch'
import TrackingScrollPage from '../components/common/TrackingScrollPage'
import { setTimeout } from 'timers';
export default {
  name: 'home',
  components: {
    'globalSearch': GlobalSearch,
    'trackingScrollPage': TrackingScrollPage
  },
  data () {
    return {
      inputOptions: {
        focus: false,
        placeholder: '请输入订单号 / 客户名称'
      },
      items: [
      ],
      options: {
        pullDownRefresh: {threshold: 90, txt: ' '},
        pullUpLoad: true,
        scrollbar: true
      },
      search: {
        pageSize: 10,
        pageIndex: 1
      }
    }  
  },
  methods: {
    searchQuery (val) {
      console.log(val)
    },
    getList (val) {
      if (val === 1) {
        setTimeout(() => {
          this.items.splice(0)
          for (let index = 0; index < 10; index++) {
            this.items.push({name: index})
          }
          this.search.pageIndex = 1
        }, 2000)
      } else {
        setTimeout(() => {
          for (let index = 0; index < 10; index++) {
            this.items.push({name: index})
          }
          this.search.pageIndex++
        }, 2000)
      }
    },
    scrollEnd (val) {
      console.log(val)
    },
    goDetails () {
      this.$router.push({path: '/detail'})
    }
  },
  mounted () {
    for (let index = 0; index < 10; index++) {
      this.items.push({name: index})
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  .content-list
    position absolute
    top 1rem
    left 0
    bottom 0
    right 0
  .list
    border-bottom .02rem solid #eeeeee
    img
      height 1.2rem
    .button
      p
        height .5rem
        width 1rem
        line-height .5rem
        border-radius .05rem
</style>

