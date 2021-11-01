<template>
  <div class="container">
      <h1>Profile</h1>
      <!-- TODO: Build profile page with all profile info queried from db;
           edit button only visible if logged in user is same -->
    <img src="#" alt="Profile picture" width="500" height="600" />
    <br />
    <h3>Username</h3>
    <br />
    <h4>Birth Date</h4>
    <input type="date" id="birthdate" name="birthdate" value="1996-07-22" min="1899-01-01" max="2018-12-31" />
    <br />
    <h4>Location</h4>
    <input type="text" id="location" name="location" />
    <h5>About me:</h5>
    <p class="bio"></p>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  data () {
    return {
      user: null
    }
  },
  async mounted () {
    const userId = this.$store.state.route.params.userId
    console.log('hello from Profile.vue mounted!')
    console.log(this.$store.state.user.id)
    this.user = await UsersService.show(userId)
    console.log(this.user)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  width: 80%;
  padding: 12px;
  overflow: hidden;
}
</style>
