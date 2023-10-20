
export default {
  computed: {
    isScnBuilder () {
      return this.$store.state.appContext.appConfig.role.indexOf('admin') > -1
    }
  }
}
