
<template>
  <div class="inner-container-content">
    <data-load-no-downloader v-if="!hasMainPanelList"></data-load-no-downloader>
    <div v-else>
      <data-load-overlays :download="download" :enterpassword="enterpassword"
      :noItemSelected="noItemSelected" :startload="startload"></data-load-overlays>
      <div v-if="mainPanel">
        <h1>{{title}}</h1>
        <div class="top">
          <data-load-main-panel></data-load-main-panel>
        </div>
        <div class="bottom">
          <data-load-details-panel
            v-if="detailsPanel">
          </data-load-details-panel>
          <data-load-loader v-if="loader" :transferCompleted="transferCompleted" :completedRatio="completedRatio"></data-load-loader>
          <div class="loadMessage" v-if="loaderDone">
            <div class="loadMessage" v-if="loaderError">
              <div class="error loadMessage">
                <p>Load Complete With Error</p>
                <div class="btn view-errors-btn flex-center" @click.stop="showErrorsPanel">
                  View Errors
                </div>
              </div>
              <data-load-errors-panel v-show="dataloaderrors"></data-load-errors-panel>
            </div>
            <div class="loadMessage" v-else>
              <div class="loadMessage">
                <p>Load Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import dataLoadOverlays from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-overlays'
import dataLoadMainPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-main-panel'
import dataLoadDetailsPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-details-panel'
import dataLoadLoader from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-loader'
import dataLoadErrorsPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-errors-panel'
import dataLoadNoDownloader from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-no-downloader'
export default {
  name: 'dataload',
  data () {
    return {
      startload: false,
      errorsDetails: false,
      dataloaderrors: false,
      loader: false
    }
  },
  mounted () {
    this.$store.commit('appContext/omsViewPort/RESET_VIEW_SELECTED_ITEM')

    this.$bus.$on('mainPanelItemSelectionChanged', (index) => {
      this.mainPanelItemSelectionChanged(index)
    })

    this.initOverlays()
  },
  beforeDestroy () {
    this.$bus.$off('mainPanelItemSelectionChanged')
  },
  mixins: [dataLoadBaseMixin, dataLoadMainPanel],
  props: {
    parentComponentName: {
      type: String, // override for parentComponentName = currentView
      required: true
    }
  },
  components: {
    dataLoadOverlays,
    dataLoadMainPanel,
    dataLoadDetailsPanel,
    dataLoadLoader,
    dataLoadErrorsPanel,
    dataLoadNoDownloader
  },
  methods: {
    showErrorsPanel () {
      this.dataloaderrors = true
    }
  }
}
</script>
<style lang="scss" scoped>

@import '~@/assets/vars';
.loadMessage, .error {
  align-self: flex-start;
}
.view-errors-btn {
  white-space: nowrap;
  text-transform: lowercase;
  text-align: center;
}
.loadMessage {
  color: green;
  &.error{
    color: yellow;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
