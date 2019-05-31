<template>
  <div class="add">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="d-f a-i-c b-b-e">
        <p class="f-14 c-333 ml-12 f-1">{{item.name}}</p>
        <cube-input class="f-2" v-model="item.model" v-if="!item.type"></cube-input>
        <cube-select class="f-2" v-model="item.model" v-else-if="item.type === 'select'"></cube-select>
        <p class="f-2 ht-45 l-h-45" v-else-if="item.type === 'date'" @touchend.stop.prevent="date(item)">{{item.model}}</p>
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
  name: 'add',
  components: {
  },
  data () {
    return {
      list: [
        {name: '记录时间', model: '', type: 'date'},
        {name: '上线人数', model: '', isNum: true},
        {name: '裁片上线数', model: '' , isNum: true},
        {name: '车位半成品数', model: '' , isNum: true},
        {name: '后道检验人', model: '', type: 'select'},
        {name: '工作时间', model: '', isNum: true},
        {name: '成衣上线数', model: '', isNum: true},
        {name: '记录人', model: '', type: 'select'}
      ]
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    save () {
      let re = /^[0-9]+.?[0-9]*$/, count = 0
      this.list.forEach((r) => {
        if (r.model && r.isNum && !re.test(r.model)) {
          this.$createToast({
            time: 2000,
            type: 'warn',
            txt: `${r.name}，必须为数字！`
          }).show()
          count++
        }
      })
      if (!count) {
        this.$router.go(-1)
      }
    },
    date (item) {
      if (!this.timePicker) {
        this.timePicker = this.$createDatePicker({
          title: '日期选择',
          min: new Date(2000, 1, 1),
          max: new Date(2030, 1, 1),
          value: new Date(),
          onSelect: (date, val) => { item.model = val.join('-') }
        })
      }
      this.timePicker.show()
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.add
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

