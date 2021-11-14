<template>
  <div class='quiz-container'>
    <h2>{{quiz.title}}</h2>
    <div
    class='quiz'
    v-for="(element,index) in questions.slice(questionStartIndex,questionEndIndex)"
    :key="index">
      <div class='question-header'>
        <p>{{questionEndIndex}} / {{questions.length}}</p>
        <h2>{{element.question}}</h2>
      </div>
      <div class='question-options'>
        <div
        v-for="(item,index) in element.options"
        :key="index"
        @click="selectResponse(index)">
          <div style='float:left;padding-left:10px;'>{{index+1}}.</div>
          {{item.option}}
        </div>
      </div>
      <div class='question-footer'>
        <div class='footer-buttons'>
          <button @click="previousQuestion">Back</button>
          <button  @click="navigateTo({ name: 'root' })">Exit</button>
        </div>
        <b-progress
        :value="questionStartIndex"
        :max="questions.length"
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
      quiz: {},
      questions:
      [
        {
          question: 'Which of the following best describes you?',
          options:
          [
            { option: 'Morning person' },
            { option: 'Night person' }
          ]
        },
        {
          question: 'Most of the hobbies you enjoy are:',
          options:
          [
            { option: 'Indoors' },
            { option: 'Outdoors' }
          ]
        },
        {
          question: 'Do you consider yourself religious or have any other supernatural beliefs?',
          options:
          [
            { option: 'Yes' },
            { option: 'No' }
          ]
        },
        {
          question: 'Do you believe it is wrong to eat meat?',
          options:
          [
            { option: 'Yes' },
            { option: 'No' }
          ]
        },
        {
          question: 'Of the Big Five personality traits, which is most represented in your personality?',
          options:
          [
            { option: 'Openness' },
            { option: 'Conscientiousness' },
            { option: 'Extraversion' },
            { option: 'Agreeableness' },
            { option: 'Neuroticism' }
          ]
        },
        {
          question: 'Of the five recognized Love Languages, which is the most important to you?',
          options:
          [
            { option: 'Words of Affirmation' },
            { option: 'Physical Touch' },
            { option: 'Receiving Gifts' },
            { option: 'Quality Time' },
            { option: 'Acts of Service' }
          ]
        },
        {
          question: 'Are you ready to submit your quiz?',
          options:
          [
            { option: 'Yes, submit' }
          ]
        }
      ],
      questionStartIndex: 0,
      questionEndIndex: 1,
      answerKey: ''
    }
  },
  async mounted () {
    try {
      // get userId from route params
      const quizId = this.$store.state.route.params.quizId
      console.log('Quiz.vue mounted quizId: ', quizId)
      // retrieve user from id to populate profile page
      this.quiz = (await QuizzesService.show(quizId)).data
      console.log('QUiz.vue mounted this.quiz: ', this.quiz)
      // query and get all questions from quizId
      const questionsTest = await QuizzesService.getQuestionsByQuizId(quizId)
      console.log('questions:', questionsTest)
      // query and get all questionOptions from questionIds
    } catch (err) {
      console.log(err)
    }
  },
  mixins: [navigateToMixin],
  methods: {
    selectResponse (index) {
      // Check if last question
      if (this.questionEndIndex === this.questions.length) {
        // TODO: Add answer key to User
        // Redirect to quiz submitted page
        this.navigateTo({ name: 'quizzes' })
      } else {
        // Append answer to answer key
        this.answerKey += index
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
  box-shadow:         inset 0 0 3px #000000;
  -moz-box-shadow:    inset 0 0 3px #000000;
  -webkit-box-shadow: inset 0 0 3px #000000;
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
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  font-size: 18px;
  cursor: pointer;
  background-color: #B1D3E1;
  margin: auto;
}
</style>
