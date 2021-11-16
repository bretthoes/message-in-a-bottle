<template>
  <div class='container-fluid'>
      <h2>Quiz submitted!</h2>
      <div class='img-container'>
        <img src='@/assets/throwing-bottle.gif' alt='Avatar' class='avatar' />
      </div>
      <h5><i>Any new matches will appear in your inbox :)</i></h5>
      <div class="button-container">
        <button @click="navigateTo({name: 'root'})">return home</button>
        <button @click="openQuizPage($store.state.isUserLoggedIn)">other quizzes</button>
      </div>
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  mixins: [navigateToMixin],
  methods: {
    openQuizPage (isUserLoggedIn) {
      if (isUserLoggedIn) {
        this.navigateTo({name: 'quizzes'})
      } else {
        // Open modal if not logged in
        this.openModal(true)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
    margin: auto;
    max-width: 800px;
    border: 1px solid black;
    background-color: #B1D3E1;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: block;
}
.button-container {
  margin: auto;
  margin-top: 24px;
  margin-bottom: 60px;
}
button {
  cursor: pointer;
  width: 150px;
  height: 60px;
  font-size: 22px;
  border: 1px solid black;
  box-shadow: 1px 2px;
  margin: 6px;
}
button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
  background-color: #B1D3E1;
}
</style>
