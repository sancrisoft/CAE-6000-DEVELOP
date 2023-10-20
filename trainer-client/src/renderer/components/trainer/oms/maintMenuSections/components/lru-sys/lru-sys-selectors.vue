<template>
  <form class="selectorForm">
    <div class="row">
      <label class="oms-select-label table-text-shaded" v-html="viewComboLabel"></label>
      <oms-select
        :chunked="true"
        @viewComboChanged="viewSelected"
        eventName="viewComboChanged"
        :comboWidth="35"
        :list="viewCombo">
      </oms-select>
    </div>
    <div class="row">
      <label class="oms-select-label table-text-shaded" v-html="ataComboLabel"></label>
      <oms-select
        :chunked="true"
        @ataComboChanged="ataSelected"
        eventName="ataComboChanged"
        :comboWidth="35"
        :list="ataCombo">
      </oms-select>
    </div>
    <div class="row">
      <label class="oms-select-label table-text-shaded" v-html="lruComboLabel"></label>
      <oms-select
        :chunked="true"
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
  let previouslyAtaSelectedId = 0
  let previouslyLruSelectedId = 0
  export default {
    computed: {
      ...mapState({
        viewComboLabel: state => state.appContext.omsViewPort.viewComboLabel,
        viewCombo: state => state.appContext.omsViewPort.viewCombo,
        ataComboLabel: state => state.appContext.omsViewPort.ataComboLabel,
        ataCombo: state => state.appContext.omsViewPort.ataCombo,
        lruComboLabel: state => state.appContext.omsViewPort.lruComboLabel,
        lruCombo: state => state.appContext.omsViewPort.lruCombo
      })
    },
    beforeCreate () {
      setTimeout(() => {
        this.$store.dispatch('appContext/omsViewPort/updateATAcomboSelection', previouslyAtaSelectedId)
        this.$store.dispatch('appContext/omsViewPort/updateLRUcomboSelection', previouslyLruSelectedId)
      }, 250)
    },
    components: {
      omsSelect
    },
    methods: {
      viewSelected (selectedIndex) {
        this.$bus.$emit('viewSelected', selectedIndex)
        this.$store.dispatch('appContext/omsViewPort/updateATAcomboSelection', 0)
      },
      ataSelected (selectedIndex) {
        previouslyAtaSelectedId = selectedIndex
        previouslyLruSelectedId = 0
        this.$store.dispatch('appContext/omsViewPort/updateATAcomboSelection', selectedIndex)
      },
      lruSelected (selectedIndex) {
        previouslyLruSelectedId = selectedIndex
        this.$store.dispatch('appContext/omsViewPort/updateLRUcomboSelection', selectedIndex)
      }
    }
  }
  </script>
