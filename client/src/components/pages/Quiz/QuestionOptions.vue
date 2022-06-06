<template>
  <div class="question-options">
    <slot>
      Question Options.
    </slot>
  </div>
</template>
<script>
export default {
  name: 'QuestionOptions'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question-options {
  display: grid;
  grid-template-columns: 1;
}
</style>
