
<template>
  <div class="inner-viewport-content maint-menu-summary">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSummary"></oms-no-data-display>
    <div v-else class="row">
      <flight-deck-effects-item-display :item="summary" :bullet="false"></flight-deck-effects-item-display>
      <div class="row">
        Occurences: <span v-if="summary.active">Active</span><span class="cyan" v-else>Not Active</span>
      </div>
      <hr>
      <div class="row">
        <h2 class="description-title">FDE Description</h2>
      </div>
      <div class="row fde-description">
        <div class="fault">Fault Code: {{summary.code}}</div>
        <div>{{summary.desc}}</div>
      </div>
      </div>
      <vue-tabs>
        <v-tab title="Fault MSGS">
          <tab-container :refreshing="refreshing" :show="hasFaultMSGS" :data="summary.faultMSGS" type="faultList"></tab-container>
        </v-tab>
        <v-tab title="FDE Data">
          <tab-container :refreshing="refreshing" :show="hasFDEs" :data="editMode ? lruData : summary.fdeData" type="directory"></tab-container>
        </v-tab>
      </vue-tabs>
      </div>
</template>
<script>
import baseSummaryView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-summary-view-mixin'
import flightDeckEffectsItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/flight-deck-effects-item-display'
export default {
  name: 'flightdeckeffectssummary',
  mixins: [baseSummaryView],
  components: {
    flightDeckEffectsItemDisplay
  }
}
</script>



