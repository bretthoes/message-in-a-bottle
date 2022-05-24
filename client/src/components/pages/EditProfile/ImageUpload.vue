<template>
  <div>
    <img
      class="profile-picture"
      alt="Profile picture"
      :src="imgUrl"
    />
    <br />
    <input
      @change="selectFile($event)"
      type="file"
      name="blobUrl"
      id="file"
    />
    <div class="error" v-if="error" v-html="error" />
    <br /><br />
  </div>
</template>

<script>
/**
 * Component for image upload view and functionality of EditProfile.
 */
export default {
  data () {
    return {
      name: 'ImageUpload',
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
      error: null,
      previewImage: null
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    file: {
      type: File,
      required: false
    }
  },
  computed: {
    // computed property to load user profile image after user is defined, will preferentailly load preview image if valid
    imgUrl () {
      if (this.previewImage) return URL.createObjectURL(this.previewImage)
      if (this.user.blobUrl) return 'data:' + this.user.imageType + ';charset=utf-8;base64,' + this.user.blobUrl
      else return require('@/assets/default_profile_picture.png')
    }
  },
  methods: {
    /**
     * Selects uploaded file from user.
     */
    selectFile (event) {
      // validate image before update emit
      if (this.validateImageUpload(event.target.files[0])) {
        // update preview image
        this.previewImage = event.target.files[0]
        this.$emit('updateImage', event.target.files[0])
      }
    },
    /**
     * Validate image selected by user.
     */
    validateImageUpload (image) {
      // reset error on new attempt
      this.error = null
      // enforce size limit on file upload
      if (image.size > process.env.MAX_UPLOAD_BYTES) {
        this.error = 'File is too large! Max size: 5mb.'
      }
      // ensure valid file type
      if (!this.allowedFileTypes.includes(image.type)) {
        this.error = 'File type not allowed! Only png or jpg.'
      }
      return !this.error
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-picture {
  border-radius: 300px;
  margin-bottom: 8px;
  box-shadow: 5px 5px 5px grey;
  width: 400px;
  height: 400px;
  object-fit: cover;
}
.error {
  color: red;
  text-align: left;
  padding: 4px;
  font-size: 18px;
}
</style>
