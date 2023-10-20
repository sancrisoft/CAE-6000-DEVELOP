<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <maintmenu-sorted-datalist-selectors
      :view="true"
      :sort="true">
    </maintmenu-sorted-datalist-selectors>
    <maintmenu-sorted-datalist-header>
      <div slot="headerContent">
        <div class="flex-justified static-table-header">
          <div class="text-shaded">Name</div>
          <div class="text-shaded">Size (KB)</div>
        </div>
      </div>
    </maintmenu-sorted-datalist-header>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <maintmenu-sorted-datalist v-else
    :totalPages="totalPages">
      <div slot="maint-data-table-content">
         <li class="list-item" v-for="(item, index) in sortedPage"
          :key="index">
          <div class="flex-justified">
            <div class="larger">{{item.filename}}</div>
            <div class="small">{{item.size}}</div>
            <div class="small nowrap" :inner-html.prop="item.date | date"></div>
          </div>
        </li>
      </div>
    </maintmenu-sorted-datalist>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
export default {
  name: 'viewloadedmaintenancefiles',
  mounted () {
    this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenuSections', target: 'utilityfunctions' })
  },
  mixins: [baseView, utilityFunctionsViewMixin]
}
</script>
<style lang="scss">
  .larger {
    width: 50%
  }
  .small {
    width: 25%
  }
  .static-table-header {
    > div {
      width: 50%
    }
  }
</style>

