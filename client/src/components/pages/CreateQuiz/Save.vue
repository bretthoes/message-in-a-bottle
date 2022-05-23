<template>
  <div>
    <br /><hr />
    <base-button
      @click="save"
      v-if="$store.state.user.isAdmin"
      buttonPosition="right"
      buttonColor="blue">Save
    </base-button>
    <base-button
      @click="navigateTo({name: 'quizzes'})"
      v-if="$store.state.user.isAdmin"
      buttonPosition="right"
      buttonColor="red">Cancel
    </base-button><br /><br /><br />
    <p
      v-if="error"
      style="color:red;font-size:20px;text-align:right;">
      {{error}}
    </p>
  </div>
</template>
<script>
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
import BaseButton from '@/components/ui/BaseButton'

export default {
  name: 'Save',
  components: { BaseButton },
  mixins: [navigateToMixin],
  data () {
    return {
      error: ''
    }
  },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Attempt to save and submit new quiz to database.
     */
    async save () {
      // save quiz if input valid
      if (this.validate(this.quiz)) {
        try {
          // save quiz to database
          await QuizzesService.post(this.quiz)
          // display toast on successful save
          this.$toasted.show('Quiz Created!', {
            theme: 'outline',
            position: 'top-center',
            duration: 2000
          })
          // navigate back to quizzes page
          // on successful submission
          this.navigateTo({name: 'quizzes'})
        } catch (err) {
          // update error value
          this.error = err.response.data.error
        }
      } else this.error = 'No empty fields allowed.'
    },
    /**
     * Ensure no empty values in any questions or any question options.
     */
    validate (quiz) {
      if (!quiz.title) return false
      for (let i = 0; i < quiz.questions.length; i++) {
        if (!quiz.questions[i].text) return false
        for (let j = 0; j < quiz.questions[i].questionOptions.length; j++) {
          if (!quiz.questions[i].questionOptions[j].text) return false
        }
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
