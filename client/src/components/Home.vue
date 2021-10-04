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
    <!-- bottom waves -->
    <footer>
      <!-- TODO: Change viewbox dims on ultra wide and possibly mobile browser widths. Original 0 0 120 28.
                 Changed to 24 as svg will overlay above waves and user cannot click buttons. -->
      <svg viewBox="0 0 120 24">
        <defs>
          <filter>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
           1 0 0 0 0
           0 1 0 0 0
           0 0 1 0 0
           0 0 0 13 -9"
            />
            <xfeBlend in="SourceGraphic" />
          </filter>
          <path
            id="wave"
            d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
          />
        </defs>
        <use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2"></use>
        <use id="wave2" class="wave" xlink:href="#wave" x="0" y="0"></use>
      </svg>
    </footer>
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
export default {
  name: 'Home',
  components: {
    Modal
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
  /* TODO: make transform work with modal; currently sits in front
  font-size: 52px;
  transform: scale(1.2, 1);
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
/* wave effects */

footer {
  width: 100vw;
  position: fixed;
  bottom: 0px;
}
footer div {
  background-color: var(--col-deepblue);
  margin: -5px 0px 0px 0px;
  padding: 0px;
  color: #fff;
  text-align: center;
}
svg {
  width: 100%;
  overflow: visible;
}

.wave {
  animation: wave 3s linear;
  animation-iteration-count: infinite;
  fill: #006f9e;
}
#wave2 {
  animation-duration: 10s;
  animation-direction: reverse;
  opacity: 0.6;
}
#wave3 {
  animation-duration: 12s;
  opacity: 0.3;
}
@keyframes wave {
  to {
    transform: translateX(-100%);
  }
}
</style>
