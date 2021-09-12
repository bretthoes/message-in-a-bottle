export default {
  methods: {
    navigateTo (route) {
      // Move to selected route unless we are already on it
      if (this.$router.currentRoute.name !== route.name) {
        this.$router.push(route)
      }
      // TODO: Only really necessary when we navigate to account recovery (only
      // accessible through login modal, which needs to be closed after navigation)
      // need a cleaner way to do this instead of checking at every navigation
      if (route.name === 'account-recovery') {
        this.$emit('close')
      }
    }
  }
}
