<template>
  <div>
    <base-title>Quiz Builder</base-title>
    <base-panel>
      <h4 style="text-align:left;">
        Quiz Title
      </h4>
      <input-section-panel>
        <div>
          <text-input
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
            <text-input
              v-model="question.text"
              placeholder="Question text here..."/><br />
            <div
              v-for="(questionResponse, childIndex) in question.questionOptions"
              :key="childIndex"
              class="question-responses">
              <div class="createdQuestionResponse">
                <text-input
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
      <br /><hr />
      <base-button
        @click="save"
        v-if="$store.state.user.isAdmin"
        buttonPosition="right"
        buttonColor="blue">Save
      </base-button>
      <base-button
        @click="navigateTo({name: 'quizzes'})"
        v-if="$store.state.user.isAdmin"
        buttonPosition="right"
        buttonColor="red">Cancel
      </base-button><br /><br /><br />
      <p
        v-if="this.error"
        style="color:red;font-size:20px;text-align:right;">
        {{error}}
      </p>
    </base-panel>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BasePanel from '@/components/ui/BasePanel'
import BaseTitle from '@/components/ui/BaseTitle'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
import InputSectionPanel from './InputSectionPanel'
import TextInput from './TextInput'
/**
 * Component for Create Quiz view.
 */
export default {
  name: 'CreateQuiz',
  components: {
    BaseButton, BasePanel, BaseTitle, InputSectionPanel, TextInput
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
      error: '',
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
    },
    /**
     * Attempt to save and submit new quiz to database.
     */
    async save () {
      // save quiz if input valid
      if (this.validate(this.quiz)) {
        try {
          // save quiz to database
          await QuizzesService.post(this.quiz)
          // display toast on successful save
          this.$toasted.show('Quiz Created!', {
            theme: 'outline',
            position: 'top-center',
            duration: 2000
          })
          // navigate back to quizzes page
          // on successful submission
          this.navigateTo({name: 'quizzes'})
        } catch (err) {
          // update error value
          this.error = err.response.data.error
        }
      } else this.error = 'No empty fields allowed.'
    },
    validate (quiz) {
      // ensure no empty values in any questions or any question options
      if (!quiz.title) return false
      for (let i = 0; i < quiz.questions.length; i++) {
        if (!quiz.questions[i].text) return false
        for (let j = 0; j < quiz.questions[i].questionOptions.length; j++) {
          if (!quiz.questions[i].questionOptions[j].text) return false
        }
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
