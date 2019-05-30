<template>
  <div class="inputSearch">
    <cube-input v-model="inputValue" :placeholder='icon'></cube-input>
    <!-- <i class="cubeic-search" style="position: absolute;top:0;left:0;"></i> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: '',
      icon: '\ue50b 搜索'
    }
  }
}
</script>
<style lang="stylus">
.inputSearch
  position relative
  height .6rem
  width 100%
  .cube-input-field
    padding .1rem
    // border-radius 10px
    text-align center
    font-size .28rem
</style>


