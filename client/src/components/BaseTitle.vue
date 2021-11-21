<template>
  <div>
    <h1
      :class="[fontCasing]">
      <slot>Title</slot>
    </h1>
  </div>
</template>
<script>
export default {
  props: {
    fontCasing: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 32px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
  letter-spacing: 1px;
}
.capitalize {
  font-weight: 600;
  text-transform: capitalize;
}
</style>
