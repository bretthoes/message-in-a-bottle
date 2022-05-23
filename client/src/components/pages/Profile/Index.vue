<template>
<div>
  <base-panel>
    <b-row class="row">
      <b-col
        md="6"
        sm="12">
        <img
          class="profile-picture"
          alt="Profile picture"
          :src="imgUrl"
          width="500" />
        <details-view :user="user" />
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
  <delete :userId="this.$store.state.route.params.userId" />
</div>
</template>

<script>
import BasePanel from '@/components/ui/BasePanel'
import BaseButton from '@/components/ui/BaseButton'
import Delete from './Delete'
import DetailsView from './DetailsView'
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'

/**
 * Component for profile page view.
 */
export default {
  name: 'Profile',
  data () {
    return {
      user: {}
    }
  },
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
  },
  components: {
    BasePanel, BaseButton, Delete, DetailsView
  },
  mixins: [navigateToMixin],
  computed: {
    /**
     * Load user profile image after user is defined.
     * Load default avatar image if no profile image.
     */
    imgUrl () {
      return this.user.blobUrl ? 'data:' + this.user.imageType + ';charset=utf-8;base64,' +
        this.user.blobUrl : require('@/assets/default_profile_picture.png')
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
</style>
