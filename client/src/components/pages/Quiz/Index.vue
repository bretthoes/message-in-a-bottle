<template>
  <div v-if="quiz">
    <div v-if="answerKey.length < quiz.Questions.length">
    <h2>{{ quiz.title }}</h2>
    <quiz-container>
        <question-header>
          <p>{{ answerKey.length + 1 }} / {{ quiz.Questions.length }}</p>
          <h2>{{ currentQuestion.text }}</h2>
        </question-header>
        <question-options>
          <question-option
            v-for="(option, index) in currentQuestion.QuestionOptions"
            :key="index"
            :option="option"
            :index="index"
            :quiz="quiz"
            :answerKey="answerKey"
            @addAnswer="(anwser) => answerKey += anwser">
          </question-option>
        </question-options>
        <question-footer
          :quiz="quiz"
          :answerKey="answerKey"
          @back="answerKey = answerKey.slice(0, answerKey.length - 1)">
        </question-footer>
      </quiz-container>
    </div>
    <results-view
      v-else
      :quiz="quiz"
      :answerKey="answerKey"
      @clearAnswers="answerKey = ''">
    </results-view>
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import QuizzesService from '@/services/QuizzesService'
import QuizResponsesService from '@/services/QuizResponsesService'
import QuizContainer from './QuizContainer'
import QuestionHeader from './QuestionHeader'
import QuestionOptions from './QuestionOptions'
import QuestionOption from './QuestionOption'
import QuestionFooter from './QuestionFooter'
import ResultsView from './ResultsView'
/**
 * Component for quiz view.
 * Will conditionally display quiz questions
 * or quiz results based on if user has taken
 * the particular quiz.
 */
export default {
  name: 'Quiz',
  components: { QuizContainer, QuestionHeader, QuestionOptions, QuestionOption, QuestionFooter, ResultsView },
  data () {
    return {
      quiz: null,
      answerKey: ''
    }
  },
  /**
   * Called on component mounted.
   */
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
      // get userId from route params
      const quizId = this.$store.state.route.params.quizId
      // get quiz from quizId
      this.quiz = (await QuizzesService.show(quizId)).data
      // check if response already exists by quiz id and user id
      const params = {'userId': this.$store.state.user.id, 'quizId': quizId}
      const quizResponseOnLoad = (await QuizResponsesService.show(params)).data
      // if found, set existing answer key for user to view their responses
      if (quizResponseOnLoad) {
        this.answerKey = quizResponseOnLoad.answerKey
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    currentQuestion () {
      return this.quiz.Questions[this.answerKey.length]
    }
  },
  mixins: [navigateToMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: center;
  font-family: "Montserrat", sans-serif;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}
h4 {
  font-family: "Montserrat", sans-serif;
}
</style>
