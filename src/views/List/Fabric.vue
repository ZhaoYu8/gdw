<template>
  <div class="fabric pb-10">
    <div class="b-b-e d-f f-d-c">
      <p class="f-16 pb-10 pt-10">产品图片</p>
      <img src="../../assets/img/default.jpg" alt="" class="pb-10">
    </div>
    <div class="b-b-e">
      <p class="f-16 pb-10 pt-10">尺码信息</p>
      <ul>
        <li v-for="(item, index) in product_size" :key="index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
            <p class="w-100 d-f a-i-c ht-20">
              <span class="f-1 d-b t-c">{{item.text}}</span>
              <span class="c-blue248 f-1">{{item.value}}</span>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 clear">合计：</p>
      </ul>
    </div>

    <div class="b-b-e" v-for="(item, index) in others" :key="index">
      <p class="f-16 pb-10 pt-10">{{item.title}}</p>
      <ul>
        <li v-for="(_item, _index) in item.values" :key="_index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
             <p class="w-100 d-f a-i-c">
              <span class="f-1 d-b t-c">{{_item.text}}</span>
              <cube-input class="c-blue f-1" v-model="_item.value" :disabled="!modification[index]"></cube-input>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b clear">
          <span>合计：</span>
          <span @touchend.stop.prevent="edit(index)">
            <i class="iconfont icon-xiugai1 c-blue248 f-18" v-show="!modification[index]"/>
            <i class="iconfont icon-baocun c-red75 f-18" v-show="modification[index]"/>
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
  props: {
    item: {
      type: Object
    }
  },
  watch: {
    item: {
      handler(data) {
        if (data.product_size) {
          this.product_size = data.product_size
          this.others = data.others
          this.others.forEach((r, index) => {
            this.$set(this.modification,index, false)
          })
        } else {
          this.product_size = []
          this.others = []
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      product_size: [], // 尺码信息
      others: [], // data数据
      modification: []
    }
  },
  methods: {
    edit(index) {
      let count = 0, data = {}, Id = ['tailoring', 'customer', 'mantissa', 'defective'], record = 36, arr = this.others[index].values.map(r => r.value)
      if (this.modification[index]) { // 保存时
        arr.forEach(r => {
          if (!this.$global.isNum(r)) {
            this.$createToast({
              time: 2000,
              type: 'warn',
              txt: `${r}，不为数字，请检查！`
            }).show()
            count++
          }
        })
        if (!count) {
          data[Id[index]] = {}
          data.tracking_gid = this.$route.query.id
          arr.map(r => {
            data[Id[index]][`size${record}`] = r
            record++
            record++
          })
          this.$http('post', 'trackings/update_special_custom', data).then(r => {
            if (r.message === 'SUCCESS') {
              this.$createToast({
                time: 2000,
                type: 'correct',
                txt: `更新成功!`
              }).show()
            }
          })
        }
      }
      if (!count) {
        this.$set(this.modification, index, !this.modification[index]) // 没有错误就保存
      }
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.fabric
  img
    width 1.2rem
    height 1.2rem
</style>
