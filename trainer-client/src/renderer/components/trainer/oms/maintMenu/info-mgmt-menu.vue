<template>
  <div class="inner-container-content">
    <oms-overlay-panel id="maxCharExceeded" v-if="maxCharExceeded"
      :uppercase="true"
      size="half"
      header="Maximum File Name Length Exceeded"
      bodyTxt="The application will display file names 46 characters or less">
    </oms-overlay-panel>
    <h1 class="uppercase">Information Management</h1>
    <oms-hoverable-list-menu :items="items"></oms-hoverable-list-menu>
  </div>
</template>

<script>
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import omsOverlayPanel from '@/components/trainer/oms/shared/oms-overlay-panel'
import omsHoverableListMenu from '@/components/trainer/oms/shared/oms-hoverable-list-menu'
import { mapState } from 'vuex'

const overlayDelay = 2000
let maxCharExceeded = true

export default {
  name: 'infomgmtmenu',
  mixins: [infoMgmtBaseViewMixin],
  data () {
    return {
      maxCharExceeded: maxCharExceeded
    }
  },
  mounted () {
    this.$store.dispatch('appContext/setSelectedView', { 'component': 'maintMenu', 'view': 'infoMgmtMenu' })
  },
  computed: {
    ...mapState({
      items: state => state.appContext.omsViewPort.data.items
    })
  },
  created () {
    this.init()
  },
  components: {
    omsOverlayPanel,
    omsHoverableListMenu
  },
  methods: {
    init () {
      if (maxCharExceeded) {
        this.overlay = true
        setTimeout(() => {
          this.maxCharExceeded = false
          maxCharExceeded = false
        }, overlayDelay)
      }
    }
  }
}
</script>
