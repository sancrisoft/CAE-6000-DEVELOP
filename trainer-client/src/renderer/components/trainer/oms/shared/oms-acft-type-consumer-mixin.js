
export default {
  computed: {
    is6000 () {
      return this.$store.state.appContext.appConfig.acftType.indexOf('6000') > -1
    },
    is7000 () {
      return this.$store.state.appContext.appConfig.acftType.indexOf('7000') > -1
    },
    is7500 () {
      return this.$store.state.appContext.appConfig.acftType.indexOf('7500') > -1
    },
    isCseries () {
      return this.$store.state.appContext.appConfig.acftType.indexOf('Cseries') > -1
    }
  }
}
