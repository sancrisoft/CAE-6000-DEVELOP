<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="add-button-container" v-if="editMode">
      <div class="flex-center">
        <div id="save" class="btn" @click.stop="addItem()">Add new item</div>
      </div>
    </div>
    <maintmenu-sorted-datalist-selectors
      :view="true"
      :sort="true">
    </maintmenu-sorted-datalist-selectors>
    <maint-menu-pager-list-display
      :current="currentPage"
      :pages="totalPages">
      <div class="flex-justified" slot="pagerHeaderContent">
        <oms-paging-arrows
          v-if="hasPages"
          :headertext="pageFirstItemAta"
          @nextPage="nextPage"
          @previousPage="previousPage">
        </oms-paging-arrows>
        <oms-paging-counter
          counterName="MaintmenuPagerList">
        </oms-paging-counter>
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
          @click.stop="switchView(item.id.toString())">
          <fault-messages-item-display :item="item" :editMode="editMode" :title="title" :parentPage="currentPage"></fault-messages-item-display>
        </li>
      </div>
    </maintmenu-sorted-datalist>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import faultMessagesItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/fault-messages-item-display'
export default {
  name: 'faultmessages',
  mixins: [baseView],
  components: {
    faultMessagesItemDisplay
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    parentPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addItem () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'faultmessages', 'title': this.title, 'data': {}, 'action': 'add' })
    }
  }
}
</script>
