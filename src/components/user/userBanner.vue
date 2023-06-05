<template>
  <div @click="bannerClick">
    <div class="infoBanner">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
  </div>
  </div>
</template>

<script>
export default {
  props: ['left'],
  components: {},
  data () {
    return {

    }
  },
  methods: {
    bannerClick() {
      this.$emit('bannerClick')
    }
  },
  created () {}
}
</script>
<style lang="less" scoped>
  .infoBanner{
    background-color: white;
    padding: 4.167vw;
    color: #333;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
