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
    imgUrl: {
      type: Blob,
      required: true
    }
  },
  methods: {}
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
