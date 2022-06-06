<template>
  <div
    class="quiz-results-container container-fluid">
    <h2>You already submitted this quiz!</h2>
    <h4>your answers:</h4>
    <ul>
      <li v-for="(question, index) in quiz.Questions" :key="index">
        {{ index + 1 }}. {{ question.text }}
        <ul>
          <li
            v-for="(option, childIndex) in question.QuestionOptions"
            :key="childIndex"
            :class="{ green: childIndex == parseInt(answerKey[index]) }">
            {{ childIndex + 1 }}. {{ option.text }}
          </li>
          <br />
        </ul>
      </li>
    </ul>
    <a href="#" @click="navigateTo({ name: 'quizzes' })">back to quizzes</a>
    <reset :quiz="quiz" @clearAnswers="$emit('clearAnswers')"></reset>
  </div>
</template>
<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import Reset from './Reset'
/**
 * Component for ResultsView.
 */
export default {
  name: 'ResultsView',
  components: { Reset },
  props: {
    quiz: {
      type: Object,
      required: true
    },
    answerKey: {
      type: String,
      required: true
    }
  },
  mixins: [navigateToMixin],
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-results-container {
  max-width: 70%;
  text-align: left;
}
.green {
  color: green;
}
ul,li {
  list-style-type: none;
}
</style>
