<template>
  <form
    @submit.prevent="save"
    enctype="multipart/form-data">
    <div class="button-container">
      <base-button
        @click="save"
        v-if="$store.state.user.id == user.id"
        buttonPosition="right"
        type="submit"
        buttonColor="blue"
        >Save
      </base-button>
      <base-button
        @click="
          navigateTo({
            name: 'user',
            params: { userId: $store.state.user.id }
          })"
        v-if="$store.state.user.id == user.id"
        buttonPosition="right"
        buttonColor="red"
        >Cancel
      </base-button>
      <br />
      <br />
      <div class="error" v-html="error" />
    </div>
  </form>
</template>

<script>
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
import BaseButton from '@/components/ui/BaseButton'
/**
 * Component for save view and functionality of EditProfile.
 */
export default {
  data () {
    return {
      name: 'Save',
      error: null
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
  components: {
    BaseButton
  },
  mixins: [navigateToMixin],
  methods: {
    /**
     * Attempt to save new user info.
     */
    async save () {
      // reset error on save attempt
      this.error = null
      try {
        // hit update endpoint if file was added to update user
        // and image data simultaneously, else just update user
        // without expensive sending of FormData object
        if (this.file) {
          // declare FormData object and append file
          let formData = new FormData()
          // append user fields to formData being sent to backend
          formData.append('file', this.file)
          for (var key in this.user) {
            formData.append(key, this.user[key])
          }
          // attempt update with form data
          await UsersService.update(formData)
        } else {
          // attempt put without form data
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
