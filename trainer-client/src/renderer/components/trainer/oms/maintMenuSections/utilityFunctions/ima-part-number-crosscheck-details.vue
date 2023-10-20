<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <form class="selectorForm">
      <label class="oms-select-label table-text-shaded" v-html="sortComboLabel"></label>
      <oms-select
        @sortComboChanged="sortSelected"
        eventName="sortComboChanged"
        :list="sortCombo">
      </oms-select>
    </form>
    <maint-menu-pager-list-display
      :current="currentPage"
      :pages="totalPages">
      <div class="flex-justified" slot="pagerHeaderContent">
        <oms-paging-counter
          counterName="MaintmenuPagerList">
        </oms-paging-counter>
      </div>
    </maint-menu-pager-list-display>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <oms-pager>
      <div slot="scrollableContent">
        <table id="pagerContainer">
          <tr>
            <td>
              <table v-for="item in sortedData" :key="item.id" class="ima-part-number-crosscheck-details">
                <tr>
                  <td colspan="2" class="large">{{item.systemId}} : {{item.label}}</td>
                  <td class="right"><span class="table-text-shaded">Status:</span> {{item.status}}</td>
                </tr>
                <tr>
                  <td class="table-text-shaded">APM HW PN:</td>
                  <td colspan="2">{{item.apmhwpn}}</td>
                </tr>
                <tr>
                  <td class="table-text-shaded">Installed HW PN:</td>
                  <td colspan="2">{{item.instaledhwpn}}</td>
                </tr>
                <tr>
                  <td class="table-text-shaded">APM SW PN:</td>
                  <td>{{item.apmswpn.label}}</td>
                  <td class="right"><span class="table-text-shaded">CRC:</span> {{item.apmswpn.crc}}</td>
                </tr>
                <tr>
                  <td class="table-text-shaded">Instaled SW PN:</td>
                  <td>{{item.instaledswpn.label}}</td>
                  <td class="right"><span class="table-text-shaded">CRC:</span> {{item.instaledswpn.crc}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </oms-pager>
  </div>
</template>
<script>
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import omsPager from '@/components/trainer/oms/shared/paging/oms-pager'
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
export default {
  name: 'imapartnumbercrosscheckdetails',
  mixins: [baseView, utilityFunctionsViewMixin],
  components: {
    omsSelect,
    omsPager
  },
  methods: {
    sortSelected (selectdId) {
      this.$bus.$emit('sortSelected', selectdId)
    }
  }
}
</script>
<style lang="scss" scoped>
  form.selectorForm {
    width: 60%;
  }
  .ima-part-number-crosscheck-details {
    margin-top: 1.58vh;
    width: 100%;
    tr {
      line-height: 2.1vh;
      td {
        width: 33%;
        &.large {
          width: 67%;
        }
      }
      td:nth-child(2) {
        white-space: nowrap;
      }
    }
  }
  .right {
    text-align: right;
    padding-right: 1vh
  }
</style>


