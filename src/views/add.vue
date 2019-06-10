<template>
  <div class="addProduction">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="d-f a-i-c b-b-e">
        <p class="f-14 c-333 ml-12 f-1">{{item.name}}</p>
        <cube-input class="f-2" v-model="item.value" v-if="!item.type"></cube-input>
        <cube-select class="f-2" v-model="item.value" :options="item.options" v-else-if="item.type === 'select'"></cube-select>
      </li>
    </ul>
    <div class="d-f button t-c">
      <p class="f-1 c-333 f-18 bgc-gray231" @click="cancel">取消</p>
      <p class="f-1 c-fff f-18 bgc-blue248" @click="save">保存</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addProduction',
  components: {
  },
  props: {
    productionProps: {
      type: Array
    }
  },
  watch: {
    productionProps: {
      handler(data) {
        if (data) {
          this.list.forEach((r) => {
            if (r.type === 'select') {
              this.$set(r, 'options', data.map(r => {
                return {text: r.name, value: r.id}
              }))
            }
          })
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      list: [
        {name: '上线人数', value: '', isNum: true, id: "online_number"},
        {name: '工作时间(时)', value: '', isNum: true, id: "work_hour"},
        {name: '裁片上线人数', value: '' , isNum: true, id: "cutting_number"},
        {name: '成衣上线人数', value: '', isNum: true, id: "garment_number"},
        {name: '车位半成品数', value: '' , isNum: true, id: "semi_number"},
        {name: '返修人数', value: '', isNum: true, id: 'repair_number'},
        {name: '后道检验人', value: '', type: 'select', id: "examiner_id"},
        {name: '记录人', value: '', type: 'select', id: "member_id"}
      ]
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save () {
      let count = 0, data = {}, runCount = 0
      this.list.forEach((r) => {
        if (r.value !== '' && r.isNum && !this.$global.isNum(r.value)) {
          this.$createToast({
            time: 2000,
            type: 'warn',
            txt: `${r.name}，必须为数字！`
          }).show()
          count++
        } else if (!r.value) {
          runCount++
        }
      })
      if (runCount === this.list.length) {
        this.$createToast({
          time: 2000,
          type: 'warn',
          txt: `不能全部为空!`
        }).show()
        count++
      }
      if (!count) {
        this.list.map(r => {
          data[r.id] = r.value
        })
        data.tracking_gid = this.$route.query.id
        this.$http('post', 'trackings/create_daily_report', data).then(r => {
          if (r.message === 'SUCCESS') {
            this.$emit('save')
          } else {
            this.$createToast({
              time: 2000,
              type: 'error',
              txt: `报错，请联系管理员!`
            }).show()
          }
        })
      }
    },
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.addProduction
  li
    height .9rem
  .button
    position absolute
    width 100%
    bottom 0
    p
      height 1rem
      line-height 1rem
</style>

