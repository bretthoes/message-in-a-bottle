<template>
  <div class="question-header">
    <slot>
      Question Header.
    </slot>
  </div>
</template>
<script>
export default {
  name: 'QuestionHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question-header {
  height: 20%;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  padding: 20px;
  /* background-color: #e7eae0; */
  background-color: #B1D3E1;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  border-bottom: 1px solid slategray;
}
</style>
