<template>
<div>
  <oms-scrollable rootClasses="body-border-default data-load-main-panel">
    <thead slot="header" class="header">
      <th>Name</th>
      <th>Status</th>
    </thead>
    <div slot="scrollableContent">
      <oms-table-list
        :items="mainPanelList"
        itemLabel="itemName"
        :uppercase="true"
        @oms-table-list-item-toogle="toggleSelected">
      </oms-table-list>
    </div>
  </oms-scrollable>
  <div class="button-container">
    <div class="btn slim" @click.stop="startLoad">Start Load</div>
    <div class="btn slim" @click.stop="showDetailsWindow">{{detailsBtnLabel}}</div>
  </div>
</div>
</template>
<script>
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsTableList from '@/components/trainer/oms/shared/dynamicComponents/oms-table-list'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import { mapState } from 'vuex'
export default {
  name: 'dataloadmainpanel',
  computed: { // TODO: try removing this here
    ...mapState({
      componentName: state => state.appContext.omsViewPort.componentName,
      detailsBtnLabel: state => state.appContext.omsViewPort.detailsHeader,
      mainPanelList: state => state.appContext.omsViewPort.data.items
    })
  },
  mixins: [omsScrollableMixin],
  components: {
    omsScrollable,
    omsTableList
  },
  methods: {
    toggleSelected (index) {
      this.$bus.$emit('hideDetailsPanel')
      this.$bus.$emit('mainPanelItemSelectionChanged', index)
    },
    showDetailsWindow () {
      this.$bus.$emit('showDetailsWindow')
    },
    startLoad () {
      this.$bus.$emit('startload')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.status {
  color: yellowGreen
}
.button-container {
  margin: 3vh 1vh
}
</style>

