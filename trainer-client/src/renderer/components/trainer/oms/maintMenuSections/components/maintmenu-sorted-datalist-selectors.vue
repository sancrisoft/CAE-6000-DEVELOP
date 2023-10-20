<template>
  <form class="selectorForm">
    <div class="row" v-if="view">
      <label class="oms-select-label table-text-shaded" v-html="viewComboLabel"></label>
      <oms-select
        @viewComboChanged="viewSelected"
        eventName="viewComboChanged"
        :comboWidth="35"
        :list="viewCombo">
      </oms-select>
    </div>
    <div class="row" v-if="sort">
      <label class="oms-select-label table-text-shaded" v-html="sortComboLabel"></label>
      <oms-select
        @sortComboChanged="sortSelected"
        eventName="sortComboChanged"
        :comboWidth="35"
        :list="sortCombo">
      </oms-select>
    </div>
    <div class="row" v-if="lru">
      <label class="oms-select-label table-text-shaded" v-html="lruComboLabel"></label>
      <oms-select
        @lruComboChanged="lruSelected"
        eventName="lruComboChanged"
        :comboWidth="35"
        :list="lruCombo">
      </oms-select>
    </div>
  </form>
  </template>
  <script>
  import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        viewComboLabel: state => state.appContext.omsViewPort.viewComboLabel,
        viewCombo: state => state.appContext.omsViewPort.viewCombo,
        sortComboLabel: state => state.appContext.omsViewPort.sortComboLabel,
        sortCombo: state => state.appContext.omsViewPort.sortCombo,
        lruComboLabel: state => state.appContext.omsViewPort.lruComboLabel,
        lruCombo: state => state.appContext.omsViewPort.lruCombo
      })
    },
    components: {
      omsSelect
    },
    props: {
      view: {
        type: Boolean,
        default: false
      },
      sort: {
        type: Boolean,
        default: false
      },
      lru: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      viewSelected (selectedId) {
        this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'viewCombo', selectedId: selectedId })
      },
      sortSelected (selectedId) {
        this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'sortCombo', selectedId: selectedId })
      },
      lruSelected (selectedId) {
        this.$store.dispatch('appContext/omsViewPort/updateLRUcomboSelection', selectedId)
      }
    }
  }
  </script>
