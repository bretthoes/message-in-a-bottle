<template>
  <div>
    <img
      class="profile-picture"
      alt="Profile picture"
      :src="imgUrl" />
  </div>
</template>

<script>
/**
 * Component for delete view and functionality.
 */
export default {
  name: 'ProfilePictureView',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
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
.profile-picture {
  border-radius: 300px;
  width: 100%;
  max-width: 500px;
  height: auto;
  box-shadow: 5px 5px 5px grey;
  object-fit: cover;
}
</style>
