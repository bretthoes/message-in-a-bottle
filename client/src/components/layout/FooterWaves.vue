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
  height: 15%;
  width: 100%;
  position: absolute;
  bottom: 0;
  clear: both;
  z-index: -5;
  background-image: url('~@/assets/waves.gif');
  opacity: 0.8;
}
</style>
