<template>
  <div>
    <base-title>Quiz Builder</base-title>
    <base-panel>
      <h4 style="text-align:left;">
        Quiz Title
      </h4>
      <input-section-panel>
        <div>
          <base-text-input
            v-model="quiz.title"
            placeholder="Quiz title here..."/>
        </div>
      </input-section-panel>
      <h4 style="text-align:left;">Questions</h4>
      <div
        v-for="(question, index) in quiz.questions"
        :key="index">
        <div class="createdQuestion">
          <input-section-panel>
            <base-text-input
              v-model="question.text"
              placeholder="Question text here..."/><br />
            <div
              v-for="(questionResponse, childIndex) in question.questionOptions"
              :key="childIndex"
              class="question-responses">
              <div class="createdQuestionResponse">
                <base-text-input
                  v-model="questionResponse.text"
                  placeholder="Question response text here..."
                  :style="{width: '92%', float:'right'}"/>
              </div>
            </div>
            <base-button
              @click="addQuestionResponse(index)"
              buttonPosition="right"
              buttonSize="circle">+
            </base-button>
          </input-section-panel>
        </div>
      </div>
      <base-button
        @click="addQuestion"
        buttonPosition="center"
        buttonSize="ultra-wide"
        buttonColor="blue">+ Add Question
      </base-button>
      <save :quiz="quiz"/>
    </base-panel>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BasePanel from '@/components/ui/BasePanel'
import BaseTitle from '@/components/ui/BaseTitle'
import BaseTextInput from '@/components/ui/BaseTextInput'
import navigateToMixin from '@/mixins/navigateToMixin'
import InputSectionPanel from './InputSectionPanel'
import Save from './Save'
/**
 * Component for Create Quiz view.
 */
export default {
  name: 'CreateQuiz',
  components: {
    BaseButton, BasePanel, BaseTitle, InputSectionPanel, BaseTextInput, Save
  },
  mixins: [navigateToMixin],
  data () {
    return {
      // initial value of quiz object, contains
      // one question with 2 options by default.
      quiz: {
        title: '',
        questions: [{
          text: '',
          displayQuestion: false,
          questionOptions: [{
            text: '',
            displayResponse: false
          }, {
            text: '',
            displayResponse: false
          }]
        }]
      },
      maxQuestions: 30,
      maxOptionsPerQuestion: 6
    }
  },
  /**
   * Called on component mounted.
   */
  async mounted () {
    // redirect home if not logged in or user is not admin
    if (!this.$store.state.isUserLoggedIn || !this.$store.state.user.isAdmin) this.navigateTo({ name: 'root' })
  },
  methods: {
    /**
     * Create new question with minimum 2 options.
     */
    addQuestion () {
      if (this.quiz.questions.length < this.maxQuestions) {
        this.quiz.questions.push({
          text: '',
          displayQuestion: false,
          questionOptions: [{
            text: '',
            displayResponse: false
          }, {
            text: '',
            displayResponse: false
          }]
        })
      }
    },
    /**
     * Add individual question response to question.
     */
    addQuestionResponse (index) {
      if (this.quiz.questions[index].questionOptions.length < this.maxOptionsPerQuestion) {
        this.quiz.questions[index].questionOptions.push({
          text: '',
          displayResponse: false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
