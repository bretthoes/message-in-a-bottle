<template>
  <div class="content">
    <h1>Inbox</h1>
    <br />
    <div class="container-fluid">
      <div class="row">
        <div class="left col-md-4 col-sm-12">
          <h3 style="text-align:left;">Matches</h3>
          <ul class="match-container">
            <li v-for="(match,index) in matches" :key="index" @click="getQuizNameFromMatch(match)" class="matched-user">
              {{getUsernameById(match.UserId)}}
            </li>
          </ul>
        </div>
        <div class="col-md-8 col-sm-12">
          <h3>Chat</h3>
          <!-- TODO use a tag below to navigate to quiz response AND to user profile -->
          <div v-if="currentChatMatchName !== '' && currentChatQuizTitle !== ''">
            <h4>Chatting with
              <a
                @click="navigateTo({
                  name: 'user',
                  params: {
                    userId: getIdByUsername(currentChatMatchName)
                  }
                })"
                href='#'>{{currentChatMatchName}}</a>, you matched on:
              <a
              @click="navigateTo({
                name: 'quiz',
                params: {
                  quizId: getQuizIdByTitle(currentChatQuizTitle)
                }
              })"
              href="#">{{currentChatQuizTitle}}
              </a>
            </h4>
          </div>
          <div class="chat-container">
            <div class="chat-screen">
            </div>
            <b-input-group class="mt-3">
              <b-form-input></b-form-input>
              <b-input-group-append>
                <button>Send</button>
              </b-input-group-append>
            </b-input-group>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import QuizResponsesService from '@/services/QuizResponsesService'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  data () {
    return {
      matches: [],
      quizzes: [],
      matchProfiles: [],
      currentChatMatchName: '',
      currentChatQuizTitle: '',
      text: ''
    }
  },
  mixins: [navigateToMixin],
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
      this.matches = (await QuizResponsesService.index(this.$store.state.user.id)).data
      // query users table to get usernames for display in list above instead of ids
      const matchIds = this.matches.map(m => m.UserId)
      this.matchProfiles = (await UsersService.index(matchIds)).data
      // TODO query quizzes table to get quiz names for display in match list
      const quizIds = this.matches.map(m => m.QuizId)
      this.quizzes = (await QuizzesService.index(quizIds)).data
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
    },
    getIdByUsername (username) {
      const user = this.matchProfiles.find(p => p.username === username)
      if (user) return user.id
      else return 0
    },
    getQuizTitleById (id) {
      const quiz = this.quizzes.find(q => q.id === id)
      if (quiz) return quiz.title
      else return ''
    },
    getQuizIdByTitle (title) {
      const quiz = this.quizzes.find(q => q.title === title)
      if (quiz) return quiz.id
      else return 0
    },
    getQuizNameFromMatch (match) {
      this.currentChatMatchName = this.getUsernameById(match.UserId)
      this.currentChatQuizTitle = this.getQuizTitleById(match.QuizId)
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
.chat-screen {
  background-color: white;
  min-height: 300px;
  margin: auto;
  border: 1px solid black;
}
.chat-container {
  width: 80%;
  margin: auto;
}
button {
  cursor: pointer;
  width: 70px;
  height: 100%;
  font-size: 14px;
  border: 1px solid black;
  border-left: 2px solid black;
  box-shadow: 1px 2px;
}
button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
  background-color: #B1D3E1;
}
</style>
