<template>
  <div class="content">
      <h1>MESSAGE</h1>
      <h1>IN A</h1>
      <h1><span class="blue">BOTTLE</span></h1>
      <h2 class="subtitle">0 matches after 0 bottles thrown to sea</h2>
    <div class="button-container">
      <button @click="navigateTo({name: 'about'})">what is this?</button>
      <button @click="openQuizPage($store.state.isUserLoggedIn)">view quizzes</button>
    </div>
    <footer-waves />
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      ref="modalComponent"
    />
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import modalMixin from '@/mixins/modalMixin'
import Modal from '@/components/Modal.vue'
import FooterWaves from './FooterWaves.vue'
export default {
  name: 'Home',
  components: {
    Modal,
    FooterWaves
  },
  mixins: [navigateToMixin, modalMixin],
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
.blue {
  /*background: linear-gradient(to right, #30cfd0 0%, aquamarine 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;*/
  color: #4696B8;
  text-shadow: 1px 0 black, 0 1px black, 1px 0 black, 0 -1px;
  /* text-shadow: 2px 2px black; */
}
h1 {
  font-size: 52px;
  letter-spacing: 1px;
  margin-top: -26px;
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
.subtitle {
  font-style: italic;
  color: gray;
  font-size: 26px;
  padding: 0 12px;
}
</style>
