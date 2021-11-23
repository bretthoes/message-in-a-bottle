<template>
  <div class="container-fluid">
    <div class="title-container">
      <h1>404 not found</h1>
    </div>
    <img src="@/assets/page-not-found.png" alt="page-not-found" />
    <br /><br />
    <a href="#" @click="navigateTo({ name: 'root' })">[ Take me back home. ]</a>
  </div>
</template>
<script>
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  mixins: [navigateToMixin]
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 50%;
  min-width: 400px;
}
h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  display: inline;
}
a {
  font-weight: bold;
  font-size: 20px;
}
.title-container {
  width: 50%;
  min-width: 400px;
  background-color: lightblue;
  border-top: 1px solid black;
  margin: auto;
}
</style>
