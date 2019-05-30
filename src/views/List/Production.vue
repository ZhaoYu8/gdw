<template>
  <div class="production">
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>记录时间</span></p>
      <ul>
        <li v-for="(item, index) in list1" :key="index" class="pb-10">
          <div class="d-f f-14 ht-20">
             <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-l">{{item.arr[0]}}</span>
              <span class="f-1 t-c">{{item.data[0]}}</span>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-l">{{item.arr[1]}}</span>
              <span class="f-1 t-c">{{item.data[1]}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
      <p class="add" @click="goRouter">
        <i class="iconfont icon-tianjia"></i>
      </p>
  </div>
</template>

<script>
export default {
  name: 'production',
  components: {
  },
  data () {
    return {
      list1: [
        {arr: ['上线人数', '工作时间'], data: ['1213', '321']},
        {arr: ['裁片上线数', '成衣上线数'], data: ['23', '321']},
        {arr: ['车位半成品数', '返修人数'], data: ['321', '321']},
        {arr: ['后道检验人', '记录人'], data: [4, 4]}
      ],
      buttonType0: true
    }
  },
  methods: {
    edit(type) {
      let id = `buttonType${type}`
      this[id] = !this[id]
    },
    goRouter() {
      this.$router.push({path: '/add'})
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.add
  position fixed
  bottom 1.5rem
  right .5rem
  height 1rem
  width 1rem
  text-align center
  line-height 1rem
  box-shadow 0 0 .1rem #ccc
  border-radius 50%
  background-color rgb(82,156,248)
  i
    color #fff
    font-size .5rem
</style>

