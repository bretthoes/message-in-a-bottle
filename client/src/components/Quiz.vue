<template>
  <div v-if="quiz" class='quiz-container'>
    <h2>{{quiz.title}}</h2>
    <div
    class='quiz'
    v-for="(question,index) in quiz.Questions.slice(questionStartIndex,questionEndIndex)"
    :key="index">
      <div class='question-header'>
        <p>{{questionEndIndex}} / {{quiz.Questions.length}}</p>
        <h2>{{question.text}}</h2>
      </div>
      <div class='question-options'>
        <div
        v-for="(option,index) in question.QuestionOptions"
        :key="index"
        @click="selectResponse(index)">
          <div style='float:left;padding-left:10px;'>{{index+1}}.</div>
          {{option.text}}
        </div>
      </div>
      <div class='question-footer'>
        <p v-if="questionEndIndex === quiz.Questions.length"><b>Final question!</b> Choosing an option above will submit quiz.</p>
        <div class='footer-buttons'>
          <!-- TODO make these buttons prettier -->
          <button @click="previousQuestion" class="back">Back</button>
          <button  @click="navigateTo({ name: 'quizzes' })" class="exit">Exit</button>
        </div>
        <b-progress
        :value="questionStartIndex"
        :max="quiz.Questions.length"
        variant="info"
        striped
        :animated="true"
        class="mt-2"
        show-progress>
        </b-progress>
      </div>
    </div>
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import QuizzesService from '@/services/QuizzesService'
export default {
  data () {
    return {
      // TODO have quiz mode and view mode based on if user has taken quiz
      quiz: null,
      questionStartIndex: 0,
      questionEndIndex: 1,
      answerKey: '',
      quizSubmitted: false
    }
  },
  async mounted () {
    try {
      // get userId from route params
      const quizId = this.$store.state.route.params.quizId
      // get quiz from quizId
      this.quiz = (await QuizzesService.show(quizId)).data
    } catch (err) {
      console.log(err)
    }
  },
  mixins: [navigateToMixin],
  methods: {
    // selecting question also advances to next question
    async selectResponse (index) {
      // Append answer to answer key
      this.answerKey += index
      // check if last question
      if (this.questionEndIndex === this.quiz.Questions.length) {
        // check if quizSubmitted to prevent spam submissions
        if (!this.quizSubmitted) {
          try {
            // update quizSubmitted
            this.quizSubmitted = true
            // insert or update quiz response
            const quizResponse = {
              'userId': this.$store.state.user.id,
              'quizId': this.quiz.id,
              'answerKey': this.answerKey
            }
            await QuizzesService.put(quizResponse)
            // Redirect to quiz submitted page
            this.navigateTo({ name: 'quizzes' })
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        // Move to next question
        this.questionStartIndex++
        this.questionEndIndex++
      }
    },
    previousQuestion () {
      if (this.questionStartIndex > 0 && this.questionEndIndex > 0) {
        // Remove answer from answer key
        this.answerKey = this.answerKey.slice(0, this.answerKey.length - 1)
        // Move to previous question
        this.questionStartIndex--
        this.questionEndIndex--
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-container {
  justify-content: center;
  transition: 1s ease-in;
  position: relative;
}
.quiz {
  margin: auto;
  text-align: center;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0 ,0 ,0.19), 0 6px 6px rgba(0,0,0,0.19);
  transition: 1s ease-in;
}
.question-header {
  height: 20%;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  padding: 20px;
  /* background-color: #e7eae0; */
  background-color: #B1D3E1;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  border-bottom: 1px solid slategray;
}
p {
  text-align: center;
  font-family: "Montserrat", sans-serif;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}
.question-options {
  display: grid;
  grid-template-columns: 1;
}

.question-options > div {
  text-align: center;
  padding: 20px 0;
  font-size: 24px;
  cursor: pointer;
  box-shadow:         0 2px 4px -2px #000000;
  -moz-box-shadow:    0 2px 4px -2px #000000;
  -webkit-box-shadow: 0 2px 4px -2px #000000;
}
.question-options > div:hover {
  background-color: #EAEDED;
  /* transition: 0.4s ease-in; */
}
.question-footer {
  text-align: left;
  padding: 12px;
}
.footer-buttons {
  display: flex;
  width: 100%;
  padding: 10px;
}
.footer-buttons > button {
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: 1px solid black;
  box-shadow: 1px 2px;
  float:right;
  margin-bottom:8px;
  margin: auto;
}
.footer-buttons > button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
}
.back {
  background-color: #b1d3e1bb;
}
.exit {
  background-color: #e1b1b1bb;
}
.back:hover {
  background-color: #99cde4;
}
.exit:hover {
  background-color: #e49b99;
}
</style>
