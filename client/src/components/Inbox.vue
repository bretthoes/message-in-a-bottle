<template>
  <div class="content">
    <base-title>Inbox</base-title>
    <br />
    <base-panel>
      <div class="row">
        <div class="left col-md-4 col-sm-12">
          <h3 style="text-align:left;">Matches</h3>
          <ul class="match-container">
            <li
              v-for="(match,index) in matches"
              :key="index"
              @click="setCurrentChatCulture(match, index)"
              :class="{'active': index === activeIndex}"
              class="matched-user">
              {{getUsernameById(match.UserId)}}
              <span v-if="onlineUsers[match.UserId]"> <!-- get online status here using userId -->
                <b-icon style="float:right;" icon="circle-fill" variant="success" v-b-tooltip.hover title="Online"></b-icon>
              </span>
              <span v-else>
                <b-icon style="float:right;" icon="circle" variant="secondary" v-b-tooltip.hover title="Offline"></b-icon>
              </span>
            </li>
          </ul>
          <h5 style="text-align:center;" v-if="matches.length === 0">No matches!</h5>
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
                href='#'
                class="title-link">{{currentChatMatchName}}</a>, you matched on:
              <a
              @click="navigateTo({
                name: 'quiz',
                params: {
                  quizId: getQuizIdByTitle(currentChatQuizTitle)
                }
              })"
              href="#"
              class="title-link">{{currentChatQuizTitle}}
              </a>
            </h4>
          </div>
          <div class="chat-container">
            <div class="chat-screen">
              <div class="message-container"
                v-for="(m,index) in messages.slice().reverse()"
                :key="index"
                v-bind:class="{self: m.userId === $store.state.user.id}">
                <div
                  v-if="m.roomId === matchId"
                  class="message">
                  {{m.message}}
                </div>
                <span class="timestamp" v-if="m.roomId === matchId">{{getFormattedCurrentMinute()}}</span>
              </div>
            </div>
            <form @submit.prevent="sendMessage">
              <b-input-group class="mt-3">
                <b-form-input placeholder="Send message..." type="text" v-model="message" :disabled="currentChatMatchName === ''"></b-form-input>
                <b-input-group-append>
                  <button type="submit" :disabled="currentChatMatchName === ''">Send</button>
                </b-input-group-append>
              </b-input-group>
            </form>
        </div>
        </div>
      </div>
    </base-panel>
  </div>
</template>

<script>
import BasePanel from '@/components/BasePanel'
import BaseTitle from '@/components/BaseTitle'
import UsersService from '@/services/UsersService'
import QuizResponsesService from '@/services/QuizResponsesService'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
import dateFormat from 'dateformat'
import io from 'socket.io-client'
export default {
  data () {
    return {
      socket: {},
      onlineUsers: {},
      matches: [],
      quizzes: [],
      rooms: [],
      matchProfiles: [],
      messages: [],
      currentChatMatchName: '',
      currentChatQuizTitle: '',
      message: '',
      matchId: 0,
      activeIndex: null
    }
  },
  components: {
    BasePanel, BaseTitle
  },
  mixins: [navigateToMixin],
  // ensure socket connection is closed
  // when this route is left
  beforeRouteLeave (next) {
    if (this.socket.id) {
      console.log('closing socket on route exit...')
      this.socket.close()
    }
    next()
  },
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
      this.matches = (await QuizResponsesService.index(this.$store.state.user.id)).data
      // only fetch user and quiz data and
      // set up socket if user has matches
      if (this.matches.length > 0) {
        // query users table to get usernames for display in list above instead of ids
        const matchedUserIds = this.matches.map(m => m.UserId)
        this.matchProfiles = (await UsersService.index(matchedUserIds)).data
        //  query quizzes table to get quiz names for display in match list
        const quizIds = this.matches.map(m => m.QuizId)
        this.quizzes = (await QuizzesService.index(quizIds)).data

        console.log('matchedUserIds', matchedUserIds)
        console.log('matches', this.matches)
        // uniquely create array of rooms from match info
        for (const match of this.matches) {
          this.rooms.push(this.getRoomId(match.QuizId, match.UserId, this.$store.state.user.id))
        }
        // declare queryParams to send to server
        const queryParams = { userId: this.$store.state.user.id, rooms: this.rooms }
        // join all match chat rooms
        this.socket = io('localhost:8081', {
          transports: ['websocket'],
          query: queryParams,
          reconnection: false,
          rejectUnauthorized: false
        })
        // emit user logging in on connection
        this.socket.once('connect', () => {
          // user online
          this.socket.on('online', (users) => {
            this.onlineUsers = users
          })
          // user offline
          this.socket.on('offline', (users) => {
            this.onlineUsers = users
          })
        })

        // listen for messages from web socket
        this.socket.on('MESSAGE', (data) => {
          console.log('MESSAGE:', data)
          // append message to messages array
          this.messages = [...this.messages, data]
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    sendMessage (e) {
      // ensure message is not blank before send
      if (this.message.trim() !== '') {
        // send message to socket
        this.socket.emit('SEND_MESSAGE', {
          username: this.$store.state.user.username,
          userId: this.$store.state.user.id,
          message: this.message,
          roomId: this.matchId
        })
        // reset message input
        this.message = ''
      }
    },
    /* various getters/setters for use on page */
    // get username from id in matchProfiles
    getUsernameById (id) {
      const user = this.matchProfiles.find(p => p.id === id)
      if (user) return user.username
      else return ''
    },
    // get id from username in matchProfiles
    getIdByUsername (username) {
      const user = this.matchProfiles.find(p => p.username === username)
      if (user) return user.id
      else return 0
    },
    // get quiz title from id in quizzes
    getQuizTitleById (id) {
      const quiz = this.quizzes.find(q => q.id === id)
      if (quiz) return quiz.title
      else return ''
    },
    // get quiz id from title in quizzes
    getQuizIdByTitle (title) {
      const quiz = this.quizzes.find(q => q.title === title)
      if (quiz) return quiz.id
      else return 0
    },
    // return current minute formatted for display with message1
    getFormattedCurrentMinute () {
      const now = new Date()
      return dateFormat(now, 'h:MM TT')
    },
    // set matched user and quiz name for display in chat
    setCurrentChatCulture (match, index) {
      // no need to switch chats if we're already on the user
      if (this.activeIndex !== index) {
        // toggle active match to add background color
        this.toggle(index)
        // update match name and quiz title
        this.currentChatMatchName = this.getUsernameById(match.UserId)
        this.currentChatQuizTitle = this.getQuizTitleById(match.QuizId)
        // meed to set roomId here
        this.matchId = this.getRoomId(match.QuizId, match.UserId, this.$store.state.user.id)
      }
    },
    // generate unique match id for private room creation.
    // concatenates both userIds of a match and adds
    // quizId to string to create unique matchid for room
    getRoomId (quizId, matchedUserId, thisUserId) {
      // sort ids to ensure strings are identical for both users
      // connecting to private room
      const userIds = [matchedUserId, thisUserId].sort((a, b) => a - b)
      return userIds.join('').toString() + quizId.toString()
    },
    toggle (index) {
      this.activeIndex = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 24px;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  display: block;
}
.left {
  border-right: 2px solid #65a8c48c;
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
.active {
  background-color: #B1D3E1;
  cursor:not-allowed;
}
.match-container {
  border-top: 4px solid #e6e6e6;
}
.chat-screen {
  background-color: white;
  min-height: 500px;
  max-height: 500px;
  margin: auto;
  border: 1px solid lightgray;
  border-radius: 3px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}
.chat-container {
  width: 90%;
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
.message-container {
  padding: 8px;
  margin: 4px;
  text-align: left;
  word-wrap: break-all;
}
.message {
  border: 1px solid #e6e6e6;
  background-color: #e6e6e6;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  margin: 4px;
  -ms-word-break: break-all;
  word-break: break-all;

 /* Non standard for webkit */
  word-break: break-word;

  -webkit-hyphens: auto;
     -moz-hyphens: auto;
      -ms-hyphens: auto;
          hyphens: auto;
}
.self {
  align-self: flex-end;
  text-align: right;
}
.self > div {
  background-color: rgba(135, 206, 250, 0.561);
}
.timestamp {
  font-size: 12px;
  color: darkgray;
}
.title-link {
  text-decoration: none;
  color: #3392bb;
  font-weight: bold;
}
.title-link:hover {
  text-decoration: underline;
}
</style>
