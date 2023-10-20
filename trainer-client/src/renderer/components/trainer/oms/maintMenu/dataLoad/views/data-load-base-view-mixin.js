export default {
  data () {
    return {
      scrollableItemsToShow: 7
    }
  },
  created () {
    this.currentView = this.$options.name
  }
}
