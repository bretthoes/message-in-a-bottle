<template>
  <div class="quiz-container">
    <slot>
      Quiz.
    </slot>
  </div>
</template>
<script>
export default {
  name: 'QuizContainer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-container {
  justify-content: center;
  margin: auto;
  text-align: center;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0 ,0 ,0.19), 0 6px 6px rgba(0,0,0,0.19);
  transition: 1s ease-in;
}
</style>
