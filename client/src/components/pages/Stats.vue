<template>
  <div>
    <base-title>Stats</base-title>
    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
    <h2>Pie Chart</h2>
    <GChart
      type="PieChart"
      :options="pieChartOptions"
      :data="pieChartData"
    />
  </div>
</template>

<script>
import BaseTitle from '@/components/ui/BaseTitle'
import QuizzesService from '@/services/QuizzesService'
import QuizResponsesService from '@/services/QuizResponsesService'
import { GChart } from 'vue-google-charts'
export default {
  name: 'Stats',
  components: {
    BaseTitle, GChart
  },
  data () {
    return {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        }
      },
      pieChartOptions: {
        title: 'Most Popular Quizzes',
        height: 450,
        width: 1100
      },
      quizzes: [],
      quizResponses: []
    }
  },
  computed: {
    pieChartData () {
      // initiate counts for tracking, use object to track as
      // key/value pairs, set up object with headers as first item
      const counts = { 'Quiz': 'Total responses' }
      // count quiz responses and group by quiz name
      for (const q of this.quizResponses) {
        const quizName = this.getQuizTitleById(q.QuizId)
        counts[quizName] = counts[quizName] ? counts[quizName] + 1 : 1
      }
      // return object mapped to array for Vue Google Charts formatting
      return Object.keys(counts).map((key) => [(key), counts[key]])
    }
  },
  async created () {
    try {
      // fetch all quizzes
      this.quizzes = (await QuizzesService.index()).data
      // fetch all quiz responses
      this.quizResponses = (await QuizResponsesService.index()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    getQuizTitleById (id) {
      const quiz = this.quizzes.find(q => q.id === id)
      if (quiz) return quiz.title
      else return ''
    }
  }
}
</script>

<style scoped>
</style>
