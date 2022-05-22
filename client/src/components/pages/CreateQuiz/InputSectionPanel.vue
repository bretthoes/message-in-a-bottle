
<template>
  <div class="wrapper">
      <slot>
        Input Container
      </slot>
  </div>
</template>
<script>
export default {
  name: 'InputSectionPanel'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  padding: 24px;
  border: 2px solid darkgray;
  margin: 24px 0;
  background-color: #b1d3e1af;
  overflow: hidden;
}
</style>
