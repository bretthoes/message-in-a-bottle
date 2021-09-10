export default {
  methods: {
    navigateTo (route) {
      // Move to selected route unless we are already on it
      if (this.$router.currentRoute.name !== route.name) {
        this.$router.push(route)
      }
      // TODO: Only really necessary when we navigate to account recovery at the moment,
      // may be a cleaner way to do this instead of calling at every navigation from header
      // this.closeModal()
    }
  }
}
