<template>
  <div class="page">
    <h1>{{text}}</h1>
    <p>You are using `Voe.js`</p>
  </div>
</template>

<script>
  export default {
    name: "demo",
    props: {
      text: String
    }
  }
</script>

<style lang="less" scoped>
  .page{
    text-align: center;
    padding-top: 100px;
  }
</style>