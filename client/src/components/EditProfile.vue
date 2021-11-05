<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col col-md-6 col-sm-12">
          <img class="profile-picture" alt="Profile picture" :src="userWithImage.imageUrl" width="500" />
          <br />
          <!-- TODO finish image upload capabilities with Multer -->
          <form @submit.prevent="submitFile" method="POST" enctype="multipart/form-data">
            <input @change="selectFile($event)" type="file" name="imageUrl" id="file" />
            <button type="submit" class="btn btn-outline-dark">Upload Image</button>
          </form>
          <br /><br />
          <h2><b-icon icon="person-fill">
            </b-icon><input type="text" v-model="user.username" required :rules="[required]" minlength="4" maxlength="16" />
          </h2>
          <br />
          <h4 class="field">
            <b-icon icon="gift"> </b-icon><input type="date" v-model="user.birthdate" required :rules="[required]" />
          </h4>
          <br />
          <h4 class="field">
            <b-icon icon="tags"></b-icon> <input type="text" v-model="user.location" required :rules="[required]" />
          </h4>
        </div>
        <div class="col col-md-6 col-sm-12">
          <h4>About me:</h4>
          <textarea v-model="user.biography" class="bio" :rules="[required]"></textarea>
          <div class="bottom-right">
            <button @click="save" type="button" class="btn btn-primary">Save</button>
            <button
              @click="navigateTo({
                        name: 'user',
                        params: {
                          userId: $store.state.user.id
                        }
                      })" type="button" class="btn btn-danger">Cancel</button>
            <br /><br />
            <div class='error' v-html='error' />
          </div>
        </div>
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
      user: {
        username: null,
        email: null,
        imageUrl: null,
        birthdate: null,
        location: null,
        biography: null
      },
      error: null,
      file: null,
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
      // TODO update token with SetUser if username is changed here
      // so the username displayed in nav updates
      // TODO combine submitFile into this method as well by
      // appending user to formData I think. Make the form the entire
      // template if need be and pass info at once instead of having
      // 2 different calls going on for editing the same table.
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
    },
    selectFile (event) {
      this.file = event.target.files[0]
    },
    async submitFile () {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('userId', this.$store.state.user.id)
      await UsersService.upload(formData)
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
}
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
.bottom-right {
  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>
