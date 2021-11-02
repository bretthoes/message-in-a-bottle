<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-6 col-sm-12">
        <img class="profile-picture" alt="Profile picture" :src="userWithImage.imageUrl" width="500" />
        <br />
        <h2 class="username field"><b-icon icon="person-fill"></b-icon> {{user.username}}</h2>
        <br />
        <h4 class="field"><b-icon icon="gift"></b-icon> {{user.birthdate || 'No birthday added.'}}</h4>
        <br />
        <h4 class="field"><b-icon icon="tags"></b-icon> {{user.location || 'No location added.'}}</h4>
      </div>
      <div class="col col-md-6 col-sm-12">
        <h4>About me:</h4>
        <textarea v-model="user.biography" class="bio" readonly></textarea>
      </div>
    </div>
    <button @click="navigateTo({
      name: 'user-edit',
      params: {
        userId: user.id
      }
    })" style="float:right;" type="button" class="btn btn-secondary">Edit</button>
  </div>
</div>
  <!-- TODO add edit only visible button if user id matches store state user -->
</template>

<script>
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    // get userId from route params
    const userId = this.$store.state.route.params.userId
    // retrieve user from id to populate profile page
    this.user = (await UsersService.show(userId)).data
  },
  mixins: [navigateToMixin],
  computed: {
    // computed property to load user profile image after user is defined
    userWithImage () {
      if (this.user.imageUrl) {
        return {
          ...this.user,
          imageUrl: this.user.imageUrl && require(`@/assets/${this.user.imageUrl}`)
        }
      }
      // load default image if user profile image is undefined
      return {
        imageUrl: require('../assets/default_profile_picture.png')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  border: 1px solid #e6e6e6;
  background-color: #F4F4F4;
  padding: 12px;
  max-width: 80%;
  overflow: hidden;
}
.row {
  padding: 12px;
}
.col {
  text-align: left;
}
.profile-picture {
  border-radius: 5px;
  margin-bottom: 8px;
  max-width: 100%;
  height: auto;
  box-shadow: 5px 5px 5px grey;
}
textarea {
  resize: none;
  width: 80%;
  height: fit-content;
  box-shadow: 5px 5px 5px grey;
}
</style>
