<template>
<div>
  <a href="#"
    @click="deleteUser(userId)"
    v-if="$store.state.user.id == userId || $store.state.user.isAdmin"
    class="delete-profile">delete profile</a>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
import navigateToMixin from '@/mixins/navigateToMixin'
/**
 * Component for delete view and functionality.
 */
export default {
  name: 'Delete',
  mixins: [navigateToMixin],
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * Attempt to delete user.
     */
    async deleteUser (userid) {
      try {
        // make user manually type "DELETE" before proceeding with deletion
        const text = await this.$prompt('This is non-reversible! Type "DELETE" to delete your account forever.')
        if (text === 'DELETE') {
          // delete user
          await UsersService.delete(userid)
          // dispatch if self delete
          if (this.$store.state.user.id === userid) {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
          }
          // navigate to home page after delete
          this.navigateTo({ name: 'root' })
        }
      } catch (err) {
        if (err) console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete-profile {
  color: gray;
}
.delete-profile:hover {
  color: lightgray;
}
</style>
