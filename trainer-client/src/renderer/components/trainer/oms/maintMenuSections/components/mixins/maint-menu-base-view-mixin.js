
import maintmenuSortedDatalist from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist'
import maintmenuSortedDatalistHeader from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist-header'
import maintmenuSortedDatalistSelectors from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist-selectors'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import maintMenuPagerListDisplay from '@/components/trainer/oms/maintMenuSections/components/maint-menu-pager-list-display'
import utils from '@/components/trainer/oms/shared/utils/oms-utils'
import parameterGroupSelector from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector'
import parameterGroupDisplayList from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-display-list'
import omsPagingArrows from '@/components/trainer/oms/shared/paging/oms-paging-arrows'
import omsPagingCounter from '@/components/trainer/oms/shared/paging/oms-paging-counter'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentPage: 1,
      detailsPanel: 0,
      maxItemsPerPage: 9
    }
  },
  watch: {
    sortedData () {
      if (this.sortedData && this.sortedData.length) {
        utils.chunk(this.sortedData, this.maxItemsPerPage)
        this.currentPage = 1
      }
      this.updatePagerCounter()
    }
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      componentDetailsTarget: state => state.appContext.omsViewPort.componentDetailsTarget,
      parentComponentName: state => state.appContext.omsViewPort.parentComponentName,
      sortedData: state => state.appContext.omsViewPort.sortedData,
      viewCombo: state => state.appContext.omsViewPort.viewCombo,
      sortComboLabel: state => state.appContext.omsViewPort.sortComboLabel,
      sortCombo: state => state.appContext.omsViewPort.sortCombo,
      viewBackBtnOverride: state => state.appContext.viewBackBtnOverride
    }),
    id () {
      return utils.getRandomId(this.$options.name)
    },
    totalPages () {
      return this.pages.length
    },
    pages () {
      if (this.sortedData && this.sortedData.length) {
        return utils.chunk(this.sortedData, this.maxItemsPerPage)
      } else {
        return []
      }
    },
    sortedPage () {
      return this.pages[this.currentPage - 1]
    },
    pageLastItemCategory () {
      if (this.sortedPage) {
        let lastIndex = this.sortedPage.length - 1
        return this.sortedPage[lastIndex].category
      }
    },
    pageFirstItemAta () {
      if (this.sortedPage) {
        return this.sortedPage[0].ata
      }
    },
    hasPages () {
      return this.pages && this.pages.length > 1
    },
    hasSortedData () {
      return true
    }
  },
  components: {
    maintmenuSortedDatalist,
    maintmenuSortedDatalistHeader,
    maintmenuSortedDatalistSelectors,
    maintMenuPagerListDisplay,
    omsNoDataDisplay,
    parameterGroupSelector,
    parameterGroupDisplayList,
    omsPagingArrows,
    omsPagingCounter
  },
  mounted () {
    this.$bus.$on('maintMenuBaseViewLoad', this.init)
    this.init()
  },
  beforeDestroy () {
    this.$bus.$off('viewSelected')
    this.$bus.$off('sortSelected')
    this.$bus.$off('maintMenuBaseViewLoad')
  },
  methods: {
    init () {
      if (!this.viewBackBtnOverride) {
        this.$store.dispatch('appContext/resetContextMenuSelectedChildItem', { component: 'maintMenuSections', view: this.$options.name })
        this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenuSections', target: this.$options.name })
      }

      /* this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenu', target: 'maintmenu' }) */

      this.$store.dispatch('appContext/setSelectedView', { 'component': 'maintMenu', 'view': 'maintmenu' })

      this.$store.dispatch('appContext/omsViewPort/maintMenuFilterDataList')

      this.updatePagerCounter()
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.parentPage = 0
        this.updatePagerCounter()
      }
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.parentPage = 0
        this.updatePagerCounter()
      }
    },
    switchView (id) {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: this.componentDetailsTarget, id: id.toString(), parentPage: this.currentPage })
    },
    updatePagerCounter () {
      setTimeout(() => {
        let pagingCounterName = 'MaintmenuPagerList'
        this.currentPage = (this.parentPage) ? this.parentPage : this.currentPage
        this.$bus.$emit(`set${pagingCounterName}PagingCounter`, {
          current: this.currentPage,
          pages: this.pages.length
        })
      }, 50)
    }
  }
}
