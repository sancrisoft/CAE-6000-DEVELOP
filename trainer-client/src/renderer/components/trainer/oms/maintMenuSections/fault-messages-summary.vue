<template>
  <div class="inner-viewport-content maint-menu-summary">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSummary"></oms-no-data-display>
    <div v-else class="row">
      <fault-messages-item-display :item="summary" :bullet="false"></fault-messages-item-display>
      <div class="row">
        Occurences: <span v-if="summary.active">Active</span><span class="cyan" v-else>Not Active</span>
      </div>
      <hr>
      <div class="row">
        <h2 class="description-title">Possible Causes</h2>
      </div>
      <div class="row fde-description">
          <div class="description">{{summary.desc}}</div>
      </div>
      </div>
      <vue-tabs>
        <v-tab title="Help">
          <div v-if="hasFaultCode">
            <div class="help-tab-fault">
              <span class="help-tab-fault-description">Fault Code: {{summary.fault.code}}</span>
            </div>
            <div class="help-description">{{summary.fault.desc}}</div>
          </div>
          <oms-no-data-display  v-else></oms-no-data-display>
        </v-tab>
        <v-tab title="MSG Data">
          <tab-container :refreshing="refreshing" :show="hasMSG" :data="summary.msgData" type="directory"></tab-container>
        </v-tab>
        <v-tab title="LRU Data">
          <tab-container :refreshing="refreshing" :show="hasLRU" :data="editMode ? lruData : summary.lruData" type="directory"></tab-container>
        </v-tab>
        <v-tab title="FDE">
          <tab-container :refreshing="refreshing" :show="hasFDEs" :data="summary.fdeData" type="fdeDetail"></tab-container>
        </v-tab>
      </vue-tabs>
    </div>
</template>

<script>
import baseSummaryView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-summary-view-mixin'
import faultMessagesItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/fault-messages-item-display'
export default {
  name: 'faultmessagessummary',
  mixins: [baseSummaryView],
  components: {
    faultMessagesItemDisplay
  },
  props: {
    parentPage: {
      type: Number,
      default: 0
    }
  }
}
</script>
