<template>
  <div class="container">
    <h2 class="title">Panel Title</h2>
    <div class="panel">
      <div class="panel-heading">Panel Heading</div>
      <div class="panel-body">Panel Content</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Title'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  padding: 6px;
  width: 80%;
}
.title {
  text-align: left;
}
.panel-heading {
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  background-color: #f5f5f5;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: left;
  padding: 12px;
}
.panel-body {
  border: 1px solid lightgray;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: left;
  padding: 12px;
}
</style>
