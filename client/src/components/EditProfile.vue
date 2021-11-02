<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-6 col-sm-12">
        <button type="button" class="btn btn-outline-dark">Upload Image</button>
        <img class="profile-picture" alt="Profile picture" :src="userWithImage.imageUrl" width="500" />
        <br />
        <h2><b-icon icon="person-fill"> </b-icon><input type="text" v-model="user.username" required :rules="[required]" /></h2>
        <br />
        <h4 class="field"><b-icon icon="gift"> </b-icon><input type="date" v-model="user.birthdate" required :rules="[required]" /></h4>
        <br />
        <h4 class="field"><b-icon icon="tags"></b-icon> <input type="text" v-model="user.location" required :rules="[required]" /></h4>
      </div>
      <div class="col col-md-6 col-sm-12">
        <h4>About me:</h4>
        <textarea v-model="user.biography" class="bio" :rules="[required]"></textarea>
      </div>
    </div>
    <button @click="save" style="float:right;" type="button" class="btn btn-primary">Save</button>
    <button
      @click="navigateTo({
                name: 'user',
                params: {
                  userId: $store.state.user.id
                }
              })" style="float:right;" type="button" class="btn btn-danger">Cancel</button>
    <br /><br />
    <div class='error' v-html='error' />
  </div>
  <!-- TODO add edit only visible button if user id matches store state user -->
</template>

<script>
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  data () {
    return {
      user: {
        username: null,
        email: null,
        imageUrl: null,
        birthdate: null,
        location: null,
        biography: null
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  mixins: [navigateToMixin],
  async mounted () {
    try {
      // get userId from route params
      const userId = this.$store.state.route.params.userId
      // retrieve user from id to populate profile page
      this.user = (await UsersService.show(userId)).data
    } catch (err) {
      console.log(err)
    }
  },
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
  },
  methods: {
    async save () {
      console.log('Hello1 from EditProfile.vue save!')
      this.error = null
      try {
        await UsersService.put(this.user)
        this.navigateTo({
          name: 'user',
          params: {
            userId: this.$store.state.user.id
          }
        })
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
.error {
  color: red;
  text-align: right;
}
</style>
