<template>
  <div class="production">
    <div class="b-b-e" v-for="(item, index) in reports" :key="index">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>记录时间</span></p>
      <ul>
        <li v-for="(_item, _index) in item.values" :key="_index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
            <p class="w-100 d-f a-i-c ht-20">
              <span class="f-1 d-b">{{_item.text}}</span>
              <cube-input class="f-1 c-blue" v-model="_item.value" :disabled="true"></cube-input>
            </p>
          </div>
        </li>
      </ul>
    </div>
      <p class="add" @click="goRouter">
        <i class="iconfont icon-tianjia">
        </i>
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
      reports: []
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  watch: {
    item: {
      handler(data) {
        if (data.reports && data.reports.length) {
          this.reports = data.reports
        } else {
          this.reports = []
        }
      },
      immediate: true
    }
  },
  methods: {
    edit(type) {
      let id = `buttonType${type}`
      this[id] = !this[id]
    },
    goRouter() {
      this.$emit('add')
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

