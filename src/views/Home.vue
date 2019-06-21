<template>
  <div class="home">
    <globalSearch :options="inputOptions" @confirm="searchQuery" @blur="searchQuery"></globalSearch>
    <div class= "content-list">  <!-- 列表区域 -->
     <trackingScrollPage :list ="items" :pageSize ='search.pageSize' :pageIndex ='search.pageIndex' :options ='options' @getList ='getList'> 
       <ul>
        <li v-for ="(item, index) in items" :key ="index">
           <div class="list p-10 pr-12 pl-12">
            <p class="pb-10 f-14 d-f j-c-s-b headerText">
              <span class="f-1 hidden">{{item.product_name}}{{item.customer_name}}</span>
              <span class="f-1 t-r">交付时间: {{item.delivery_date}}</span>
            </p>
            <div class="d-f" @click="goDetails(item)">
              <img src="../assets/img/default.jpg" alt="" v-if="!item.file_path">
              <img :src='item.file_path' alt="" v-else>
              <div class="f-1 c-666 d-f f-d-c j-c-s-b ml-10 f-12 hidden">
                <p class="f-w-5 hidden">客户名称：<span>{{item.customer_name}}</span></p>
                <p class="f-w-5 d-f">款式名称：<span class="w-80 hidden">{{item.product_name}}</span></p>
                <p class="f-w-5">加工厂名称：<span>{{item.factory_name}}</span></p>
              </div>
              <div class="d-f a-i-c button t-c">
                <p class="c-fff bgc-blue248 f-14" :class="typeColor(item.last_status)">{{item.last_task}}</p>
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
        pageSize: 0,
        pageIndex: 1
      },
      search_query: ''
    }  
  },
  computed: {
    ginseng () {
      let query = {
        page: this.search.pageIndex,
        code: this.$route.query.code || this.getQueryVariable('code') || 0
      }
      if (this.search_query) {
        query.query = this.search_query
      }
      return query
    }
  },
  methods: {
    typeColor (type) {
      let arr = ['incomplete', 'completing', 'completed', 'abort', 'skip'], color = ['bgc-gray231', 'bgc-yellow53', 'bgc-green96', 'bgc-red75', 'bgc-blue248']
      return color[arr.indexOf(type)] || 'bgc-gray231'
    },
    getQueryVariable(variable) {
       let query = window.location.search.substring(1)
       let vars = query.split("&")
       for (let i=0; i < vars.length; i++) {
        let pair = vars[i].split("=")
        if (pair[0] === variable) {
          return pair[1]
        }
       }
       return(false)
    },
    searchQuery (val) {
      this.search_query = val
      this.items.splice(0)
      this.search.pageIndex = 1
      this.$http('GET', "trackings", this.ginseng).then((data) => {
        this.search.pageSize = data.data.paginate_meta.total_pages
        this.items = this.items.concat(data.data.result)
        this.options.pullUpLoad = data.data.result.length < 8 ? false : true
      })
    },
    getList (val, count) {
      if (val === 1) {
        this.search.pageIndex = 1
        this.items.splice(0)
        this.$http('GET', "trackings", this.ginseng).then((data) => {
          this.search.pageSize = data.data.paginate_meta.total_pages
          this.search.pageIndex = 1
          this.items = this.items.concat(data.data.result)
          this.options.pullUpLoad = data.data.result.length < 8 ? false : true
        })
      } else if (val === 2) {
        this.search.pageIndex++
        this.$http('GET', "trackings", this.ginseng).then((data) => {
          this.search.pageSize = data.data.paginate_meta.total_pages
          this.items = this.items.concat(data.data.result)
          this.options.pullUpLoad = data.data.result.length < 8 ? false : true
          if (!data.data.result.length) { // 为0的时候
            this.search.pageIndex--
          }
        })
      } else {
        this.items.splice(0)
        this.search.pageIndex = count
        this.$http('GET', "trackings", this.ginseng).then((data) => {
          this.search.pageSize = data.data.paginate_meta.total_pages
          this.items = this.items.concat(data.data.result)
          this.options.pullUpLoad = data.data.result.length < 8 ? false : true
        })
      }
    },
    goDetails (item) {
      this.$router.push({name: 'detail', query: {id: item.tracking_gid}})
    }
  },
  mounted () {
    this.$global.setCode(this.ginseng.code)
    this.$http('GET', "trackings", this.ginseng).then((data) => {
      this.search.pageSize = data.data.paginate_meta.total_pages
      this.items = this.items.concat(data.data.result)
      this.options.pullUpLoad = data.data.result.length < 8 ? false : true
    })
  }
}
</script>
<style lang="stylus" scoped>
.home
  .content-list
    position absolute
    top 1.02rem
    left 0
    bottom 0
    right 0
  .list
    border-bottom .02rem solid #eeeeee
    .headerText
      height .36rem
      line-height .36rem
    img
      width 1.2rem
      height 1.2rem
    .button
      p
        padding 0 .2rem
        height .5rem
        line-height .5rem
        border-radius .05rem
.hidden
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
</style>

