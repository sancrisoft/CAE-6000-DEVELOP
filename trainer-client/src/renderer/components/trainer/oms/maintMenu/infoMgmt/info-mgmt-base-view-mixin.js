
import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import infoMgmtFileTransferSelector from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-selector'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      scrollableItemsToShow: 7
    }
  },
  mixins: [viewBtnsMixin],
  computed: {
    ...mapState({
      hasData: state => Object.keys(state.appContext.omsViewPort.data).length
    })
  },
  components: {
    infoMgmtFileTransferSelector,
    omsNoDataDisplay
  },
  methods: {
    switchView (event, item) {
      if (item.enabled) {
        this.$bus.$emit('switchView', { component: 'maintMenu', view: event.srcElement.dataset.target })
      }
    },
    viewBackBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'infomgmtmenu' })
    }
  }
}
