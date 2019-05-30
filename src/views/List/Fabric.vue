<template>
  <div class="fabric pb-10">
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">产品图片</p>
      <img src="../../assets/img/default.jpg" alt="" class="pb-10">
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">尺码信息</p>
      <ul>
        <li v-for="(item, index) in list" :key="index" class="pb-10">
          <div class="d-f f-14">
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[0]}}</span>&nbsp;<span class="c-blue248">{{item.data[0]}}</span></p>
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[1]}}</span>&nbsp;<span class="c-blue248">{{item.data[1]}}</span></p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16">合计：</p>
      </ul>
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">工厂出汇创数</p>
      <ul>
        <li v-for="(item, index) in list" :key="index" class="pb-10">
          <div class="d-f f-14">
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[0]}}</span>&nbsp;<span class="c-blue248">{{item.data[0]}}</span></p>
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[1]}}</span>&nbsp;<span class="c-blue248">{{item.data[1]}}</span></p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b"><span>合计：</span><i class="iconfont icon-xiugai1 c-blue248 f-18"/></p>
      </ul>
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">出汇创客户数</p>
      <ul>
        <li v-for="(item, index) in list" :key="index" class="pb-10">
          <div class="d-f f-14">
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[0]}}</span>&nbsp;<span class="c-blue248">{{item.data[0]}}</span></p>
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[1]}}</span>&nbsp;<span class="c-blue248">{{item.data[1]}}</span></p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b"><span>合计：</span><i class="iconfont icon-xiugai1 c-blue248 f-18"/></p>
      </ul>
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">次品数</p>
      <ul>
        <li v-for="(item, index) in list" :key="index" class="pb-10">
          <div class="d-f f-14">
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[0]}}</span>&nbsp;<span class="c-blue248">{{item.data[0]}}</span></p>
            <p class="w-50 d-f"><span class="w-50 d-b t-c">{{item.arr[1]}}</span>&nbsp;<span class="c-blue248">{{item.data[1]}}</span></p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b"><span>合计：</span><i class="iconfont icon-xiugai1 c-blue248 f-18"/></p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fabric',
  components: {
  },
  data () {
    return {
      list: [
        {arr: ['XS', 'S'], data: [1, 1]},
        {arr: ['M', 'L'], data: [2, 2]},
        {arr: ['XL', '2XL'], data: [3, 3]},
        {arr: ['3XL', '4XL'], data: [4, 4]}
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.fabric
  img
    height 1.2rem
</style>

