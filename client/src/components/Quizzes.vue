<template>
  <div class="container">
    <h3 class="p-3 text-center">All Quizzes</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Questions</th>
          <th>Date Added</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.id">
          <td>{{ quiz.title }}</td>
          <td>?</td>
          <td>{{ quiz.createdAt.substring(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import QuizzesService from '@/services/QuizzesService'
export default {
  data () {
    return {
      quizzes: null
    }
  },
  async mounted () {
    // TODO: request backend for all quizzes
    this.quizzes = (await QuizzesService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
