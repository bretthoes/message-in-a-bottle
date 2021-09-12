export default {
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    openModal (isRegister) {
      this.$refs.modalComponent.updateIsRegister(isRegister)
      // Determine whether to display login or register content of modal
      // Open modal
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
