<template>
  <div class="fabric pb-10">
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">产品图片</p>
      <img src="../../assets/img/default.jpg" alt="" class="pb-10">
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">尺码信息</p>
      <ul>
        <li v-for="(item, index) in list0" :key="index" class="pb-10">
          <div class="d-f f-14">
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[0]}}</span>
              <span class="c-blue248 f-1">{{item.data[0]}}</span>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[1]}}</span>
              <span class="c-blue248 f-1">{{item.data[0]}}</span>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16">合计：</p>
      </ul>
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">工厂出汇创数</p>
      <ul>
        <li v-for="(item, index) in list1" :key="index" class="pb-10">
          <div class="d-f f-14">
             <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[0]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[0]" :disabled="buttonType0"></cube-input>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[1]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[1]" :disabled="buttonType0"></cube-input>
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
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">出汇创客户数</p>
      <ul>
        <li v-for="(item, index) in list2" :key="index" class="pb-10">
          <div class="d-f f-14">
             <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[0]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[0]" :disabled="buttonType0"></cube-input>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[1]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[1]" :disabled="buttonType0"></cube-input>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b">
          <span>合计：</span>
          <span @touchend.stop.prevent="edit(1)">
            <i class="iconfont icon-xiugai1 c-blue248 f-18" v-show="buttonType1"/>
            <i class="iconfont icon-baocun c-red75 f-18" v-show="!buttonType1"/>
          </span>
        </p>
      </ul>
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">次品数</p>
      <ul>
        <li v-for="(item, index) in list3" :key="index" class="pb-10">
           <div class="d-f f-14">
             <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[0]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[0]" :disabled="buttonType0"></cube-input>
            </p>
            <p class="w-50 d-f a-i-c">
              <span class="f-1 d-b t-c">{{item.arr[1]}}</span>
              <cube-input class="c-blue f-1" v-model="item.data[1]" :disabled="buttonType0"></cube-input>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b">
          <span>合计：</span>
          <span @touchend.stop.prevent="edit(2)">
            <i class="iconfont icon-xiugai1 c-blue248 f-18" v-show="buttonType2"/>
            <i class="iconfont icon-baocun c-red75 f-18" v-show="!buttonType2"/>
          </span>
        </p>
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
      list0: [
        {arr: ['XS', 'S'], data: [1, 1]},
        {arr: ['M', 'L'], data: [2, 2]},
        {arr: ['XL', '2XL'], data: [3, 3]},
        {arr: ['3XL', '4XL'], data: [4, 4]}
      ],
      list1: [
        {arr: ['XS', 'S'], data: [1, 1]},
        {arr: ['M', 'L'], data: [2, 2]},
        {arr: ['XL', '2XL'], data: [3, 3]},
        {arr: ['3XL', '4XL'], data: [4, 4]}
      ],
      list2: [
        {arr: ['XS', 'S'], data: [1, 1]},
        {arr: ['M', 'L'], data: [2, 2]},
        {arr: ['XL', '2XL'], data: [3, 3]},
        {arr: ['3XL', '4XL'], data: [4, 4]}
      ],
      list3: [
        {arr: ['XS', 'S'], data: [1, 1]},
        {arr: ['M', 'L'], data: [1, 2]},
        {arr: ['XL', '2XL'], data: [3, 3]},
        {arr: ['3XL', '4XL'], data: [4, 4]}
      ],
      buttonType0: true,
      buttonType1: true,
      buttonType2: true
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
.fabric
  img
    height 1.2rem
</style>
