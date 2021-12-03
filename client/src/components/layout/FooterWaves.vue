<template>
  <div id="footer"></div>
</template>

<script>
export default {
  name: 'FooterWaves'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  height: 400px;
  width: 100%;
  position: fixed;
  bottom: 0;
  clear: both;
  background-image: url('~@/assets/waves.gif');
}
</style>
