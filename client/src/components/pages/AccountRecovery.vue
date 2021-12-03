<template>
  <div class="container-fluid">
      <h3>Get back into your account</h3>
      <p>Enter your email used to make the account:</p>
      <form @submit.prevent="submit">
        <input
          v-model='email'
          type='email'
          name='email'
          ref='email'
          minlength='4'
          maxlength='32'
          autocomplete='off'
          required
          :disabled="submitted"
        />
        <br />
        <button
          type="submit"
          class="btn-sm btn-secondary"
          :disabled="submitted || this.email == null || this.email == ''">
          Send
        </button>
        <br />
        <div class='error'>{{error}}</div>
      </form>
      <div v-if="submitted">
        <p style="color:green;">
          Success! Please check your email for instructions to get back into your account.
        </p>
        <a href='#' @click='(navigateTo({ name: "root" }))'>
          Return home.
        </a>
      </div>
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'AccountRecovery',
  data () {
    return {
      email: null,
      error: null,
      submitted: false,
      required: (value) => !!value || 'Required'
    }
  },
  mixins: [navigateToMixin],
  methods: {
    async submit () {
      this.error = null
      try {
        const response = await AuthenticationService.reset({email: this.email})
        this.submitted = true
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  max-width: 500px;
  text-align: left;
}
h3 {
  font-weight: bold;
}
input {
  width:75%;
}
button {
  margin-top: 10px;
}
.error {
  color: red;
}
</style>
