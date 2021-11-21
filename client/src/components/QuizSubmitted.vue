<template>
  <div>
    <div class='container-fluid'>
        <h2>Quiz submitted!</h2>
        <div class='img-container'>
          <img src='@/assets/throwing-bottle.gif' alt='Avatar' class='avatar' />
        </div>
        <h5><i>Any new matches will appear in your inbox :)</i></h5>
        <div class="button-container">
          <base-button
            @click="navigateTo({name: 'inbox'})"
            buttonSize="large">check inbox
          </base-button>
          <base-button
            @click="openQuizPage($store.state.isUserLoggedIn)"
            buttonSize="large">more quizzes
          </base-button>
        </div>
    </div>
    <footer-waves />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import FooterWaves from '@/components/FooterWaves'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  mixins: [navigateToMixin],
  components: {
    FooterWaves, BaseButton
  },
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
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: block;
}
.button-container {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
