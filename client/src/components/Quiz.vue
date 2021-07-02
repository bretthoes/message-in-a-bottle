<template>
  <div class='quiz-container'>
    <div class='quiz' v-for="(element,index) in questions.slice(a,b)" :key="index">
      <div class='question'>
        <div class='question-header'>
        <h2>Question</h2>
        </div>
        <p>{{element.question}}</p>
      </div>
      <div class='options'>
        <ul>
          <li v-for="(item,index) in element.options" :key="index">{{item.option}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          question: 'Of the Big Five personality traits, which is most represented your personality?',
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
        }
      ],
      a: 0,
      b: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.quiz {
  display: flex;
  width: 40%;
  height: 85%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  flex-flow: column;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0 ,0 ,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.question {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  margin: auto;
}
</style>
