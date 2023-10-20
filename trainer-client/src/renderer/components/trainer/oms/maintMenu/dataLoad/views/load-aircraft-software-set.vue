<template>
  <div class="inner-container-content">
    <data-load-overlays :download="download" :enterpassword="enterpassword"></data-load-overlays>
    <div v-if="mainPanel">
      <h1>{{title}}</h1>
      <div class="top">
        <form class="selectorForm load-aircraft-software-set">
          <div class="row">
            <label v-html="softwareSetSelectLabel"></label>
            <oms-select
              @changeSoftwareSet="selectSoftwareSet"
              eventName="changeSoftwareSet"
              :comboWidth="35"
              :list="mainPanelList">
            </oms-select>
          </div>
          <div class="row">
          <label v-html="databasesOptionsSelectLabel"></label>
            <oms-select
              @databasesOptionsChange="changeDatabasesOptions"
              eventName="databasesOptionsChanged"
              :comboWidth="30"
              :list="databasesOptionsList">
            </oms-select>
          </div>
          <div class="button-container">
            <div class="btn slim" @click.stop="startLoad">Start Load</div>
            <div class="btn slim" @click.stop="showDetailsWindow">{{detailsHeader}}</div>
          </div>
        </form>
      </div>
      <div class="bottom">
        <data-load-details-panel v-if="detailsPanel"></data-load-details-panel>
        <div class="loadMessage-container">
          <div v-if="loadStarted" class="loadMessage">
            Not reproduced in this trainer. <br>Actual load time is very long (hours).
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import omsAcftTypeConsumerMixin from '@/components/trainer/oms/shared/oms-acft-type-consumer-mixin'
import dataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import dataLoadDetailsPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-details-panel'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import { mapState } from 'vuex'
export default {
  name: 'loadaircraftsoftwareset',
  data () {
    return {
      loadStarted: 0
    }
  },
  created () {
    this.$store.dispatch('appContext/omsViewPort/setViewSelectSelectedItem', 0)
  },
  computed: {
    ...mapState({
      softwareSetSelectLabel: state => state.appContext.omsViewPort.softwareSetSelectLabel,
      databasesOptionsSelectLabel: state => state.appContext.omsViewPort.databasesOptionsSelectLabel,
      databasesOptionsList: state => state.appContext.omsViewPort.databasesOptionsList
    })
  },
  methods: {
    startLoad () {
      if (!this.loadStarted) {
        this.loadStarted = 1
      }
    },
    changeDatabasesOptions () {},
    selectSoftwareSet (index) {
      this.$bus.$emit('hideDetailsPanel')
      this.$store.dispatch('appContext/omsViewPort/setViewSelectSelectedItem', index)
    }
  },
  components: {
    dataLoadDetailsPanel,
    omsSelect
  },
  mixins: [dataLoadBaseMixin, omsAcftTypeConsumerMixin]
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/forms';

.loadMessage-container {
  display: flex;
  align-items: center;
  justify-content: left;
}
.loadMessage {
  width: 30vh;
  color: $yellow;
  margin: 3vh;
  align-self: flex-start;
}
.load-aircraft-software-set {
  width: 90% !important;
  .row {
    margin-top: 1.5vh;
  }
  label {
    display: inline-block;

  }
  select {
    display: inline-block;
    margin: 0 0 0 2vh;
    padding: 0;
  }
}
.button-container {
  margin-top: 14vh
}
</style>
