<template>
  <div>
    <base-title>Stats</base-title>
    <br />
    <b-form-select v-model="selectedChart" :options="chartSelectionOptions"></b-form-select>
    <br /><br />
    <div v-if="selectedChart === 'userStatistics'">
      <h2>Users Joined</h2>
      <GChart
      type="ColumnChart"
      :data="columnChartData"
      :options="columnChartOptions" />
    </div>
    <div v-if="selectedChart === 'quizStatistics'">
      <h2>Quiz Popularity</h2>
      <GChart
        type="PieChart"
        :options="pieChartOptions"
        :data="pieChartData" />
    </div>
  </div>
</template>

<script>
import BaseTitle from '@/components/ui/BaseTitle'
import UsersService from '@/services/UsersService'
import QuizzesService from '@/services/QuizzesService'
import QuizResponsesService from '@/services/QuizResponsesService'
import { GChart } from 'vue-google-charts'
import dateFormat from 'dateformat'
/**
 * Component for stats view.
 */
export default {
  name: 'Stats',
  components: {
    BaseTitle, GChart
  },
  data () {
    return {
      columnChartOptions: {
        chart: {
          title: 'New Users Joined'
        }
      },
      pieChartOptions: {
        title: 'Most Popular Quizzes',
        height: 450,
        width: 1100
      },
      chartSelectionOptions: [
        { value: null, text: 'Please select a chart to display' },
        { value: 'quizStatistics', text: 'Total quizzes taken stats' },
        { value: 'userStatistics', text: 'Total users joined stats' }
      ],
      users: [],
      quizzes: [],
      quizResponses: [],
      selectedChart: null
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
    },
    columnChartData () {
      // initiate counts for tracking, use object to track as
      // key/value pairs, set up object with headers as first item
      const counts = {'Date': 'Users joined'}
      // copy users for manipulation in display of column chart
      const copyUsers = this.users
      const usersSorted = copyUsers.sort((a, b) => a.createdAt > b.createdAt)
      // count users and group by join date
      for (const u of usersSorted) {
        const createdDate = dateFormat(new Date(u.createdAt), 'm/d/yy')
        counts[createdDate] = counts[createdDate] ? counts[createdDate] + 1 : 1
      }
      // return object mapped to array for Vue Google Charts formatting
      return Object.keys(counts).map((key) => [(key), counts[key]])
    }
  },
  /**
   * Ran on component creation. Attempts fetching of data.
   */
  async created () {
    try {
      // fetch all users
      this.users = (await UsersService.index()).data
      // fetch all quizzes
      this.quizzes = (await QuizzesService.index()).data
      // fetch all quiz responses
      this.quizResponses = (await QuizResponsesService.index()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    /**
     * Get quiz title by quiz id.
     */
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
