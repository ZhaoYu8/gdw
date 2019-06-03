<template>
  <div class="material">
    <div class="b-b-e" v-for="(item, index) in products" :key="index">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>{{item.product_name}}</span><span class="c-blue248">规格编号</span></p>
      <ul>
        <li v-for="(_item, _index) in item.values" :key="_index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
            <p class="w-100 d-f a-i-c ht-20">
              <span class="f-1 d-b">{{_item.text}}</span>
              <span class="f-1" v-if="_index < 6">{{_item.value}}</span>
              <cube-input v-else class="f-1 c-blue" v-model="_item.value" :disabled="!modification[index]"></cube-input>
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
  name: 'material',
  components: {
  },
  props: {
    item: {
      type: Array
    }
  },
  watch: {
    item: {
      handler(data) {
        if (data.length) {
          console.log(data)
          this.products = data
          this.products.forEach((r, index) => {
            this.$set(this.modification,index, false)
          })
        } else {
          this.products = []
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      products: [],
      modification: []
    }
  },
  methods: {
     edit(index) {
      this.$set(this.modification, index, !this.modification[index])
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
</style>

