<template>
<div>
  <br />
  <h2 class="username field">
    <b-icon icon="person-fill"></b-icon> {{user.username}}
    <span
      v-if="this.$store.state.user.isAdmin"
      style="color:green;">
      (admin)
    </span>
  </h2>
  <br />
  <h4 class="field">
    <b-icon icon="gift"></b-icon> {{getFormattedDate(user.birthdate) || 'No birthday added.'}}
  </h4>
  <br />
  <h4 class="field" >
    <b-icon icon="tags"></b-icon> {{user.location || 'No location added.'}}
  </h4>
</div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import dateFormat from 'dateformat'
/**
 * Component for delete view and functionality.
 */
export default {
  name: 'DetailsView',
  mixins: [navigateToMixin],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Return formatted date for display.
     */
    getFormattedDate (date) {
      return dateFormat(date, 'mmmm dS, yyyy')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
