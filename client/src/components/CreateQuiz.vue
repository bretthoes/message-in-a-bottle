<template>
  <div>
    <h3 class="p-3 text-center">Quiz Builder</h3>
    <div class="container">
      <h4 style="text-align:left;">Quiz Title</h4>
      <div class="field-wrapper">
        <input v-model="quizTitle" class="text-input" placeholder="Quiz title here..."/>
      </div>
      <h4 style="text-align:left;">Questions</h4>
      <div v-for="(question, index) in questions" :key="index">
        <div class="createdQuestion">
          <div class="field-wrapper">
            <input v-model="question.questionText"
            class="text-input question-input"
            placeholder="Question text here..."/>
            <div v-for="(questionResponse, childIndex) in question.responses"
            :key="childIndex"
            class="question-responses">
              <div class="createdQuestionResponse">
                <input v-model="question.responses[childIndex]" class="text-input question-response-input" placeholder="Question text here..."/>
              </div>
            </div>
            <button v-on:click="createQuestionResponse(index)" class="add-question-response-button">+ Add Question Response</button>
          </div>
        </div>
      </div>
      <button v-on:click="createQuestion" class="add-question-button">+ Add Question</button>
      <!-- TODO somehow *sigh* create method that from here, will add quiz to db from title, quiz questions
      from first input field in each field-wrapper div, then the other inputs in each as their question responses
      START by finishing posts for questions/question responses, then redirect to quizzes page -->
      <button v-on:click="saveQuiz()" class="save-button">Save Quiz</button>
      <!--TODO cancel button somewhere that returns to quizzes page -->
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      quizTitle: null,
      questions: []
    }
  },
  methods: {
    createQuestion () {
      this.questions.push({
        questionText: '',
        displayQuestion: false,
        responses: []
      })
      console.log('questions:')
      console.log(this.questions)
    },
    createQuestionResponse (index) {
      this.questions[index].responses.push({
        responseText: '',
        displayResponse: false
      })
    },
    saveQuiz () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-question-response-button {
  background-color: gainsboro;
  font-size: 16px;
  padding: 4px;
  float: right;
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
  background-color: rgb(144, 238, 175);
}
button {
  height: 48px;
  background-color: lightblue;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 20px;
}
.save-button {
  width: 20%;
  float: right;
  color:whitesmoke;
  background-color: #0754B8;
}
button:hover {
  background-color: lightskyblue;
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
