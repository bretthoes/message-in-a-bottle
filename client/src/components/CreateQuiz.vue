<template>
  <div>
    <h3 class="p-3 text-center">Quiz Builder</h3>
    <div class="container">
      <h4 style="text-align:left;">Quiz Title</h4>
      <div class="field-wrapper">
        <input v-model="quiz.title" class="text-input" placeholder="Quiz title here..."/>
      </div>
      <h4 style="text-align:left;">Questions</h4>
      <div v-for="(question, index) in quiz.questions" :key="index">
        <div class="createdQuestion">
          <div class="field-wrapper">
            <input v-model="question.text"
            class="text-input question-input"
            placeholder="Question text here..."/>
            <div v-for="(questionResponse, childIndex) in question.responses"
            :key="childIndex"
            class="question-responses">
              <div class="createdQuestionResponse">
                <input v-model="questionResponse.text" class="text-input question-response-input" placeholder="Question response text here..."/>
              </div>
            </div>
            <button v-on:click="addQuestionResponse(index)" type="button" class="btn btn-info add-question-response-button">+ Add Question Response</button>
          </div>
        </div>
      </div>
      <button v-on:click="addQuestion" type="button" class="btn btn-info add-question-button">+ Add Question</button><br /><hr />
      <!-- TODO somehow *sigh* create method that from here, will add quiz to db from title, quiz questions
      from first input field in each field-wrapper div, then the other inputs in each as their question responses
      START by finishing posts for questions/question responses, then redirect to quizzes page -->
      <button v-on:click="save" type="button" class="btn btn-primary save-button" style="float:right;margin:4px;">Save</button>
      <button @click="navigateTo({name: 'quizzes'})" type="button" class="btn btn-danger cancel-button" style="float:right;margin:4px;">Cancel</button><br /><br />
      <p v-if="!this.validInput" style="color:red;font-size:20px;float:right;">No empty fields allowed.</p>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  components: {
    Panel
  },
  mixins: [navigateToMixin],
  data () {
    return {
      quiz: {
        title: '',
        questions: [{
          text: '',
          displayQuestion: false,
          responses: [{
            text: '',
            displayResponse: false
          }, {
            text: '',
            displayResponse: false
          }]
        }]
      },
      validInput: true
    }
  },
  methods: {
    addQuestion () {
      this.quiz.questions.push({
        text: '',
        displayQuestion: false,
        responses: [{
          text: '',
          displayResponse: false
        }, {
          text: '',
          displayResponse: false
        }]
      })
    },
    addQuestionResponse (index) {
      this.quiz.questions[index].responses.push({
        text: '',
        displayResponse: false
      })
    },
    async save () {
      // check for any empty strings in input
      this.validInput = true
      if (!this.quiz.title) this.validInput = false
      for (let i = 0; i < this.quiz.questions.length; i++) {
        if (!this.quiz.questions[i].text) this.validInput = false
        for (let j = 0; j < this.quiz.questions[i].responses.length; j++) {
          if (!this.quiz.questions[i].responses[j].text) this.validInput = false
        }
      }
      // save quiz if input valid, else display error message
      if (this.validInput) {
        try {
          await QuizzesService.post(this.quiz)
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
.add-question-response-button {
  margin-top: 8px;
  float: right;
  border: 1px solid black;
}
.question-response-input {
  width: 92%;
  margin: 4px;
  float: right;
}
.question-input {
  margin-bottom: 24px;
}
.add-question-button {
  width: 100%;
  border: 1px solid black;
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
.container {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  width: 80%;
  padding: 12px;
  overflow: hidden;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
input {
  width: 100%;
  height: 100%;
  border:none;
}
.panel {
  margin:auto;
  padding: 6px;
  width: 80%;
}
.title {
  text-align: left;
}
.panel-heading {
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  background-color: #b1d3e1af;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: left;
  padding: 12px;
}
.panel-body {
  border: 1px solid lightgray;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: left;
  padding: 12px;
}
</style>
