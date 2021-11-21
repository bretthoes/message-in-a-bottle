<template>
  <div>
    <h3 class="p-3 text-center">Quiz Builder</h3>
    <base-panel>
      <h4 style="text-align:left;">Quiz Title</h4>
      <div class="field-wrapper">
        <input v-model="quiz.title" class="text-input" placeholder="Quiz title here..."/>
      </div>
      <h4 style="text-align:left;">Questions</h4>
      <div v-for="(question, index) in quiz.questions" :key="index">
        <div class="createdQuestion">
          <div class="field-wrapper">
            <input v-model="question.text"
            class="text-input mb-4"
            placeholder="Question text here..."/>
            <div v-for="(questionResponse, childIndex) in question.questionOptions"
            :key="childIndex"
            class="question-responses">
              <div class="createdQuestionResponse">
                <input v-model="questionResponse.text" class="text-input question-response-input" placeholder="Question response text here..."/>
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
        v-if="$store.state.isUserAdmin"
        buttonPosition="right"
        buttonColor="blue">Save
      </base-button>
      <base-button
        @click="navigateTo({name: 'quizzes'})"
        v-if="$store.state.isUserAdmin"
        buttonPosition="right"
        buttonColor="red">Cancel
      </base-button><br /><br />
      <p v-if="!this.validInput" v-html="error" style="color:red;font-size:20px;float:right;">No empty fields allowed.</p>
    </base-panel>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BasePanel from '@/components/BasePanel'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  components: {
    BaseButton, BasePanel
  },
  mixins: [navigateToMixin],
  data () {
    return {
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
      error: 'No empty fields allowed.',
      maxQuestions: 30,
      maxOptionsPerQuestion: 6
    }
  },
  async mounted () {
    // redirect home if not logged in or user is not admin
    if (!this.$store.state.isUserLoggedIn || !this.$store.state.isUserAdmin) this.navigateTo({ name: 'root' })
  },
  methods: {
    // each question should have a minumum of 2 questionOptions by default
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
    addQuestionResponse (index) {
      if (this.quiz.questions[index].questionOptions.length < this.maxOptionsPerQuestion) {
        this.quiz.questions[index].questionOptions.push({
          text: '',
          displayResponse: false
        })
      }
    },
    async save () {
      // loop through all input fields; check for any empty strings
      this.validInput = true
      if (!this.quiz.title) this.validInput = false
      for (let i = 0; i < this.quiz.questions.length; i++) {
        if (!this.quiz.questions[i].text) this.validInput = false
        for (let j = 0; j < this.quiz.questions[i].questionOptions.length; j++) {
          if (!this.quiz.questions[i].questionOptions[j].text) this.validInput = false
        }
      }
      // save quiz if input valid, else update and display error message
      if (this.validInput) {
        try {
          await QuizzesService.post(this.quiz)
          this.navigateTo({name: 'quizzes'})
        } catch (err) {
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
h3 {
  font-size: 32px;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
</style>
