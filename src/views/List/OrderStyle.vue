<template>
  <div class="orderstyle">
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>品名</span><span class="c-blue248">规格编号</span></p>
      <ul>
        <li v-for="(item, index) in list1" :key="index" class="pb-10">
          <div class="d-f f-14">
             <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-l">{{item.arr[0]}}</span>
              <cube-input class="f-1" :class="{'c-blue': index > 2}" v-model="item.data[0]" :disabled="buttonType0"></cube-input>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-l">{{item.arr[1]}}</span>
              <cube-input class="f-1" :class="{'c-blue': index > 2}" v-model="item.data[1]" :disabled="buttonType0"></cube-input>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b">
          <span>合计：</span>
          <span @touchend.stop.prevent="edit(0)">
            <i class="iconfont icon-xiugai1 c-blue248 f-18" v-show="buttonType0"/>
            <i class="iconfont icon-baocun c-red75 f-18" v-show="!buttonType0"/>
          </span>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderstyle',
  components: {
  },
  data () {
    return {
      list1: [
        {arr: ['供应商', '类型'], data: ['测试', '测试']},
        {arr: ['颜色色号', '幅宽'], data: ['测试', '测试']},
        {arr: ['单位'], data: ['测试']},
        {arr: ['实际发货', '实际到货'], data: [4, 4]},
        {arr: ['实际用量', '工厂退QC'], data: [4, 4]},
      ],
      buttonType0: true
    }
  },
  methods: {
    edit(type) {
      let id = `buttonType${type}`
      this[id] = !this[id]
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
</style>

