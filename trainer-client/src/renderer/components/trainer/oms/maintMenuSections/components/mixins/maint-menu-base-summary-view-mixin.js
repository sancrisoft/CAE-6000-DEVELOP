
import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import tabContainer from '@/components/trainer/oms/maintMenuSections/components/display/tab-container'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import parameterGroupSelector from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector'
import parameterGroupDisplayList from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-display-list'
import Vue from 'vue'
import {VueTabs, VTab} from 'vue-nav-tabs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      refreshing: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      summary: state => state.appContext.omsViewPort.data,
      editMode: state => state.appContext.appConfig.editMode
    }),
    hasFaultMSGS () {
      return this.summary.faultMSGS && this.summary.faultMSGS.length
    },
    hasFaultCode () {
      return this.summary.fault && this.summary.fault.code.length
    },
    hasFDEs () {
      return this.summary.fdeData && this.summary.fdeData.length
    },
    hasMSG () {
      return this.summary.msgData && this.summary.msgData.length
    },
    hasSummary () {
      return Object.keys(this.summary).length
    },
    hasLRU () {
      return this.summary.lruData && this.summary.lruData.length
    },
    lruData () {
      // Deep clone, to strip vuex reactivity for editing purposes.
      let lruData = !this.hasLRU ? [] : JSON.parse(JSON.stringify(this.summary.lruData))

      // Apply local reactivity for editing purposes across multiple components.
      // TODO: Review if there is a better pattern to create this reactivity.
      let lruDataVue = new Vue({
        data: {
          lruData
        }
      })

      return lruDataVue.lruData
    }
  },
  mixins: [viewBtnsMixin],
  created () {
    this.$store.dispatch('appContext/omsViewPort/maintMenuFilterDataList')
  },
  mounted () {
    this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenu', target: 'maintmenu' })

    this.$store.dispatch('appContext/setContextMenuSelectedChildItem', { component: 'maintMenuSections', target: this.$options.name })

    this.$store.dispatch('appContext/setSelectedView', { 'component': 'maintMenuSections', 'view': this.$options.name.replace('summary', '') })

    this.$bus.$on('directory-list-refresh', () => {
      this.refresh()
    })

    this.$bus.$on('directory-list-expandAll', () => {
      this.expandAll()
    })

    this.$bus.$on('directory-list-collapseAll', () => {
      this.collapseAll()
    })
  },
  beforeDestroy () {
    this.$bus.$off('directory-list-refresh')
    this.$bus.$off('directory-list-expandAll')
    this.$bus.$off('directory-list-collapseAll')
    this.$bus.$off('parameterGroupSelected')
  },
  components: {
    VueTabs,
    VTab,
    tabContainer,
    omsNoDataDisplay,
    parameterGroupSelector,
    parameterGroupDisplayList
  },
  methods: {
    expandAll () {
      this.$bus.$emit('directorylist.expandCollapse', true)
    },
    collapseAll () {
      this.$bus.$emit('directorylist.expandCollapse', false)
    },
    refresh () {
      this.refreshing = true
      this.collapseAll()
      setTimeout(() => {
        this.refreshing = false
      }, 500)
    },
    viewBackBtnClicked () {
      let maintMenuState = this.getContextMenuListSelectedState('maintMenuSections')
      this.$store.dispatch('appContext/resetContextMenuSelectedChildItem', { component: 'maintMenuSections', id: maintMenuState.id })
      this.$bus.$emit('switchView', { component: 'maintMenuSections', view: (this.parentComponentName || maintMenuState.target), parentPage: this.parentPage })
    },
    getContextMenuListSelectedState (menu) {
      return this.$store.getters['appContext/getContextMenuListSelectedState'](menu)
    }
  }
}
