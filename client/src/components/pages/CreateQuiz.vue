<template>
  <div>
    <base-title>Quiz Builder</base-title>
    <base-panel>
      <h4 style="text-align:left;">
        Quiz Title
      </h4>
      <div class="field-wrapper">
        <input
          v-model="quiz.title"
          class="text-input"
          placeholder="Quiz title here..."/>
      </div>
      <h4 style="text-align:left;">Questions</h4>
      <div
        v-for="(question, index) in quiz.questions"
        :key="index">
        <div class="createdQuestion">
          <div class="field-wrapper">
            <input v-model="question.text"
            class="text-input mb-4"
            placeholder="Question text here..." />
            <div
              v-for="(questionResponse, childIndex) in question.questionOptions"
              :key="childIndex"
              class="question-responses">
              <div class="createdQuestionResponse">
                <input
                  v-model="questionResponse.text"
                  class="text-input question-response-input"
                  placeholder="Question response text here..."/>
              </div>
            </div>
            <base-button
              @click="addQuestionResponse(index)"
              buttonPosition="right"
              buttonSize="circle">+
            </base-button>
          </div>
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
        v-if="!this.validInput"
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
/**
 * Component for Create Quiz view.
 */
export default {
  name: 'CreateQuiz',
  components: {
    BaseButton, BasePanel, BaseTitle
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
      validInput: true,
      // default value of error as this will
      // always be checked first, but can be
      // updated by try catch in save() with
      // other meaningful values from server.
      error: 'No empty fields allowed.',
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
      // ensure no empty values in any questions or any question options
      this.validInput = true
      if (!this.quiz.title) this.validInput = false
      for (let i = 0; i < this.quiz.questions.length; i++) {
        if (!this.quiz.questions[i].text) this.validInput = false
        for (let j = 0; j < this.quiz.questions[i].questionOptions.length; j++) {
          if (!this.quiz.questions[i].questionOptions[j].text) this.validInput = false
        }
      }
      // save quiz if input valid
      if (this.validInput) {
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
          // update error value and input state
          this.error = err.response.data.error
          this.validInput = false
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question-response-input {
  width: 92%;
  margin: 4px;
  float: right;
}
.text-input {
  border: 1px solid #e6e6e6;
  height: 40px;
  padding: 4px;
  padding-left: 16px;
}
.field-wrapper {
  padding: 24px;
  border: 2px solid darkgray;
  margin: 24px 0;
  background-color: #b1d3e1af;
  overflow: hidden;
}
input {
  width: 100%;
  height: 100%;
  border:none;
}
.title {
  text-align: left;
}
</style>
