<template>
  <div class="content">
    <h1>MESSAGE</h1>
    <h1>IN A</h1>
    <h1><span class="blue">BOTTLE</span></h1>
    <h2 class="subtitle">
      {{totalMatches}} matches after
      {{totalQuizResponses}} bottles thrown to sea
    </h2>
    <div class="button-container">
      <base-button
        @click="navigateTo({name: 'about'})"
        buttonSize="large">what is this?
      </base-button>
      <base-button
        @click="openQuizPage($store.state.isUserLoggedIn)"
        buttonSize="large">view quizzes
      </base-button>
    </div>
    <footer-waves />
    <modal
      v-show="isModalVisible"
      @close="closeModal"
      ref="modalComponent" />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import Modal from '@/components/Modal.vue'
import QuizResponsesService from '@/services/QuizResponsesService'
import navigateToMixin from '@/mixins/navigateToMixin'
import modalMixin from '@/mixins/modalMixin'
import FooterWaves from './FooterWaves.vue'
export default {
  name: 'Home',
  data () {
    return {
      totalQuizResponses: 0,
      totalMatches: 0
    }
  },
  components: {
    Modal,
    FooterWaves,
    BaseButton
  },
  mixins: [navigateToMixin, modalMixin],
  async mounted () {
    try {
      // get count of all quiz responses and total matches
      const totalResponsesAndMatches = (await QuizResponsesService.count()).data
      this.totalQuizResponses = totalResponsesAndMatches.responses
      this.totalMatches = totalResponsesAndMatches.matches
    } catch (err) {
      console.log(err)
    }
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
.content {
  padding-top: 60px;
}
.button-container {
  margin-top: 24px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.blue {
  color: #4696B8;
  text-shadow: 1px 0 black, 0 1px black, 1px 0 black, 0 -1px;
}
h1 {
  font-size: 52px;
  letter-spacing: 1px;
  margin-top: -26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
.subtitle {
  font-style: italic;
  color: gray;
  font-size: 26px;
  padding: 0 12px;
}
</style>
