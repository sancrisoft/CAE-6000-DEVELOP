<template>
<aside v-bind:class="{panelOpen : isActive, closed : !isActive}" id="aside_menu">
    <div class="menu_title">
      <div id="headings">
        <h2>Global 6000</h2>
        <h4>OMS/IMS TRAINER</h4>
      </div>
      <span class="hamburger" v-on:click="isActive = !isActive, panelActive = false"></span>
    </div>
    <div class="containment">
      <button v-if="isScnBuilder" class="btn scnBuilderButton" title="SCENARIO BUILDER" @click.stop="scnBuilderMenuShown ? closeScnBuilder() : openScnBuilder()">{{ scnBuilderMenuShown ? 'EXIT ' : '' }} SCENARIO BUILDER</button>
      <div class="app-containment" v-if="!scnBuilderMenuShown">
        <form v-on:submit.prevent="submitForm">
          <div class="form-group">
            <fieldset>
              <label for="scenarios">Scenarios</label>
              <select name="scenarios" id="scenarios" class="form-control"
               v-model="currentScenarioId"
               @change.stop="setCurrentScenario">
                <option v-for="(scenario, index) in scenarios"
                  :value="scenario.id"
                  :key="scenario.id"
                  :selected="selectedScenario">
                  {{scenario.name}}
                </option>
              </select>
            </fieldset>
            <hr>
            <fieldset>
              <h5>Double Stack Knob</h5><button class="locate info-icon" title="Data Panel Location" @click.stop="updatePanel('cursorlocation')"><img src="static/svg/info.svg" alt="Maintenance Panel Location"/></button>
              <div class="panels">
                <button class="btn" title="turn knob left" @click.stop="prev">-</button>
                <img src="static/svg/ctrl_knob.svg" width="85px">
                <button class="btn" title="turn knob right" @click.stop="next">+</button>
              </div>
            </fieldset>
            <hr>
           <fieldset>
              <h5>Data Upload Switch</h5> <button class="locate info-icon" title="Data Panel Location" @click.stop="updatePanel('datauploadlocation')"><img src="static/svg/info.svg" alt="Maintenance Panel Location"/></button>
              <div class="panels">
                <button class="btn" title="turn data upload left" @click.stop="channelSelect('a')">&lt;</button>
                <img v-bind:src="data_upload"/>
                <button class="btn" title="turn data upload right" @click.stop="channelSelect('b')">&gt;</button>
              </div>
            </fieldset>
            <hr>
            <fieldset>
              <label for="usb">IMS Access Port</label> <button class="locate info-icon" title="USB/RJ45 Location" @click.stop="updatePanel('usblocation')"><img src="static/svg/info.svg" alt="USB RJ45 Panel"/></button>
              <select name="usb" id="usb" class="form-control"
                      v-model="newUSB"
                      @change.stop="setCurrentUsb">
                <option v-for="(usb, index) in usbList"
                        :value="index"
                        :key="index"
                        :selected="selectedUsb">
                  {{usb.label}}
                </option>
              </select>
            </fieldset>
          </div>
        </form>
      </div>
      <div class="scn-containment" v-if="scnBuilderMenuShown">
        <div class="scn-menu-info">
          Scenario : <strong>{{ currentScenario.name }}</strong><br>
          Author: <strong>{{ currentScenario.author }}</strong><br>
          Last Modified: {{ currentScenario.modified }}
        </div>
        <div class="scn-menu-menu">
          <button class="btn scnMenuButton" title="EDIT SCENARIO" @click.stop="editScn" :disabled="isDefaultScenario">EDIT SCENARIO</button>
          <button class="btn scnMenuButton" title="DELETE SCENARIO" @click.stop="deleteScn"  :disabled="isDefaultScenario">DELETE SCENARIO</button>
          <button class="btn scnMenuButton" title="LOAD ACFT REPORT" @click.stop="loadReport" :disabled="isDefaultScenario">LOAD ACFT REPORT</button>
          <hr>
          <button class="btn scnMenuButton" title="NEW SCENARIO" @click.stop="newScn">NEW SCENARIO</button>
          <button class="btn scnMenuButton" title="SAVE AS SCENARIO" @click.stop="copyScn">SAVE AS SCENARIO</button>
          <button class="btn scnMenuButton" title="IMPORT SCENARIO" @click.stop="importScn">IMPORT SCENARIO</button>
          <button class="btn scnMenuButton" title="EXPORT SCENARIO" @click.stop="exportScn">EXPORT SCENARIO</button>
        </div>
      </div>
    </div>
    <div class="form-group button-group">
      <button class="btn warning-icon" title="Application disclaimer" @click.stop="toggleDisclaimer"></button>
      <button class="btn info-icon" title="About application" @click.stop="toggleAbout"></button>
      <div class="logo">
        <img width="120" height="18" src="static/svg/logo_bombardier_business_aircraft.svg" alt="">
      </div>
    </div>
    <div id="panelContainer" v-bind:class="{closed : !panelActive}">
      <span class="closeButton" v-on:click="panelActive = false"><img width="18" height="18" src="static/svg/close.svg" alt="close"></span>
      <h3>{{flyout_title}}</h3>
        <div class="lrgPanel">
          <img width="415" height="353"  v-bind:src="flyout_image" v-bind:alt="flyout_title">
          <img class="panel_location" v-bind:src="flyout_locator" v-bind:alt="flyout_title"/>
        </div>
    </div>
  </aside>
</template>
<script>
import omsKnobHandle from '@/components/trainer/oms/shared/paging/oms-knob-handle-mixin'
import omsScnBuilderConsumerMixin from '@/components/trainer/oms/shared/oms-scn-builder-consumer-mixin'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  name: 'asidemenu',
  data () {
    return {
      isActive: true,
      panelActive: false,
      currentScenarioId: '',
      newUSB: '',
      data_upload: 'static/svg/data_upload_off.svg',
      flyout_title: 'Panel Title',
      flyout_image: '',
      flyout_locator: '',
      datauploadlocation: {
        title: 'Maintenance Panel',
        image: 'static/img/maintenance_panel_6000.png',
        locator: 'static/svg/maintenance_panel_locator.svg'
      },
      usblocation: {
        title: 'IMS Access Point',
        image: 'static/svg/usb_rj45.svg',
        locator: 'static/svg/usb_rj45_locator.svg'
      },
      cursorlocation: {
        title: 'Cursor Control',
        image: 'static/svg/CursorControl.svg',
        locator: 'static/svg/cursor_location.svg'
      },
      datachannel: {
        a: 'static/svg/data_upload_chan_a.svg',
        b: 'static/svg/data_upload_chan_b.svg',
        off: 'static/svg/data_upload_off.svg'
      },
      scnBuilderMenuShown: false
    }
  },
  created () {
    // load scenarios
    this.loadScenarios({name: 'scnbuilder'}).then(() => {
      this.setToDefaultScenario()
    })
  },
  mixins: [omsKnobHandle, omsScnBuilderConsumerMixin],
  computed: {
    ...mapState({
      scenarios: state => state.appContext.scenarios,
      usbList: state => state.appContext.usbList,
      defaultScenario: state => state.appContext.appConfig.defaultScenarioId
    }),
    currentScenario () {
      return this.scenarios.filter(item => {
        return item.id === this.currentScenarioId
      })[0]
    },
    isDefaultScenario () {
      return this.currentScenarioId === this.defaultScenario
    },
    selectedScenario () {
      return this.scenarios.filter(item => item.selected).id
    },
    selectedUsb () {
      return this.usbList.filter(item => item.selected)[0].id
    }
  },
  mounted () {
    this.newUSB = this.selectedUsb
    this.$bus.$on('openScnBuilder', () => {
      this.openScnBuilderMenu()
    })
    this.$bus.$on('closeScnBuilder', () => {
      this.closeScnBuilderMenu()
    })
  },
  methods: {
    submitForm () {
      return false
    },
    setCurrentScenario () {
      this.$store.dispatch('appContext/setSelectedScenario', this.currentScenarioId)
      this.$store.dispatch('appContext/resetContextMenus')
      console.log(this.currentScenario)

      // Call switchView() to reload view anytime the scenario is changed. (REF fe7242fd-7dc0-4d52-970e-6a55954fa351)
      this.$bus.$emit('switchView', { reloadView: true })

      // Re-open scenario builder to activate editing in case setCurrentScenario() is called after switching from the default scenario.
      if (this.scnBuilderMenuShown) {
        this.closeScnBuilder()
        this.openScnBuilder()
      }
    },
    setToDefaultScenario () {
      this.currentScenarioId = this.defaultScenario
      this.setCurrentScenario()
    },
    setToNewestScenario () {
      this.currentScenarioId = _.sortBy(this.scenarios, ['id'])[this.scenarios.length - 1].id
      this.setCurrentScenario()
    },
    loadScenarios (obj) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('appContext/getSBContent', obj)
          .then((response) => {
            this.$store.dispatch('appContext/setSBContent', response.data)

            resolve()
          }, (err) => {
            reject(err)
          })
      })
    },
    createScenario (data) {
      var obj = { name: 'scnbuilder', action: 'create', data: data }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then((response) => {
          this.$store.dispatch('appContext/setSBContent', response.data)

          this.setToNewestScenario()
        })
    },
    saveScenario (data) {
      var obj = { name: 'scnbuilder', action: 'update', data: data }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then((response) => {
          this.$store.dispatch('appContext/setSBContent', response.data)

          this.setCurrentScenario()
        })
    },
    deleteScenario () {
      var obj = { name: 'scnbuilder', action: 'delete' }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then((response) => {
          this.$store.dispatch('appContext/setSBContent', response.data)

          this.setToDefaultScenario()
        })
    },
    copyScenario (saveAsName) {
      var obj = { name: 'scnbuilder', action: 'copy', data: { saveAsName: saveAsName } }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then(async (response) => {
          await this.loadScenarios({name: 'scnbuilder'})

          // The copied scenario id can be found in "response.data.data".
          this.setToNewestScenario()
        })
    },
    importScenario (scenarioJsonString) {
      var obj = { name: 'scnbuilder', action: 'import', data: { scenarioJsonString: scenarioJsonString } }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then(async (response) => {
          await this.loadScenarios({name: 'scnbuilder'})

          // The imported scenario id can be found in "response.data.data".
          this.setToNewestScenario()
        })
    },
    exportScenario () {
      return new Promise((resolve, reject) => {
        var obj = { name: 'scnbuilder', action: 'export' }
        this.$store.dispatch('appContext/getSBContent', obj)
          .then((response) => {
            resolve(response.data)
          }, (err) => {
            reject(err)
          })
      })
    },
    loadAircraftReport (data) {
      var obj = { name: 'scnbuilder', action: 'loadAircraftReport', data: data }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then(async (response) => {
          await this.loadScenarios({name: 'scnbuilder'})

          this.setCurrentScenario()
        })
    },
    setCurrentUsb () {
      this.$store.dispatch('appContext/setSelectedUSB', this.newUSB)
    },
    toggleAbout () {
      this.$bus.$emit('toggleAbout')
    },
    toggleDisclaimer () {
      this.$bus.$emit('toggleDisclaimer')
    },
    openScnBuilder () {
      this.$store.dispatch('appContext/setEditMode', !this.isDefaultScenario)
      this.$bus.$emit('openScnBuilder')
    },
    closeScnBuilder () {
      this.$store.dispatch('appContext/setEditMode', false)
      this.$bus.$emit('closeScnBuilder')
    },
    returnPanel () {
      this.panelActive = true
    },
    updatePanel (panel) {
      if (this.panelActive === true) {
        this.panelActive = false
        this.flyout_title = this[panel].title
        this.flyout_image = this[panel].image
        this.flyout_locator = this[panel].locator
        setTimeout(this.returnPanel, 400)
      } else {
        this.panelActive = true
        this.flyout_title = this[panel].title
        this.flyout_image = this[panel].image
        this.flyout_locator = this[panel].locator
      }
    },
    channelSelect (channel) {
      if (channel === 'a') {
        if (this.data_upload === this.datachannel.off) {
          this.data_upload = this.datachannel.a
        } else if (this.data_upload === this.datachannel.b) {
          this.data_upload = this.datachannel.off
        }
      } else if (channel === 'b') {
        if (this.data_upload === this.datachannel.off) {
          this.data_upload = this.datachannel.b
        } else if (this.data_upload === this.datachannel.a) {
          this.data_upload = this.datachannel.off
        }
      } else if (channel === 'off') {
        if (this.data_upload === this.datachannel.a || this.data_upload === this.datachannel.b) {
          this.data_upload = this.datachannel.off
        }
      }
      this.$store.dispatch('appContext/setUploadChannel', channel)
    },
    openScnBuilderMenu () {
      this.scnBuilderMenuShown = true
    },
    closeScnBuilderMenu () {
      this.scnBuilderMenuShown = false
    },
    newScn () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'editScn', 'title': 'NEW SCENARIO', 'data': {}, 'action': '', 'callback': (data) => { this.createScenario(data) } })
      this.$bus.$emit('editScn')
    },
    editScn () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'editScn', 'title': 'EDIT SCENARIO', 'data': this.currentScenario, 'action': '', 'callback': (data) => { this.saveScenario(data) } })
      this.$bus.$emit('editScn')
    },
    saveScn () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'saveScn', 'title': 'SAVE SCENARIO', 'data': {}, 'action': '', 'callback': () => { this.saveScenario() } })
      this.$bus.$emit('saveScn')
    },
    deleteScn () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'deleteScn', 'title': 'DELETE SCENARIO', 'data': {}, 'action': '', 'callback': () => { this.deleteScenario() } })
      this.$bus.$emit('deleteScn')
    },
    copyScn () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'copyScn', 'title': 'SAVE AS SCENARIO', 'data': { saveAsName: this.currentScenario.name + ' Copy' }, 'action': '', 'callback': (data) => { this.copyScenario(data.saveAsName) } })
      this.$bus.$emit('copyScn')
    },
    importScn () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'importScn', 'title': 'IMPORT SCENARIO', 'data': {}, 'action': '', 'callback': (data) => { this.importScenario(data.scenarioJsonString) } })
      this.$bus.$emit('importScn')
    },
    async exportScn () {
      let exportScenarioResponse = await this.exportScenario()
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'exportScn', 'title': 'EXPORT SCENARIO', 'data': { scenarioJsonString: exportScenarioResponse.data }, 'action': '', 'callback': () => {} })
      this.$bus.$emit('exportScn')
    },
    loadReport () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'loadReport', 'title': 'LOAD REPORT', 'data': {}, 'action': '', 'callback': (data) => { this.loadAircraftReport(data) } })
      this.$bus.$emit('loadReport')
    }
  }
}
</script>
<style lang="scss" scoped>
#aircraft{
  transform-origin:32.82% 69.11%;
}
#data_upload {
  transform-origin: 78.1% 69.11%;
}
.panels img {
  margin: 0 !important;
}

</style>
