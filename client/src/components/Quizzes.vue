<template>
  <div class="container">
    <h3 class="p-3 text-center">All Quizzes</h3>
    <div class="row">
      <div class="col-sm-3">
        <div class="search">
          <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="search" placeholder="Search quizzes"></b-form-input>
        </b-input-group>
        </div>
      </div>
      <div class="col-sm-9">
        <button @click="navigateTo({name: 'quizzes-create'})" v-if="$store.state.isUserAdmin">Add Quiz</button>
      </div>
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
<style scoped>

button {
  cursor: pointer;
  width: 100px;
  height: 40px;
  font-size: 14px;
  border: 1px solid black;
  box-shadow: 1px 2px;
  float:right;
  margin-bottom:8px;
}
button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
  background-color: #B1D3E1;
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
