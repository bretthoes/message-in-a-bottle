<template>
  <div class="content">
    <h1>Inbox</h1>
    <br />
    <div class="container-fluid">
      <div class="row">
        <div class="left col-md-4 col-sm-12">
          <h3 style="text-align:left;">Matches</h3>
          <ul class="match-container">
            <li v-for="(match,index) in matches" :key="index" class="matched-user">
              {{getUsernameById(match.UserId)}}
            </li>
          </ul>
        </div>
        <div class="col-md-8 col-sm-12">
          <h3>Chat</h3>
          <h4>matched on: </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import QuizResponsesService from '@/services/QuizResponsesService'
export default {
  data () {
    return {
      matches: [],
      matchProfiles: []
    }
  },
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
      this.matches = (await QuizResponsesService.index(this.$store.state.user.id)).data
      // query users table to get usernames for display in list above instead of ids
      const matchIds = this.matches.map(m => m.UserId)
      this.matchProfiles = (await UsersService.index(matchIds)).data
      // TODO query quizzes table to get quiz names for display in match list
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    getUsernameById (id) {
      // find username from id in matchProfiles
      const user = this.matchProfiles.find(p => p.id === id)
      if (user) return user.username
      else return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 32px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
h3 {
  font-size: 24px;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  display: block;

}
.container-fluid {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  width: 70%;
  padding: 12px;
  overflow: hidden;
  margin-bottom: 80px;
}
.left {
  border-right: 2px solid black;
}
.matched-user {
  padding: 14px;
  border-bottom: 4px solid #e6e6e6;
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
  list-style-type: none;
}
.matched-user:hover {
  background-color: #B1D3E1;
  cursor: pointer;
}
.match-container {
  border-top: 4px solid #e6e6e6;
}
</style>
