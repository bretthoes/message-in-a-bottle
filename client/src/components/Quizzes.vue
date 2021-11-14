<template>
  <div class="container">
    <h3 class="p-3 text-center">All Quizzes</h3>
    <div class="create-quiz">
      <button @click="navigateTo({name: 'quizzes-create'})" class="btn btn-info" style="float:right;margin-bottom:8px;">Add Quiz</button>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Questions</th>
          <th>Date Added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.id">
          <td>{{ quiz.id }}</td>
          <td>{{ quiz.title }}</td>
          <td>{{ quiz.questionCount }}</td>
          <td>{{ quiz.createdAt.substring(0, 10) }}</td>
          <td>
            <a href="#" @click="navigateTo({name: 'quiz', params: { quizId: quiz.id }})">Take Quiz</a> |&nbsp;
            <a href="#">Edit</a> |&nbsp;
            <a href="#">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  mixins: [navigateToMixin],
  data () {
    return {
      quizzes: null
    }
  },
  async mounted () {
    try {
      this.quizzes = (await QuizzesService.index()).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
