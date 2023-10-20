<template>
  <div class="oms-viewport-content">
    <data-load-no-downloader v-if="!hasMainPanelList"></data-load-no-downloader>
    <div class="inner-viewport-content row" v-else>
      <data-load-overlays :startload="startload"></data-load-overlays>
      <h1>{{title}}</h1>
      <form class="selectorForm">
        <div class="row">
          <div class="flex-justified">
            <label class="oms-select-label table-text-shaded">{{loadSourceComboLabel}}</label>
            <oms-select
              @loadSourceComboChanged="loadSourceSelected"
              eventName="loadSourceComboChanged"
              :comboWidth="20"
              :list="loadSourceCombo"
              :disabled="loadSourcecomboDisable">
            </oms-select>
            <div class="btn slim" :class="{disabled: inputsDisabled}">Refresh Targets</div>
          </div>
        </div>
        <div class="row">
          <div class="flex-justified">
            <label class="oms-select-label table-text-shaded" v-html="selectOrderComboLabel"></label>
            <div class="flex-justified">
              <oms-radio-selector
                :value="0"
                id="targetLRUfirst"
                name="selectionOrderSelector"
                event="onSelectionOrderChanged"
                :checked="true"
                :disabled="inputsDisabled">
              </oms-radio-selector>
              <label for="targetLRUfirst"><span :class="{disabled:inputsDisabled}"></span>Target LRU/First</label>
            </div>
            <div class="flex-justified">
              <oms-radio-selector
                :value="1"
                id="dataSWfirst"
                name="selectionOrderSelector"
                event="onSelectionOrderChanged"
                :checked="false"
                :disabled="inputsDisabled">
              </oms-radio-selector>
              <label for="dataSWfirst"><span :class="{disabled:inputsDisabled}"></span>Data/SW First</label>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="flex-justified">
              <label class="oms-select-label table-text-shaded" v-html="selectTargetLRUcomboLabel"></label>
              <oms-select
                :chunked="true"
                :maxChunckedItems="1"
                @selectTargetLRUcomboChanged="selectTargetLRUSelected"
                eventName="selectTargetLRUcomboChanged"
                :comboWidth="30"
                :list="selectedTargetLRULlist"
                :disabled="selectTargetLRUcomboDisabled">
              </oms-select>
              <div class="btn slim" :class="{disabled: !selectedTargetLRU}" @click.stop="setSelectedTargetLRUdetails()">Info</div>
            </div>
          </div>
          <div class="row">
            <div class="flex-justified">
              <label class="oms-select-label table-text-shaded" v-html="selectDataSWcomboLabel"></label>
              <oms-select
                :chunked="true"
                :maxChunckedItems="1"
                @selectDataSWComboChanged="selectDataSWSelected"
                eventName="selectDataSWComboChanged"
                :comboWidth="30"
                :list="selectedDataSWlist"
                :disabled="selectDataSWcomboDisable">
              </oms-select>
              <div class="btn slim" :class="{disabled: !selectedDataSW}" @click.stop="setSelectedDataSWdetails()">Info</div>
            </div>
          </div>
          <div class="row">
            <div class="btn slim start" :class="{disabled: startDisabled}" @click.stop="start">Start Load</div>
          </div>
          <div class="row flex-center">
            <oms-window
              v-if="targetLRUdetailsPanel"
              size="half targetLRUDetailsPanel"
              :header="selectedTargetLRUinfoHeader"
              windowPropName="targetLRUdetailsPanel">
              <div slot="windowContent">
                <div class="targetLRUdetails">
                  <div>Type Name: {{ selectedTargetLRUinfo.typeName }}</div>
                  <div>Position: {{ selectedTargetLRUinfo.position }}</div>
                  <div>Hardware ID: {{ selectedTargetLRUinfo.hardwareId }}</div>
                  <div>Manufacturer's Code: {{ selectedTargetLRUinfo.name}}</div>
                  <div>Literal Name: {{ selectedTargetLRUinfo.manufacturer}}</div>
                  <div>IP Address: {{ selectedTargetLRUinfo.ip}}</div>
                </div>
              </div>
            </oms-window>
             <oms-window
              v-if="dataSWdetailsPanel"
              size="half dataSWdetailsPanel"
              :header="selectedDataSWinfoHeader"
              windowPropName="dataSWdetailsPanel">
              <div slot="windowContent">
                <div class="dataSWdetails">
                  <div class="panel">
                    <div class="title"><span class="text-shaded">ARINC 665 Version: </span> {{ selectedDataSWinfo.arinc }}</div>
                  </div>
                  <div class="panel">
                    <div class="title text-shaded">Supported Targets/LRUs</div>
                    <div class="content">
                      <div v-for="(lru, index) in  selectedDataSWinfo.data" :key="index">
                        {{ lru }}
                      </div>
                    </div>
                  </div>
                  <div class="panel">
                    <div class="title text-shaded">Files</div>
                    <div class="content">
                      <div v-for="(file, index) in  selectedDataSWinfo.files" :key="index">
                        {{ file.filename }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </oms-window>
             <oms-file-transfer-progress
                v-show="!targetLRUdetailsPanel && !dataSWdetailsPanel"
                :complete="complete"
                :transferInProgress="transferInProgress"
                :transferCompletedRatio="transferCompletedRatio"
                :transferCompleted="transferCompleted"
                :overAllTransferCompleted="overAllTransferCompleted"
                :overAllTransferCompletedRatio="overAllTransferCompletedRatio"
                :inProgressFile="inProgressFile"
                :upperComboMessage="writingToFile"
                :files="files"
                @cancel="cancel">
              </oms-file-transfer-progress>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import dataLoadNoDownloader from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-no-downloader'
import baseView from '@/components/trainer/oms/maintMenu/dataLoad/views/data-load-base-view-mixin'
import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import omsRadioSelector from '@/components/trainer/oms/shared/oms-radio-selector'
import dataLoadOverlays from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-overlays'
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import omsFileTransferProgress from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress'
import omsFileTransferProgressConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress-consumer-mixin'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loadSourceValue: 0,
      selectionOrder: 0,
      loadSourcecomboDisable: true,
      inputsDisabled: true,
      startload: true,
      targetLRUdetailsPanel: false,
      selectedTargetLRUinfo: {},
      dataSWdetailsPanel: false,
      selectedDataSWinfo: {}
    }
  },
  name: 'performfieldservicedataload',
  mixins: [baseView, viewBtnsMixin, omsFileTransferProgressConsumerMixin],
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      mainPanelList: state => state.appContext.omsViewPort.data.items,
      loadSourceComboLabel: state => state.appContext.omsViewPort.loadSourceComboLabel,
      loadSourceCombo: state => state.appContext.omsViewPort.loadSourceCombo,
      selectOrderComboLabel: state => state.appContext.omsViewPort.selectOrderComboLabel,
      selectTargetLRUcomboLabel: state => state.appContext.omsViewPort.selectTargetLRUcomboLabel,
      selectDataSWcomboLabel: state => state.appContext.omsViewPort.selectDataSWcomboLabel
    }),
    hasMainPanelList () {
      return this.mainPanelList && this.mainPanelList.length
    },
    selectTargetLRUcomboDisabled () {
      return this.selectionOrder === 1 || Number(this.selectedLoadSourceId) === 3
    },
    selectDataSWcomboDisable () {
      return Number(this.selectedLoadSourceId) === 3
    },
    startDisabled () {
      return this.targetLRUdetailsPanel || this.dataSWdetailsPanel || !this.selectedDataSW
    },
    selectedLoadSourceId () {
      return (this.loadSourceCombo && this.loadSourceCombo.filter(item => item.selected)[0] && this.loadSourceCombo.filter(item => item.selected)[0].id) || 0
    },
    selectedTargetLRULlist () {
      return this.loadSourceCombo && this.loadSourceCombo[this.selectedLoadSourceId].data
    },
    selectedTargetLRUkey () {
      return this.selectedTargetLRULlist && this.selectedTargetLRULlist.filter(item => item.selected)[0] && this.selectedTargetLRULlist.filter(item => item.selected)[0].key
    },
    selectedDataSWlist () {
      let selectedLoadSource = this.loadSourceCombo && this.loadSourceCombo[this.selectedLoadSourceId].data
      if (this.selectionOrder === 1) {
        return [].concat.apply([], selectedLoadSource.map((lruData) => { return lruData.lrus }))
      } else {
        let selectedItem = selectedLoadSource && selectedLoadSource.filter(item => item.key === this.selectedTargetLRUkey)
        return selectedItem.length ? selectedItem[0].lrus : []
      }
    },
    selectedTargetLRU () {
      return this.selectedTargetLRULlist && this.selectedTargetLRULlist.filter(item => item.selected).length
    },
    selectedDataSW () {
      return this.selectedDataSWlist && this.selectedDataSWlist.filter(item => item.selected).length
    },
    selectedTargetLRUinfoHeader () {
      return this.selectedTargetLRUinfo && this.selectedTargetLRUinfo.label.toUpperCase()
    },
    selectedDataSWinfoHeader () {
      return this.selectedDataSWinfo && this.selectedDataSWinfo.label.toUpperCase()
    },
    files () {
      let selectedDataSWlistItem = this.selectedDataSWlist.filter(item => { return item.selected })
      if (selectedDataSWlistItem.length) {
        return selectedDataSWlistItem[0].details.files.map(file => { return file.filename })
      } else {
        return []
      }
    }
  },
  beforeMount () {
    this.$bus.$emit('maintMenuSectionsAvailabilityState', true)
    this.$bus.$emit('omsBtnsAvailabilityState', true)
  },
  mounted () {
    this.$bus.$on('onSelectionOrderChanged', this.selectionOrderChanged)

    setTimeout(() => {
      this.init()
    }, 2000)

    this.$bus.$on('closeWindow', (windowPropName) => {
      this[windowPropName] = false
    })
  },
  beforeDestroy () {
    this.$bus.$off('onSelectionOrderChanged')
    this.$bus.$off('closeWindow')
  },
  components: {
    dataLoadNoDownloader,
    omsSelect,
    omsRadioSelector,
    dataLoadOverlays,
    omsWindow,
    omsFileTransferProgress
  },
  methods: {
    init () {
      this.$bus.$emit('maintMenuSectionsAvailabilityState', false)
      this.$bus.$emit('omsBtnsAvailabilityState', false)
      this.loadSourcecomboDisable = false
      this.inputsDisabled = false
      this.startload = false
    },
    setSelectedTargetLRUdetails () {
      this.dataSWdetailsPanel = false
      this.targetLRUdetailsPanel = !this.targetLRUdetailsPanel
      this.selectedTargetLRUinfo = this.selectedTargetLRULlist.filter(item => item.selected)[0].details
    },
    setSelectedDataSWdetails () {
      this.targetLRUdetailsPanel = false
      this.dataSWdetailsPanel = !this.dataSWdetailsPanel
      this.selectedDataSWinfo = this.selectedDataSWlist.filter(item => item.selected)[0].details
    },
    getSelectTargetLRUid () {
      let selected = this.selectedTargetLRULlist.filter(item => item.selected)
      return selected.length ? selected[0].id : 0
    },
    getSelectedTargetLRULkey (selectedId) {
      return this.selectedTargetLRULlist.filter(item => item.id === selectedId)[0].key
    },
    selectionOrderChanged (radioValue) {
      this.resetCombos()
      this.selectionOrder = Number(radioValue)
    },
    selectTargetLRUSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateFieldServiceDataLoadComboSelection', {
        comboName: 'loadSourceCombo',
        selectedParentId: this.selectedLoadSourceId.toString(),
        selectedTargetLruKey: this.getSelectedTargetLRULkey(selectedId),
        selectedTargetLruId: selectedId.toString()
      })
    },
    selectDataSWSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateFieldServiceDataLoadComboSelection', {
        comboName: 'loadSourceCombo',
        selectedParentId: this.selectedLoadSourceId.toString(),
        selectedTargetLruKey: this.selectedTargetLRUkey,
        selectionOrder: this.selectionOrder,
        selectedTargetLruId: this.getSelectTargetLRUid().toString(),
        selectedDataId: selectedId
      })
    },
    resetCombos () {
      this.$store.dispatch('appContext/omsViewPort/updateFieldServiceDataLoadComboSelection', {
        comboName: 'loadSourceCombo',
        selectedParentId: this.selectedLoadSourceId.toString(),
        selectedTargetLruKey: null,
        selectedTargetLruId: null,
        selectedDataId: null
      })
    },
    loadSourceSelected (selectedId) {
      this.loadSourceValue = selectedId
      this.$store.commit('appContext/omsViewPort/RESET_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION', {
        comboName: 'loadSourceCombo',
        selectedParentId: this.selectedLoadSourceId.toString()
      })
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', {
        comboName: 'loadSourceCombo',
        selectedParentId: this.selectedLoadSourceId.toString(),
        selectedId: selectedId
      })
    },
    viewBackBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'dataloadmenu' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.oms-window {
  &.targetLRUDetailsPanel {
    min-height: 20vh;
    .targetLRUdetails {
      padding: 1vh 0;
    }
  }

  &.dataSWdetailsPanel {
    min-height: 50vh;
    .panel {
      margin-bottom: 1vh;
      border: $default-border;
    }
    .title {
      align-items: center;
      display: flex;
      padding: 1vh;
    }
    .content {
      padding: 1vh;
      border-top: $default-border;
    }
    &.body.window-content {
      border-color: transparent !important
    }
  }
}

.start {
  width: 10vh;
  white-space: nowrap;
  margin: 2vh 0
}
.selectorForm {
  width: 93%;
  label {
    display: flex;
    align-items: center;
    line-height: 2vh;
    min-width: 7vh;
  }
  hr {
    margin: 2vh 0;
  }
}
</style>

