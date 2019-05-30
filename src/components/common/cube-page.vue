<template>
  <div class="cube-page" :class="type">
    <!-- <header class="header">
      <h1>{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </header> -->
    <div class="wrapper">
      <!-- <section v-show="desc" class="desc"><slot name="desc">{{desc}}</slot></section> -->
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cube-page
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    .header
      position: relative
      height: 44px
      line-height: 44px
      text-align: center
      background-color: #edf0f4
      box-shadow: 0 1px 6px #ccc
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      z-index: 5
      h1
        font-size: 16px
        font-weight: 700
      .cubeic-back
        position: absolute
        top: 0
        left: 0
        padding: 0 15px
        color: #fc9153
    >.wrapper
      height: calc(100%)
      overflow-x: hidden
      overflow-y: auto
      // -webkit-overflow-scrolling: touch
      .desc
        padding: 10px
        margin: 10px 0
        line-height: 20px
        font-size: 14px
      .content
        margin: 10px

    &.option-demo
      .wrapper
        background-color: #fff
      .title
        font-size: .32rem
        font-weight: 500
        color: #333
        padding: 15px
        border-bottom: 1px solid rgba(0, 0, 0, .1)
        margin-bottom: 15px
      .options
        margin-bottom: 15px
      .option-list
        .group
          margin-bottom: 15px
          border: 1px solid rgba(0, 0, 0, .1)
          border-radius: .1rem
        .item
          height: 52px
          border-bottom: 1px solid rgba(0, 0, 0, .1)
          &.sub
            font-size: .28rem
            background-color: rgba(0, 0, 0, .04)
            &.first
              box-shadow: 0 1px 1px 1px #eee inset
            &.last
              border-bottom: none
      .demo
        margin-bottom: 15px
      .methods
        .method-list
          .group
            margin-bottom: 15px
            border: 1px solid rgba(0, 0, 0, .1)
            border-radius: .1rem
          .item
          button
            height: 40px
            font-size: .32rem
          .item
            background-color: #ddd
            border-bottom: 1px solid rgba(0, 0, 0, .1)
          button
            width: 100%
            border-bottom-left-radius: .1rem
            border-bottom-right-radius: .1rem
            background-color: #fc9153
            box-shadow: 0 0 0 1px #fc9153
            border: none
            outline: none
            color: #fff
</style>
