<template>
  <div
    class="question-option"
    @click="nextQuestion(index)">
    <div style="float:left;padding-left:10px;">
      {{ index + 1 }}.
    </div>
    {{ option.text }}
  </div>
</template>
<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import QuizResponsesService from '@/services/QuizResponsesService'
export default {
  name: 'QuestionOption',
  mixins: [navigateToMixin],
  props: {
    quiz: {
      type: Object,
      required: true
    },
    answerKey: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    async nextQuestion (choice) {
      // submit if we're answering the last question
      if (this.answerKey.length === this.quiz.Questions.length - 1) {
        // send complete answer key to submit
        await this.submitQuiz(this.answerKey + choice)
      } else this.$emit('addAnswer', choice) // send choice back to parent to update answer key
    },
    async submitQuiz (answers) {
      const confirmed = await this.$confirm('Submit Quiz?')
      // ensure user confirmed submit and valid input
      if (confirmed && answers.length === this.quiz.Questions.length) {
        try {
          // insert or update quiz response
          const quizResponse = {
            'userId': this.$store.state.user.id,
            'quizId': this.quiz.id,
            'answerKey': answers
          }
          await QuizResponsesService.put(quizResponse)
          // Redirect to quiz submitted page
          this.navigateTo({ name: 'quiz-submitted' })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question-option {
  text-align: center;
  padding: 20px 0;
  font-size: 24px;
  cursor: pointer;
  box-shadow:         0 2px 4px -2px #000000;
  -moz-box-shadow:    0 2px 4px -2px #000000;
  -webkit-box-shadow: 0 2px 4px -2px #000000;
}
.question-option:hover {
  background-color: #EAEDED;
  /* transition: 0.4s ease-in; */
}
</style>
