<template>
  <base-panel>
    <b-row class="row">
      <b-col
        md="6"
        sm="12">
        <image-upload :user="user" :file="file" @updateImage="(newImage) => file = newImage"/>
        <h2>
          <b-icon icon="person-fill"></b-icon>
          <input
            type="text"
            v-model="user.username"
            minlength="4"
            maxlength="16"
          />
        </h2>
        <br />
        <h4>
          <b-icon icon="gift"></b-icon>
          <input
            type="date"
            v-model="user.birthdate"/>
        </h4>
        <br />
        <h4>
          <b-icon icon="tags"></b-icon>
          <input
            type="text"
            v-model="user.location"/>
        </h4>
      </b-col>
      <b-col
      md="6"
      sm="12">
        <h4>About me:</h4>
        <textarea
          v-model="user.biography"
          class="bio"
        ></textarea>
      </b-col>
    </b-row>
    <save :user="user" :file="file"/>
  </base-panel>
</template>

<script>
import BasePanel from '@/components/ui/BasePanel'
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
import Save from './Save'
import ImageUpload from './ImageUpload'
/**
 * Component for edit profile view, allow user to edit profile info.
 */
export default {
  data () {
    return {
      name: 'EditProfile',
      user: {
        username: null,
        blobUrl: null,
        imageType: null,
        birthdate: null,
        location: null,
        biography: null
      },
      file: null
    }
  },
  components: {
    BasePanel, Save, ImageUpload
  },
  mixins: [navigateToMixin],
  /**
   * Called on component mounted.
   */
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  padding: 12px;
  text-align: left;
}
textarea {
  resize: none;
  width: 80%;
  height: 80%;
  box-shadow: 5px 5px 5px grey;
}
</style>
