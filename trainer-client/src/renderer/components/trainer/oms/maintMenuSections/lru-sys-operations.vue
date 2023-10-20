
<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="row">
      <lru-sys-selectors></lru-sys-selectors>
    </div>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div v-else class="row">
      <vue-tabs
        :value="selectedTab"
        @tab-change="setSelectedTab"
        v-show="showTabs">
        <v-tab v-if="hasConfig" title="Config">
          <div class="config" v-html="sortedData[0].config.formatedData"></div>
        </v-tab>
        <v-tab v-if="hasData" title="Data">
          <lru-sys-tabs-item-list
            :items="sortedData[0].data"
            @tabListItemClicked="dataItemClicked">
          </lru-sys-tabs-item-list>
        </v-tab>
        <v-tab v-if="hasRigging" title="Rigging">
          <lru-sys-tabs-item-list
            :items="sortedData[0].rigging"
            @tabListItemClicked="dataItemClicked">
          </lru-sys-tabs-item-list>
        </v-tab>
        <v-tab v-if="hasTests" title="Test">
          <lru-sys-tabs-item-list
            :items="sortedData[0].tests"
            @tabListItemClicked="dataItemClicked">
          </lru-sys-tabs-item-list>
        </v-tab>
        <v-tab v-if="hasNvm" title="NVM">
          <lru-sys-nvm-panel></lru-sys-nvm-panel>
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import lruSysSelectors from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-selectors'
import lruSysTabsItemList from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-tabs-item-list'
import lruSysNvmPanel from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-nvm-panel'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import {VueTabs, VTab} from 'vue-nav-tabs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showTabs: true
    }
  },
  name: 'lrusysOperations',
  mixins: [baseView, omsScrollableMixin],
  methods: {
    dataItemClicked (item) {
      // this.$store.dispatch('appContext/lruSysCacheItem', item)
      this.$bus.$emit('switchView', { component: 'maintMenu', view: item.target, id: item.id.toString() })
    },
    setSelectedTab (index) {
      this.$store.dispatch('appContext/setSelectedTab', index)
        .then(() => {
          this.setScroll()
        })
    }
  },
  computed: {
    ...mapState({
      selectedTab: state => state.appContext.selectedTab
    }),
    hasSortedData () {
      return Array.isArray(this.sortedData) && this.sortedData.length > 0
    },
    hasConfig () {
      return this.hasSortedData && this.sortedData[0].config && this.sortedData[0].config.formatedData
    },
    hasData () {
      return this.hasSortedData && this.sortedData[0].data && this.sortedData[0].data.length
    },
    hasRigging () {
      return this.hasSortedData && this.sortedData[0].rigging && this.sortedData[0].rigging.length
    },
    hasTests () {
      return this.hasSortedData && this.sortedData[0].tests && this.sortedData[0].tests.length
    },
    hasNvm () {
      return this.hasSortedData && this.sortedData[0].nvm
    }
  },
  components: {
    VueTabs,
    VTab,
    lruSysSelectors,
    lruSysTabsItemList,
    lruSysNvmPanel
  }
}
</script>

<style scoped>
  form.selectorForm {
      width: 89%;
  }
  .vue-tabs section {
      height: 64vh;
  }
  .config {
    padding: 5vh 1vh;
    text-transform: uppercase;
    line-height: 2.5vh
  }
</style>
