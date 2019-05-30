<!--滚动公共组件-->
<template>
<div>
  <cube-page type="scroll-view" title="Scroll" class="scroll">
    <div slot="content" class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="list" :scroll-events="scrollEvents" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp" @scroll-end="scrollEnd">
        <slot></slot>
      </cube-scroll>
    </div>
  </cube-page>
  <div class="page" v-show="filter">
    <span class="page-index" @click="showPicker">{{pageIndex}} / {{pageSize}}</span>
    <span class="page-btn" >
      <i class="cubeic-add" @click="addTracking" v-if="isShow"></i>
    </span>
  </div>
</div>
</template>

<script>
import CubePage from './cube-page.vue'
export default {
  name: 'scrollPage',
  props: {
    list: {
      type: Array
    },
    pageSize: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 0
    },
    options: {
      type: Object
    },
    filter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scrollEvents: ['scroll', 'scroll-end'],
      isShow: false
    }
  },
  components: {
    CubePage
  },
  computed: {
  },
  watch:{
    list:{
      handler(val){
        if (val.length) this.$refs.scroll.refresh()
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.$refs.scroll.refresh()
  },
  methods: {
    onPullingDown() { // 刷新
      this.$emit('getList', 1)
    },
    onPullingUp() { // 请求数据
      this.$emit('getList', 2)
    },
    showPicker() {
      let columns = []
      for(let i = 1; i <= this.pageSize; i++) {
        columns.push({ text: i, value: i })
      }
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "跳转",
          data: [columns],
          onSelect: this.selectHandle
        })
      } else {
        this.picker.$updateProps({
          title: '跳转',
          data: [columns],
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedIndex) { // 点击分页
      this.$emit('getList', 3, selectedIndex[0])
    },
    scrollEnd (data) { // 滚动结束
      this.$emit('scrollEnd', data)
    },
    addTracking() {
      this.$router.push('/trackingTemplate')
    }
  }
}
</script>

<style lang="stylus">
.scroll
  .content
    margin: 0 !important
    height: 100%
  .scroll-list-wrap
    position: relative
    height: 100%
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
.page
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
  z-index: 100 
  .page-index
    font-size: 0.28rem;
    padding: 0.02rem 0.3rem;
    background: #DBDBDB;
    color: #fff;
    height: 0.5rem;
    border-radius: 0.5rem;
    vertical-align: top;
    display: inline-block;
    line-height: 0.5rem;
    margin: 0.3rem 0.2rem 0 0;
  .page-btn
    font-size: 32px;
    color: #DBDBDB;
</style>

