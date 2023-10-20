<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="add-button-container" v-if="editMode">
      <div class="flex-center">
        <div id="save" class="btn" @click.stop="addItem()">Add new item</div>
      </div>
    </div>
    <maintmenu-sorted-datalist-selectors :sort="true">
    </maintmenu-sorted-datalist-selectors>
    <maint-menu-pager-list-display
      :current="currentPage"
      :pages="totalPages">
      <div class="flex-justified" slot="pagerHeaderContent"
        v-if="hasPages">
        <oms-paging-arrows
          :headertext="pageLastItemCategory"
          @nextPage="nextPage"
          @previousPage="previousPage">
        </oms-paging-arrows>
        <oms-paging-counter counterName="MaintmenuPagerList"></oms-paging-counter>
      </div>
    </maint-menu-pager-list-display>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <maintmenu-sorted-datalist v-else
      :totalPages="totalPages"
      @omsKnobIncrease="nextPage"
      @omsKnobDecrease="previousPage">
      <div slot="maint-data-table-content">
        <li class="hoverable-list-item" v-for="item in sortedPage"
          :key="item.id"
          @click.stop="switchView(item.id)">
          <system-exceedances-item-display :item="item" :editMode="editMode" :title="title"></system-exceedances-item-display>
        </li>
      </div>
    </maintmenu-sorted-datalist>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import systemExceedancesItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/system-exceedances-item-display'
export default {
  data () {
    return {
      maxItemsPerPage: 6
    }
  },
  name: 'systemexceedances',
  mixins: [baseView],
  components: {
    systemExceedancesItemDisplay
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addItem () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'systemexceedances', 'title': this.title, 'data': {}, 'action': 'add' })
    }
  }
}
</script>

<style scoped>
.larger {
  width: 60% !important;
}
</style>
