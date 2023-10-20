<template>
  <transition name="bounce">
    <div class="modal-wrapper flex-center">
      <div class="scnBuilder">
        <h1>SCENARIO BUILDER</h1>
        <div class="flex-left sb-menu">
          <div class="flex-left">
            <div id="fde" class="btn" v-bind:class="{'selected': activeTab === 'fde'}" @click.stop="openScnTab('fde')">FDE</div>
          </div>
          <div class="flex-left">
            <div id="fault_messages" class="btn" v-bind:class="{'selected': activeTab === 'fault_messages'}" @click.stop="openScnTab('fault_messages')">FAULT MESSAGES</div>
          </div>
          <div class="flex-left">
            <div id="service_messages" class="btn" v-bind:class="{'selected': activeTab === 'service_messages'}" @click.stop="openScnTab('service_messages')">SERVICE MESSAGES</div>
          </div>
          <div class="flex-left">
            <div id="system_exceedances" class="btn" v-bind:class="{'selected': activeTab === 'system_exceedances'}" @click.stop="openScnTab('system_exceedances')">SYSTEM EXCEEDANCES</div>
          </div>
          <div class="flex-left">
            <div id="system_trends" class="btn" v-bind:class="{'selected': activeTab === 'system_trends'}" @click.stop="openScnTab('system_trends')">SYSTEM TRENDS</div>
          </div>
          <div class="flex-left">
            <div id="acft_lifecycle" class="btn" v-bind:class="{'selected': activeTab === 'acft_lifecycle'}" @click.stop="openScnTab('acft_lifecycle')">AIRCRAFT LIFECYCLE</div>
          </div>
          <div class="flex-left">
            <div id="system_parameters" class="btn" v-bind:class="{'selected': activeTab === 'system_parameters'}" @click.stop="openScnTab('system_parameters')">SYSTEM PARAMETERS</div>
          </div>
          <div class="flex-left">
            <div id="lru_sys" class="btn" v-bind:class="{'selected': activeTab === 'lru_sys'}" @click.stop="openScnTab('lru_sys')">LRU/SYS OPERATIONS</div>
          </div>
          <div class="flex-left">
            <div id="ims_setup" class="btn" v-bind:class="{'selected': activeTab === 'ims_setup'}" @click.stop="openScnTab('ims_setup')">IMS SETUP</div>
          </div>
        </div>
        <div class="flex-center sb-content">
          <scnFde v-if="scnFdeShown"></scnFde>
          <scnFaultMessages v-if="scnFaultMessagesShown"></scnFaultMessages>
          <scnServiceMessages v-if="scnServiceMessagesShown"></scnServiceMessages>
          <scnSystemExceedances v-if="scnSystemExceedancesShown"></scnSystemExceedances>
          <scnSystemTrends v-if="scnSystemTrendsShown"></scnSystemTrends>
          <scnAcftLifecycle v-if="scnAcftLifecycleShown"></scnAcftLifecycle>
          <scnSystemParameters v-if="scnSystemParametersShown"></scnSystemParameters>
          <scnLruSys v-if="scnLruSysShown"></scnLruSys>
          <scnImsSetup v-if="scnImsSetupShown"></scnImsSetup>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import scnFde from '@/components/trainer/scn-builder/scn-fde'
  import scnFaultMessages from '@/components/trainer/scn-builder/scn-fault-messages'
  import scnServiceMessages from '@/components/trainer/scn-builder/scn-service-messages'
  import scnSystemExceedances from '@/components/trainer/scn-builder/scn-system-exceedances'
  import scnSystemTrends from '@/components/trainer/scn-builder/scn-system-trends'
  import scnAcftLifecycle from '@/components/trainer/scn-builder/scn-acft-lifecycle'
  import scnSystemParameters from '@/components/trainer/scn-builder/scn-system-parameters'
  import scnLruSys from '@/components/trainer/scn-builder/scn-lru-sys'
  import scnImsSetup from '@/components/trainer/scn-builder/scn-ims-setup'
  export default {
    name: 'scnBuilder',
    data () {
      return {
        activeTab: 'fde',
        scnFdeShown: true,
        scnFaultMessagesShown: false,
        scnServiceMessagesShown: false,
        scnSystemExceedancesShown: false,
        scnSystemTrendsShown: false,
        scnAcftLifecycleShown: false,
        scnSystemParametersShown: false,
        scnLruSysShown: false,
        scnImsSetupShown: false
      }
    },
    computed: {
      ...mapState({
        projectDescription: state => state.appContext.appConfig.projectDescription,
        omsSoftwareVersion: state => state.appContext.appConfig.omsSoftwareversion,
        omstVersion: state => state.appContext.appConfig.omstVersion,
        omstarVersion: state => state.appContext.appConfig.omstarVersion,
        omsEQVersion: state => state.appContext.appConfig.omsEQVersion
      })
    },
    components: {
      scnFde,
      scnFaultMessages,
      scnServiceMessages,
      scnSystemExceedances,
      scnSystemTrends,
      scnAcftLifecycle,
      scnSystemParameters,
      scnLruSys,
      scnImsSetup
    },
    methods: {
      openScnTab (tab) {
        this.activeTab = tab
        this.scnFdeShown = false
        this.scnFaultMessagesShown = false
        this.scnServiceMessagesShown = false
        this.scnSystemExceedancesShown = false
        this.scnSystemTrendsShown = false
        this.scnAcftLifecycleShown = false
        this.scnSystemParametersShown = false
        this.scnLruSysShown = false
        this.scnImsSetupShown = false
        switch (tab) {
          case 'fde' :
            this.scnFdeShown = true
            break
          case 'fault_messages' :
            this.scnFaultMessagesShown = true
            break
          case 'service_messages' :
            this.scnServiceMessagesShown = true
            break
          case 'system_exceedances' :
            this.scnSystemExceedancesShown = true
            break
          case 'system_trends' :
            this.scnSystemTrendsShown = true
            break
          case 'acft_lifecycle' :
            this.scnAcftLifecycleShown = true
            break
          case 'system_parameters' :
            this.scnSystemParametersShown = true
            break
          case 'lru_sys' :
            this.scnLruSysShown = true
            break
          case 'ims_setup' :
            this.scnImsSetupShown = true
            break
          default :
            this.scnFdeShown = true
            break
        }
        this.scnFde = true
        console.log(this.activeTab)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/vars';
  .content {
    position: relative;
  }
  .scnBuilder {
    width: 95%;
    height: 95vh;
    font-size: 1.8vh;
    padding: 1.36vh;
    background-color: white;
    z-index: 9999;
    color: black;
    border-radius: 2vh;
    margin:2vh;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $default-text-color;
    background-color: $default-bg-color;
    border-radius: 0.45vh;
    width: 15vh;
    height: 5vh;
    cursor: pointer;
    margin: 10px 10px;
    &.selected {
       color: $default-bg-color;
       background-color: $default-text-color;
       border: 2px solid $default-bg-color;
     }
  }
  .sb-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .sb-content {
    align-items: left;
    justify-content: center;
    width: 100%;
  }
}


</style>
