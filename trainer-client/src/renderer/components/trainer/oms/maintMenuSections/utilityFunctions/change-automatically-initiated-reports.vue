<template>
 <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <maint-menu-pager-list-display
      :current="currentPage"
      :pages="totalPages">
      <div slot="pagerHeaderContent" class="flex-justified static-table-header">
        <div class="text-shaded larger">Report Trigger</div>
        <div class="text-shaded">Destination</div>
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
          <li class="hoverable-list-item"
            v-for="item in sortedPage"
            :key="item.id"
            @click.stop="toggleSelected(item.id)">
            <table class="checkbox-list">
              <tr>
                <td class="checkbox">
                  <oms-checkbox-selector :selected="item.selected"></oms-checkbox-selector>
                </td>
                <td colspan="2">
                  {{item.label}}
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="larger">{{item.trigger}}</td>
                <td>{{item.destination}}</td>
              </tr>
            </table>
          </li>
        </div>
    </maintmenu-sorted-datalist>
    <div class="oms-selector-list-btn">
      <div class="btn large" @click.stop="setAllVisibleItems(true)">Check All</div>
      <div class="btn large" @click.stop="setAllVisibleItems(false)">Uncheck All</div>
    </div>
 </div>
</template>
<script>
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
import maintmenuSortedDatalistHeader from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist-header'
import omsPagingCounter from '@/components/trainer/oms/shared/paging/oms-paging-counter'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import omsCheckboxSelector from '@/components/trainer/oms/shared/oms-checkbox-selector'
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import omsKnob from '@/components/trainer/oms/shared/paging/oms-knob-consumer-mixin'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      maxItemsPerPage: 12
    }
  },
  name: 'changeautimaticallyintiatedreports',
  mixins: [baseView, utilityFunctionsViewMixin, omsKnob],
  mounted () {
    this.$on('omsKnobIncrease', () => {
      this.nextPage()
    })
    this.$on('omsKnobDecrease', () => {
      this.previousPage()
    })
  },
  beforeDestroy () {
    this.$off('omsKnobIncrease')
    this.$off('omsKnobDecrease')
  },
  methods: {
    ...mapActions({
      toggleSelected: 'appContext/omsViewPort/toggleViewSelectedItem'
    }),
    setAllVisibleItems (bool) {
      this.pages[this.currentPage - 1].forEach((item) => {
        this.$store.dispatch('appContext/omsViewPort/setCheckboxItem', { id: item.id, checked: bool })
      })
    }
  },
  components: {
    maintmenuSortedDatalistHeader,
    omsPagingCounter,
    omsNoDataDisplay,
    omsCheckboxSelector
  }
}
</script>
<style lang="scss" scoped>
.maint-data-table td {
  width: auto !important
}
.static-table-header {
  .larger {
    width: 50%;
    margin-left: 4vh;
  }
}
.checkbox-list .checkbox {
  width: 1vh !important
}
.maint-data-table  {
  min-height: 70vh;
  max-height: 70vh;
}

.maint-data-table td {
  width: auto;
  &.larger {
    width: 57% !important
  }
}
.oms-selector-list {
  .hoverable-list {
    max-height: 66vh;
    overflow: hidden;
  }
}
.oms-selector-list-btn {
  display: flex;
  justify-content: flex-end;
  margin-right: 2vh;
  width: 100%;
  .btn {
    margin-left: 2vh
  }
}
.checkbox-list {
  width: 100%;
  .checkbox {
    width: 1vh;
  }
}
</style>
