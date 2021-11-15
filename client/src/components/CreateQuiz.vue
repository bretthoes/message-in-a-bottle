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
            <div v-for="(questionResponse, childIndex) in question.questionOptions"
            :key="childIndex"
            class="question-responses">
              <div class="createdQuestionResponse">
                <input v-model="questionResponse.text" class="text-input question-response-input" placeholder="Question response text here..."/>
              </div>
            </div>
            <button v-on:click="addQuestionResponse(index)" type="button" class="add-question-response-button">+</button>
          </div>
        </div>
      </div>
      <button v-on:click="addQuestion" type="button" class="add-question-button">+ Add Question</button><br /><hr />
      <button v-on:click="save" type="button" class="save">Save</button>
      <button @click="navigateTo({name: 'quizzes'})" type="button" class="cancel">Cancel</button><br /><br />
      <p v-if="!this.validInput" v-html="error" style="color:red;font-size:20px;float:right;">No empty fields allowed.</p>
    </div>
  </div>
</template>

<script>
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  mixins: [navigateToMixin],
  data () {
    return {
      // TODO create limits on total # of questions
      // and questionOptions admin can create
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
      error: 'No empty fields allowed.'
    }
  },
  methods: {
    // each question should have a minumum of 2 questionOptions by default
    addQuestion () {
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
    },
    addQuestionResponse (index) {
      this.quiz.questions[index].questionOptions.push({
        text: '',
        displayResponse: false
      })
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
button {
  cursor: pointer;
  width: 100px;
  height: 40px;
  font-size: 14px;
  border: 1px solid black;
  box-shadow: 1px 2px;
}
button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
  background-color: #B1D3E1;
}
.add-question-response-button {
  margin-top: 8px;
  width: 40px;
  float: right;
  border-radius: 33px;
}
.add-question-button {
  width: 50%;
  margin: auto;
  background-color: #b1d3e1bb;
}
.add-question-button:hover {
  background-color: #99cde4;
}
.save, .cancel {
  float:right;
  background-color: #b1d3e1bb;
  margin:4px;
}
.save:hover, .cancel:hover {
  background-color: #99cde4;
}
.question-response-input {
  width: 92%;
  margin: 4px;
  float: right;
}
.question-input {
  margin-bottom: 24px;
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
h3 {
  font-size: 32px;
  letter-spacing: 1px;
  /* transform: scale(1.2, 1);
  -ms-transform: scale(1.2, 1);
  -moz-transform: scale(1.2, 1);
  -webkit-transform: scale(1.2, 1);
  -o-transform: scale(1.2, 1); */
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
</style>
