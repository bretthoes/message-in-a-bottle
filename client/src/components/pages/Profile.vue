<template>
<div>
  <base-panel>
    <b-row>
      <b-col
        md="6"
        sm="12">
        <img
          class="profile-picture"
          alt="Profile picture"
          :src="imgUrl"
          width="500" />
        <br />
        <h2 class="username field">
          <b-icon icon="person-fill"></b-icon> {{user.username}}
          <span
            v-if="this.$store.state.user.isAdmin"
            style="color:green;">(admin)
          </span>
        </h2>
        <br />
        <h4 class="field">
          <b-icon icon="gift"></b-icon> {{getFormmatedDate(user.birthdate) || 'No birthday added.'}}
        </h4>
        <br />
        <h4 class="field" >
          <b-icon icon="tags"></b-icon> {{user.location || 'No location added.'}}
        </h4>
      </b-col>
      <b-col
        md="6"
        sm="12">
        <h4>About me:</h4>
        <textarea
          v-model="user.biography"
          class="bio"
          readonly
          placeholder="No bio added yet..."></textarea>
      </b-col>
    </b-row>
    <base-button
      @click="navigateTo({ name: 'user-edit', params: { userId: user.id }})"
      v-if="$store.state.user.id == user.id"
      buttonPosition="right"
      buttonColor="blue">Edit
    </base-button>
  </base-panel>
  <a href="#"
    @click="deleteUser($store.state.user.id)"
    v-if="$store.state.user.id == user.id || $store.state.user.isAdmin"
    class="delete-profile">delete profile</a>
</div>
</template>

<script>
import BasePanel from '@/components/ui/BasePanel'
import BaseButton from '@/components/ui/BaseButton'
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
import dateFormat from 'dateformat'
export default {
  name: 'Profile',
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
      // get userId from route params
      const userId = this.$store.state.route.params.userId
      // retrieve user from id to populate profile page
      this.user = (await UsersService.show(userId)).data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    BasePanel, BaseButton
  },
  mixins: [navigateToMixin],
  computed: {
    // computed property to load user profile image after user is defined
    imgUrl () {
      return this.user.blobUrl ? 'data:' + this.user.imageType + ';charset=utf-8;base64,' +
        this.user.blobUrl : require('@/assets/default_profile_picture.png')
    }
  },
  methods: {
    async deleteUser (userId) {
      try {
        // make user manually type "DELETE" before proceeding with deletion
        const text = await this.$prompt('This is non-reversible! Type "DELETE" to delete your account forever.')
        if (text === 'DELETE') {
          // delete user
          await UsersService.delete(userId)
          // clear user and return to root page on delete
          this.navigateTo({ name: 'root' })
          this.$store.dispatch('setToken', null)
          this.$store.dispatch('setUser', null)
        }
      } catch (err) {
        if (err) console.log(err)
      }
    },
    getFormmatedDate (date) {
      return dateFormat(date, 'mmmm dS, yyyy')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  padding: 12px;
}
.col {
  text-align: left;
}
.profile-picture {
  border-radius: 300px;
  margin-bottom: 16px;
  max-width: 100%;
  box-shadow: 5px 5px 5px grey;
}
textarea {
  resize: none;
  width: 80%;
  height: 80%;
  box-shadow: 5px 5px 5px grey;
  background-color: #ececec;
}
.delete-profile {
  color: gray;
}
.delete-profile:hover {
  color: lightgray;
}
</style>
