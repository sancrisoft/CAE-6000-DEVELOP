
<template>
  <form class="selectorForm">
    <label class="oms-select-label table-text-shaded" v-html="parameterGroupComboLabel"></label>
      <oms-select
        @parameterComboChanged="parameterGroupSelected"
        eventName="parameterComboChanged"
        :comboWidth="29"
        :list="parameterGroupCombo">
    </oms-select>
  </form>
</template>
<script>
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import {mapState} from 'vuex'
export default {
  name: 'maintmenuparametergroupselector',
  computed: {
    ...mapState({
      parameterGroupComboLabel: state => state.appContext.omsViewPort.parameterGroupComboLabel,
      parameterGroupCombo: state => state.appContext.omsViewPort.parameterGroupCombo
    })
  },
  components: {
    omsSelect
  },
  methods: {
    parameterGroupSelected (id) {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'parameterGroupCombo', selectedId: id })
    }
  }
}
</script>
