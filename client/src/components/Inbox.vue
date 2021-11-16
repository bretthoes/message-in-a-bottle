<template>
  <div class="content">
    <h1>Inbox</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="left col-md-4 col-sm-12">
          <h3>Matches</h3>
        </div>
        <div class="col-md-8 col-sm-12">
          <h3>Chat</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 32px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
h3 {
  font-size: 24px;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  display: block;

}
.container-fluid {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  width: 70%;
  padding: 12px;
  overflow: hidden;
  margin-bottom: 80px;
}
.left {
  border-right: 2px solid black;
}
</style>
