<template>
  <div>
    <div class='container-fluid'>
      <base-title fontCasing="capitalize">Quiz submitted!</base-title>
      <div class='img-container'>
        <img src='@/assets/throwing-bottle.gif' alt='Avatar' class='avatar' />
      </div>
      <h5><i>Any new matches will appear in your inbox</i></h5>
      <div class="button-container">
        <base-button
          @click="navigateTo({name: 'inbox'})"
          buttonSize="large">check inbox
        </base-button>
        <base-button
          @click="navigateTo({name: 'quizzes'})"
          buttonSize="large">more quizzes
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BaseTitle from '@/components/ui/BaseTitle'
import navigateToMixin from '@/mixins/navigateToMixin'
/**
 * Component for view displayed after user submits a quiz.
 */
export default {
  name: 'QuizSubmitted',
  mixins: [navigateToMixin],
  components: {
    BaseButton, BaseTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-container {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
