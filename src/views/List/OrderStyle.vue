<template>
  <div class="orderstyle">
    <div class="b-b-e" v-for="(item, index) in orderstyle" :key="index">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>{{item.product_name}}</span><span class="c-blue248">{{item.product_size}}</span></p>
      <ul>
        <li v-for="(_item, _index) in item.values" :key="_index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
            <p class="w-100 d-f a-i-c ht-20">
              <span class="f-1 d-b">{{_item.text}}</span>
              <span class="f-1" v-if="_index < 6">{{_item.value}}</span>
              <cube-input v-else class="f-1 c-blue" :class="{inputBorder : modification[index]}" v-model="_item.value" :disabled="!modification[index]"></cube-input>
            </p>
          </div>
        </li>
        <p class="pb-10 pt-10 f-16 d-f j-c-s-b clear">
          <span>合计：{{item.combined}}</span>
          <span @touchend.stop.prevent="edit(index, item)">
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
  name: 'orderstyle',
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
          this.orderstyle = data
          this.store()
        } else {
          this.orderstyle = []
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      orderstyle: [],
      modification: []
    }
  },
  methods: {
    store () {
      this.orderstyle.forEach((r, index) => {
        let arr = r.values.slice(6)
        this.$set(r, 'combined', arr.map(r => r.value || 0).reduce((prev, curr) => { return Number(prev) + Number(curr)}))
        this.$set(this.modification,index, false)
      })
    },
    edit(index, item) {
      let count = 0, data = {} ,arr = this.orderstyle[index].values.map((r, index) => {
          if (index >=6 && r !== '') return {value: r.value, name : r.name}
        }).filter(n => n !== undefined)
      if (this.modification[index]) { // 保存时
        arr.forEach((r) => {
          if (r.value !== '' && !this.$global.isNum(r.value)) {
            this.$createToast({
              time: 2000,
              type: 'warn',
              txt: `${r.value}，不为数字，请检查！`
            }).show()
            count++
          }
        })
        if (!count) {
          data.tracking_gid = this.$route.query.id
          data.product_id = item.product_id
          data.field_values = {}
          arr.filter(r => r.value !== '').map(n => {
            if (n.name) {
              data.field_values[n.name] = n.value
            }
          })
          data.code = this.$global.getCode()
          this.$http('post', 'trackings/update_product_values', data).then(r => {
            if (r.message === 'SUCCESS') {
              this.$createToast({
                time: 2000,
                type: 'correct',
                txt: `更新成功!`
              }).show()
              this.store()
            } else {
              this.$createToast({
                time: 2000,
                type: 'error',
                txt: `错误!`
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
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
</style>

