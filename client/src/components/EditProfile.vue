<template>
  <base-panel>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row">
          <div class="col col-md-6 col-sm-12">
            <img class="profile-picture" alt="Profile picture" :src="imgUrl" width="500" />
            <br />
              <input @change="selectFile($event)" type="file" name="blobUrl" id="file" />
            <br /><br />
            <h2><b-icon icon="person-fill">
              </b-icon><input type="text" v-model="user.username" required :rules="[required]" minlength="4" maxlength="16" />
            </h2>
            <br />
            <h4 class="field">
              <b-icon icon="gift"> </b-icon><input type="date" v-model="user.birthdate" :rules="[required]" />
            </h4>
            <br />
            <h4 class="field">
              <b-icon icon="tags"></b-icon> <input type="text" v-model="user.location" :rules="[required]" />
            </h4>
          </div>
          <div class="col col-md-6 col-sm-12">
            <h4>About me:</h4>
            <textarea v-model="user.biography" class="bio" :rules="[required]"></textarea>
          </div>
      </div>
      <div class="button-container">
        <base-button
          v-if="$store.state.user.id == user.id"
          buttonPosition="right"
          type="submit"
          buttonColor="blue">Save
        </base-button>
        <base-button
          @click="navigateTo({ name: 'user', params: { userId: $store.state.user.id }})"
          v-if="$store.state.user.id == user.id"
          buttonPosition="right"
          buttonColor="red">Cancel
        </base-button>
        <br /><br />
        <div class='error' v-html='error' />
      </div>
    </form>
  </base-panel>
</template>

<script>
import BasePanel from '@/components/BasePanel'
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
import BaseButton from './BaseButton.vue'
export default {
  data () {
    return {
      user: {
        username: null,
        blobUrl: null,
        imageType: null,
        birthdate: null,
        location: null,
        biography: null
      },
      error: null,
      file: null,
      required: (value) => !!value || 'Required'
    }
  },
  components: {
    BasePanel, BaseButton
  },
  mixins: [navigateToMixin],
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
  computed: {
    // computed property to load user profile image after user is defined
    imgUrl () {
      return this.user.blobUrl ? 'data:' + this.user.imageType + ';charset=utf-8;base64,' +
        this.user.blobUrl : require('../assets/default_profile_picture.png')
    }
  },
  methods: {
    selectFile (event) {
      this.file = event.target.files[0]
    },
    async submit () {
      this.error = null
      try {
        // hit update endpoint if file was added to update user
        // and image data simultaneously, else just update user
        // without expensive sending of FormData object
        if (this.file) {
          // declare FormData object and append file
          let formData = new FormData()
          // TODO add validation/security for file uploads to ensure only png/jpg
          formData.append('file', this.file)

          // append user fields to formData being sent to backend
          for (var key in this.user) {
            formData.append(key, this.user[key])
          }
          await UsersService.update(formData)
        } else {
          await UsersService.put(this.user)
        }
        // redirect back to user profile upon successful submit
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
.row {
  padding: 12px;
}
.col {
  text-align: left;
  position: relative;
}
.profile-picture {
  border-radius: 300px;
  margin-bottom: 8px;
  max-width: 100%;
  height: auto;
  box-shadow: 5px 5px 5px grey;
}
textarea {
  resize: none;
  width: 80%;
  height: 80%;
  box-shadow: 5px 5px 5px grey;
}
.error {
  color: red;
  text-align: right;
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
