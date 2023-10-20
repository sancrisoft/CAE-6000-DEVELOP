export default {
  data () {
    return {
      confirmPanel: false
    }
  },
  computed: {
    target () {
      return this.$options.name
    }
  },
  mounted () {
    this.$bus.$on('closeWindow', (windowPropName) => {
      this.reset()
    })
  },
  beforeDestroy () {
    this.$bus.$off('closeWindow')
  },
  methods: {
    setConfirmPanel (bool) {
      this.confirmPanel = bool
    },
    reset () {
      this.confirmPanel = false
      this.newTailNo = null
    }
  }
}
