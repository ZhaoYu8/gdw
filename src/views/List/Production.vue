<template>
  <div class="production">
    <div class="b-b-e" v-for="(item, index) in reports" :key="index">
      <p class="f-16 pb-10 pt-10 d-f j-c-s-b"><span>记录时间</span></p>
      <ul class="bfc">
        <li v-for="(_item, _index) in item" :key="_index" class="pb-10 w-50 f-l">
          <div class="d-f f-14">
            <p class="w-100 d-f a-i-c ht-20">
              <span class="f-1 d-b">{{_item.text}}</span>
              <span class="f-1 c-blue248 t-l">{{_item.value}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
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
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.production
  height 100%
  .bfc
    overflow hidden
    zoom 1
</style>

