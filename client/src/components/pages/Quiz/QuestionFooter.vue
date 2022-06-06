<template>
  <div class="question-footer">
    <p v-if="answerKey.length === quiz.Questions.length">
      <b>Final question!</b> Choosing an option above will submit quiz.
    </p>
    <div class="footer-buttons">
      <button @click="$emit('back')" class="back">Back</button> <!-- TODO replace these with BaseButton to abstract styles better -->
      <button @click="navigateTo({ name: 'quizzes' })" class="exit">
        Exit
      </button>
    </div>
    <b-progress
      :value="answerKey.length"
      :max="quiz.Questions.length"
      variant="info"
      striped
      :animated="true"
      class="mt-2"
      show-progress
    >
    </b-progress>
  </div>
</template>
<script>
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  name: 'QuestionFooter',
  mixins: [navigateToMixin],
  props: {
    quiz: {
      type: Object,
      required: true
    },
    answerKey: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question-footer {
  text-align: left;
  padding: 12px;
}
.footer-buttons {
  display: flex;
  width: 100%;
  padding: 10px;
}
.footer-buttons > button {
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: 1px solid black;
  box-shadow: 1px 2px;
  float:right;
  margin-bottom:8px;
  margin: auto;
}
.footer-buttons > button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
}
.back {
  background-color: #b1d3e1bb;
}
.exit {
  background-color: #e1b1b1bb;
}
.back:hover {
  background-color: #99cde4;
}
.exit:hover {
  background-color: #e49b99;
}
</style>
