<template>
<v-container>
  <v-row justify="center">
    <v-col>
    <div class="border">
      <v-toolbar flat dense dark>
        <v-toolbar-title>
          Register
        </v-toolbar-title>
      </v-toolbar>
      <div>
          <br />
          <br />
          <v-text-field
          class="input"
          type="email"
          name="email"
          v-model="email"
          placeholder="Email" />
          <br />
          <br />
          <v-text-field
          class="input"
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"/>
          <br />
          <br />
          <div v-html="error" class="error" />
          <v-btn @click="register">Register</v-btn>
          <br />
          <br />
          <a href="#">Forgot your password?</a>
        </div>
    </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color:red;
}
.border{
  padding-bottom:9px;
  border: 1px solid #BFBFBF;
  box-shadow: 10px 10px 5px #aaaaaa;
  max-width:400px;
  margin:auto;
}
.input{
  padding:0 15px;
}
</style>
