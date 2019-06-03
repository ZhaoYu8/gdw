<template>
  <div class="search">
    <form action="javascript:return true">
      <input type ="search" ref ="GlobalSearch"  @keypress="searchGoods"  v-model ="data.value" :placeholder ="data.placeholder" @click="inputFocus" @blur="inputBlurFocus"/>
      <span v-show="!data.show" :class ="{ hide : !data.button }" @mousedown="inputCancel">{{data.text}}</span>
      <slot></slot>
    </form>
    <i class="cubeic-search icon-search"></i>
  </div>
</template>
<script>

export default {
  name: 'GlobalSearch',
  props: ['options'],
  components: {
  },
  data () {
    return {
      default: {
        value: '',
        placeholder: '请选择', // 提示文字
        focus: false, // 是否自动获取焦点
        button: false, // 按钮
        text: '取消'
      }
    }
  },
  computed: {
    data () {
      let datas = this.default
      if (this.options) {
        for(let i in this.options) {
          datas[i] = this.options[i]
        }
        datas.button = datas.focus ? true : false
      }
      return datas
    }
  },
  methods: {
    inputFocus() { // 获取焦点
      this.data.button = true
      this.$emit('focus')
    },
    inputBlurFocus () {
      this.data.button = false
    },
    inputCancel () { // 点击取消
      this.data.value = ''
      this.data.button = false
      this.$emit('blur', '')
    },
    searchGoods (event) { // 点击搜索
      if (event.keyCode === 13) { //如果按的是enter键 13是enter 
        event.preventDefault() //禁止默认事件
        this.$emit('confirm', this.data.value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  input[type = search]::-webkit-search-cancel-button{
    -webkit-appearance: none
  }
  width 100%
  font-size .28rem
  position relative
  background-color rgb(239, 239, 244) // 头部底部颜色
  height 1rem
  line-height 1rem
  .icon-search // 图标
    position absolute
    color #BABABA
    vertical-align middle
    left .3rem
    top 0
  form
    margin 0 .2rem
    display flex
    align-items center
    height 100%
    input
      height .6rem
      line-height .6rem
      border-radius .2rem
      padding-left .4rem
      width 100%
      vertical-align middle
      flex 6
    span 
      flex 1
      text-align center
      font-size .3rem
      color #529CF8
      margin-right -.2rem
</style>
