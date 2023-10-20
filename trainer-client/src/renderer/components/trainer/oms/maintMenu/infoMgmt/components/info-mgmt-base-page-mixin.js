import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import infoMgmtUsbDirectoryPanel from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-usb-directory-panel'
import infoMgmtFileTransferPanel from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-panel'
import infoMgmtFileTransferButton from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-button'
import infoMgmtFileTransfer from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer'
let fileTransferMessages = ['IMS to USB device', 'USB to IMS']
export default {
  data () {
    return {
      fileTransferSelectorValue: 0,
      fileTransferMessage: fileTransferMessages[0]
    }
  },
  mounted () {
    this.$bus.$on('fileTransferSelectorChanged', this.setFileTransferSelector)
    this.$bus.$on('filesToBeTransferredChanged', this.setFilesToBeTransferred)

    this.$store.dispatch('appContext/setSelectedView', { 'component': 'maintMenu', 'view': 'infoMgmtMenu' })
  },
  beforeDestroy () {
    this.$bus.$off('fileTransferSelectorChanged')
    this.$bus.$off('filesToBeTransferredChanged')
  },
  components: {
    infoMgmtUsbDirectoryPanel,
    infoMgmtFileTransferPanel,
    infoMgmtFileTransferButton,
    infoMgmtFileTransfer
  },
  mixins: [infoMgmtBaseViewMixin],
  methods: {
    setFileTransferSelector: function (newVal) {
      this.fileTransferSelectorValue = newVal
      this.$store.dispatch('appContext/omsViewPort/setInfoMgmtfileTransferMessage', this.fileTransferSelectorValue)

      if (this.fileTransferSelectorValue === '1') { // from USB
        this.$store.dispatch('appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles', this.fileTransferSelectorValue)
      } else { // to USB
        this.$store.dispatch('appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles', this.fileTransferSelectorValue)
        this.$store.dispatch('appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer')
      }
    },
    setFilesToBeTransferred: function (file) {
      if (this.fileTransferSelectorValue === '1') { // from USB
        this.$store.dispatch('appContext/omsViewPort/setInfoMgmtViewFilesToTransfer', [file])
      }
    }
  }
}
