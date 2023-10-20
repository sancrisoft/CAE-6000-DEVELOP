import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import dataLoadOverlays from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-overlays'
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'

const timeOutDelay = 1500
let startloadTimeOut = null
const downloadDelay = 2000
const loadingFilesDelay = 500
let timeOut = null
export default {
  data () {
    return {
      startload: false,
      noItemSelected: false,
      mainPanel: true,
      download: false,
      enterpassword: false,
      detailsPanel: false,
      transferCompleted: true,
      completedRatio: 0,
      loaderError: false,
      loaderDone: false
    }
  },
  mounted () {
    this.$bus.$on('closeWindow', (windowPropName) => {
      this.hideLayer(windowPropName)
    })
    this.$bus.$on('startload', () => {
      this.showStartloadPanel()
    })
    this.$bus.$on('showDetailsWindow', () => {
      this.showDetailsPanel()
    })
    this.$bus.$on('loaderDone', () => {
      console.log(this.selectedChannel + ' : ' + this.loaderError)
      if (this.selectedChannel === 'off') {
        this.loaderError = true
      } else {
        this.loaderError = false
      }
      console.log(this.selectedChannel + ' : ' + this.loaderError)
      this.hideLayer('loader')
      this.showLayer('loaderDone')
    })

    this.$bus.$on('hideDetailsPanel', () => {
      this.detailsPanel = false
    })

    this.$store.dispatch('appContext/setSelectedView', { 'component': 'maintMenu', 'view': 'dataLoad' })
  },
  beforeDestroy () {
    this.$bus.$off('closeWindow')
    this.$bus.$off('startLoad')
    this.$bus.$off('showDetailsWindow')
    this.$bus.$off('loaderDone')
    this.$bus.$off('hideDetailsPanel')
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      detailsHeader: state => state.appContext.omsViewPort.detailsHeader,
      mainPanelList: state => state.appContext.omsViewPort.data.items,
      selectedDetails: state => state.appContext.omsViewPort.selectedDetails,
      selectedChannel: state => state.appContext.uploadChannel

    }),
    hasMainPanelList () {
      return this.mainPanelList
    }
  },
  components: {
    dataLoadOverlays,
    omsWindow
  },
  mixins: [viewBtnsMixin],
  methods: {
    showStartloadPanel () {
      if (this.selectedDetails && this.selectedDetails.length) {
        this.startload = true
        this.loader = true
        this.transferCompleted = true
        this.loaderDone = false

        startloadTimeOut = setTimeout(() => {
          this.startload = false
          this.loadFiles()
        }, timeOutDelay)
      } else {
        this.noItemSelected = true
      }
    },
    loadFiles () {
      this.completedRatio = 0
      this.transferCompleted = false
      let loaderInterval = setInterval(() => {
        this.completedRatio = this.completedRatio + 20
        if (this.completedRatio >= 100) {
          clearInterval(loaderInterval)
          this.transferCompleted = true
        }
      }, loadingFilesDelay)
    },
    showDetailsWindow () {
      this.$bus.$emit('showDetailsWindow')
    },
    hideDetailsPanel () {
      this.detailsPanel = false
    },
    showDetailsPanel () {
      this.detailsPanel = true
    },
    hideLayer (prop) {
      switch (prop) {
        case 'startload':
          clearTimeout(startloadTimeOut)
          break
        case 'loader':
          this.completedRatio = 0
          this.loaderDone = true
          break
      }
      this[prop] = false
    },
    showLayer (prop) {
      this[prop] = true
    },
    mainPanelItemSelectionChanged (index) {
      this.$store.dispatch('appContext/omsViewPort/toggleViewSelectedItem', index)
    },
    initOverlays () {
      if (!this.hasMainPanelList) return
      if ((this.mainPanelList && this.mainPanelList.length) || this.componentName === 'dataload') {
        this.download = true
        this.enterpassword = false

        timeOut = setTimeout(() => {
          this.download = false
          this.mainPanel = true
        }, downloadDelay)
      }
    },
    showMaintenance () {
      this.enterpassword = true
      this.mainPanel = false
      this.download = false
      clearTimeout(timeOut)
    },
    viewBtnClicked () {
      if (this.parentComponentName === 'dataload') {
        if (!this.enterpassword) {
          this.$store.dispatch('appContext/omsViewPort/setHeaderLabel',
            { label: 'viewBtnLabel', value: this.$store.state.appContext.omsViewPort.header.viewBtnLabelStates.alternate })
          this.showMaintenance()
        } else {
          this.$store.dispatch('appContext/omsViewPort/setHeaderLabel',
            { label: 'viewBtnLabel', value: this.$store.state.appContext.omsViewPort.header.viewBtnLabelStates.default })
          this.initOverlays()
        }
      } else {
        this.$bus.$emit('switchView', { component: 'maintMenu', view: 'dataload' })
      }
    },
    viewBackBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'dataloadmenu' })
    }
  }
}
