<template>
  <div class="LoginTop">
    <div></div>
    <div>{{ middleTop }}</div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: ['middleTop'],
  components: {},
  data () {
    return {

    }
  },
  methods: {},
  created () {}
}
</script>
<style lang="less" scoped>
.LoginTop{
  height: 13.889vw;
  background-color: white;;
  display: flex;
  div{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.889vw;
  }
}
</style>
