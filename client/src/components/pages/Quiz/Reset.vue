<template>
  <div>
    <br /><br />
    <!-- TODO: abstract with base button -->
    <button @click="resetQuiz()" class="btn btn-outline-danger">
      Reset Quiz
    </button>
    <br /><br />
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import QuizResponsesService from '@/services/QuizResponsesService'
/**
 * Component for quiz view.
 * Will conditionally display quiz questions
 * or quiz results based on if user has taken
 * the particular quiz.
 */
export default {
  name: 'Reset',
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  mixins: [navigateToMixin],
  methods: {
    /**
     * Reset quiz so user can re-submit if current quiz has already been taken.
     */
    async resetQuiz () {
      const confirmed = await this.$confirm('Resetting this quiz will delete any matches from your results. Are you sure you want to continue?')
      if (confirmed) {
        try {
          // delete QuizResponse
          await QuizResponsesService.delete({'userId': this.$store.state.user.id, 'quizId': this.quiz.id})
          // reset answer key in parent on reset
          this.$emit('clearAnswers')
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
</style>
