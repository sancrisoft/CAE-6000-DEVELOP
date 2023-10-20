let viewBtnEvent = 'viewBtnEvent'
let viewBackBtnEvent = 'viewBackBtnEvent'

export default {
  data () {
    return {
      viewBtnEvent: 'viewBtnEvent',
      viewBackBtnEvent: 'viewBackBtnEvent'
    }
  },
  mounted () {
    this.$bus.$on('viewBtnEvent', () => {
      this.viewBtnClicked()
    })
    this.$bus.$on('viewBackBtnEvent', () => {
      this.viewBackBtnClicked()
    })
  },
  beforeDestroy () {
    this.$bus.$off(viewBtnEvent)
    this.$bus.$off(viewBackBtnEvent)
  },
  methods: {
    viewBtnClicked () {
      console.warn(viewBtnEvent + ' button was clicked please provide override')
    },
    viewBackBtnClicked () {
      console.warn(viewBackBtnEvent + ' button was clicked please provide override')
    }
  }
}
