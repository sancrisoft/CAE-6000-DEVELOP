<template>
    <form class="selectorForm">
      <div class="row inline">
        <label class="oms-select-label table-text-shaded" v-html="reportComboLabel"></label>
        <span v-if="reportComboOverride">{{ reportCombo }}</span>
        <oms-select v-else
          @reportComboChanged="reportSelected"
          eventName="reportComboChanged"
          :list="reportCombo"
          :disabled="selectsDisabled"
                    :comboWidth="36">
        </oms-select>
      </div>
      <div class="row">
        <span class="oms-select-label table-text-shaded padded"> Last Flight Leg Written:</span>
        <span>{{lastFlightLegValue}}</span>
        <span class="oms-select-label table-text-shaded padded">Data Written:</span>
        <span class="no-wrap" :inner-html.prop="lastFlightLegDate | DDMMYYYY"></span>
      </div>
      <div class="row inline">
        <label class="oms-select-label table-text-shaded" v-html="flightLegComboLabel"></label>
        <span v-if="flightLegComboOverride">{{ flightLegCombo }}</span>
        <oms-select v-else
          @flightLegComboChanged="flightLegSelected"
          eventName="flightLegComboChanged"
          :list="flightLegCombo"
          :disabled="selectsDisabled"
                    :comboWidth="36">
        </oms-select>
      </div>
      <div class="row inline" v-if="is7500">
        <label class="oms-select-label table-text-shaded fromLabel" v-html="fromComboLabel"></label>
        <oms-select
          :chunked="true"
          :comboWidth="3"
          @fromComboChanged="fromSelected"
          eventName="fromComboChanged"
          :list="fromCombo"
          :disabled="selectsDisabled">
        </oms-select>
         <label class="oms-select-label table-text-shaded toLabel" v-html="toComboLabel"></label>
        <oms-select
          :chunked="true"
          :comboWidth="3"
          @toComboChanged="toSelected"
          eventName="toComboChanged"
          :list="toCombo"
          :disabled="selectsDisabled">
        </oms-select>
      </div>
      <div class="row inline">
        <label class="oms-select-label table-text-shaded writeLabel" v-html="writeToComboLabel"></label>
        <oms-select
          :comboWidth="16"
          @writeToComboChanged="writeToSelected"
          eventName="writeToComboChanged"
          :list="writeToCombo"
          :disabled="selectsDisabled">
        </oms-select>
      </div>
      <div class="row button-container">
        <div :class="{hidden: transferInProgress}" class="btn large slim start-btn" @click.stop="start">Start</div>
      </div>
    </form>
</template>
<script>
import omsAcftTypeConsumerMixin from '@/components/trainer/oms/shared/oms-acft-type-consumer-mixin'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      selectsDisabled: false
    }
  },
  props: {
    transferInProgress: {
      type: Boolean,
      default: false
    },
    reportComboOverride: {
      type: Boolean,
      default: false
    },
    flightLegComboOverride: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      reportComboLabel: state => state.appContext.omsViewPort.reportComboLabel,
      reportCombo: state => state.appContext.omsViewPort.reportCombo,
      flightLegComboLabel: state => state.appContext.omsViewPort.flightLegComboLabel,
      flightLegCombo: state => state.appContext.omsViewPort.flightLegCombo,
      lastFlightLegValue: state => state.appContext.omsViewPort.lastFlightLeg && state.appContext.omsViewPort.lastFlightLeg.value,
      lastFlightLegDate: state => state.appContext.omsViewPort.lastFlightLeg && state.appContext.omsViewPort.lastFlightLeg.date,
      writeToComboLabel: state => state.appContext.omsViewPort.writeToComboLabel,
      writeToCombo: state => state.appContext.omsViewPort.writeToCombo,
      fromComboLabel: state => state.appContext.omsViewPort.fromComboLabel,
      fromCombo: state => state.appContext.omsViewPort.fromCombo,
      toComboLabel: state => state.appContext.omsViewPort.toComboLabel,
      toCombo: state => state.appContext.omsViewPort.toCombo
    })
  },
  mixins: [omsAcftTypeConsumerMixin],
  components: {
    omsSelect
  },
  methods: {
    reportSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'reportCombo', selectedId: selectedId })
    },
    flightLegSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'flightLegCombo', selectedId: selectedId })
    },
    fromSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'fromCombo', selectedId: selectedId })
    },
    toSelected  (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'toCombo', selectedId: selectedId })
    },
    writeToSelected (selectedId) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'writeToCombo', selectedId: selectedId })
    },
    start () {
      this.$emit('startTransferProgress')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.start-btn.hidden {
  visibility: hidden;
}
form.selectorForm .oms-select-label {
  width: 12vh
}

form.selectorForm .padded {
  margin-left: 14.5vh
}
.inline {
  display: flex;
}

.fromLabel, .writeLabel {

}
.toLabel {
  width: 5vh !important;
  padding-left: 9vh;
  box-sizing: border-box;
  padding-left: 2.5vh;
}

form.selectorForm {
  width: 55vh;
}
form.selectorForm .padded {
  margin-left: 14vh;
  margin-right: 0;
  width: 20vh;
}
</style>

