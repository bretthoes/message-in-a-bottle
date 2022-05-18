
<template>
  <div class="container-fluid">
      <slot>
        Panel
      </slot>
  </div>
</template>
<script>
export default {
  name: 'BasePanel'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  width: 80%;
  padding: 12px;
  box-shadow: 5px 5px 5px gray;
  overflow: hidden;
  margin-bottom: 80px;
}
@media only screen and (max-width: 600px) {
  .container-fluid {
    margin-bottom:8px;
  }
  .container-fluid {
    width: 90%;
  }
}
</style>
