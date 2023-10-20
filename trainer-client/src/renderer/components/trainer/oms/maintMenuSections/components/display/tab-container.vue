<template>
  <div v-if="show">
    <directory-list-refresh v-if="refreshing"></directory-list-refresh>
    <div v-else>
      <div v-if="isDirectory">
        <directory-list-header-buttons></directory-list-header-buttons>
        <tab-directory-list :items="data"></tab-directory-list>
      </div>
      <div v-if="isFaultList">
         <ul class="hoverable-list row">
          <li class="hoverable-list-item" v-for="item in data" :key="item.id"
            @click.stop="switchView(item.target, item.id)">
            <fault-messages-item-display :item="item"></fault-messages-item-display>
          </li>
        </ul>
      </div>
       <div v-if="isFDEdetail">
         <ul class="hoverable-list row">
          <li class="hoverable-list-item" v-for="item in data" :key="item.id"
            @click.stop="switchView(item.target, item.id)">
            <fault-messages-fde-detail-display :item="item"></fault-messages-fde-detail-display>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <oms-no-data-display  v-else></oms-no-data-display>
</template>
<script>
import directoryListHeaderButtons from '@/components/trainer/oms/maintMenuSections/components/directory-list-header-buttons'
import directoryListRefresh from '@/components/trainer/oms/maintMenuSections/components/directory-list-refresh'
import tabDirectoryList from '@/components/trainer/oms/maintMenuSections/components/tab-directory-list-display'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import faultMessagesItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/fault-messages-item-display'
import faultMessagesFdeDetailDisplay from '@/components/trainer/oms/maintMenuSections/components/display/fault-messages-fde-detail-display'
export default {
  props: {
    show: {
      default: false
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array
    },
    type: {
      type: String,
      default: 'directory'
    }
  },
  components: {
    directoryListHeaderButtons,
    directoryListRefresh,
    tabDirectoryList,
    omsNoDataDisplay,
    faultMessagesItemDisplay,
    faultMessagesFdeDetailDisplay
  },
  computed: {
    isDirectory () {
      return this.type === 'directory'
    },
    isFaultList () {
      return this.type === 'faultList'
    },
    isFDEdetail () {
      return this.type === 'fdeDetail'
    }
  },
  methods: {
    switchView (target, id, originating) {
      if (target && id) {
        this.$bus.$emit('switchView', { component: 'maintMenu', view: target, id: id, originating: 'same' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-content {
  .hoverable-list li {
    height: auto;
    line-height: 2vh;
  }
}
</style>

