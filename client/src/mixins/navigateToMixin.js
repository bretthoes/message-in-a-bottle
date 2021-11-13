export default {
  methods: {
    navigateTo (route) {
      // Move to selected route unless we are already on it
      if (this.$router.currentRoute.name !== route.name) {
        this.$router.push(route)
      }
      // Ensure we close modal if user is navigating to account recovery page
      if (route.name === 'account-recovery') {
        this.$emit('close')
      }
    }
  }
}
