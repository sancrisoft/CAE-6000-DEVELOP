

<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <maintmenu-sorted-datalist-selectors
      :view="true"
      :sort="false">
    </maintmenu-sorted-datalist-selectors>
    <maint-menu-pager-list-display
      :current="currentPage"
      :pages="totalPages">
      <div slot="pagerHeaderContent">
        <div v-if="isViewType('apmConfiguration')" class="flex-justified apmConfiguration-header">
          <div class="text-shaded word">Word</div>
          <div class="text-shaded">Left APM (Bits 14-9)</div>
          <div class="text-shaded">Right APM (Bits 14-9)</div>
          <oms-paging-counter
            counterName="MaintmenuPagerList">
          </oms-paging-counter>
        </div>
        <div v-if="isViewType('softPartNumber')" class="flex-justified softPartNumber-header">
            <div class="text-shaded">Equipment</div>
            <div class="text-shaded">Positions</div>
            <div class="text-shaded">IMAA-6000 CPN</div>
            <oms-paging-counter
              v-if="hasPages"
              counterName="MaintmenuPagerList">
            </oms-paging-counter>
            <div v-else></div>
        </div>
        <div v-if="isViewType('apmThirdParty')" class="flex-justified softPartNumber-header">
          <div class="text-shaded"></div>
          <div class="text-shaded"></div>
          <div class="text-shaded"></div>
          <oms-paging-counter
            v-if="hasPages"
            counterName="MaintmenuPagerList">
          </oms-paging-counter>
          <div v-else></div>
        </div>
      </div>
    </maint-menu-pager-list-display>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div v-else-if="sysConfigDetails">
      <oms-window size="full" :header="header" windowPropName="sysConfigDetails">
        <div slot="windowContent"
          v-on:mousenter="setKnob(null, 'oms-window')">
          <div v-if="isViewType('apmConfiguration')">
            <system-config-details-templates type="apmConfig" :itemindex="selectedItem.details.item_index" :items="selectedItem.details.items" ></system-config-details-templates>
          </div>
          <div v-if="isViewType('softPartNumber')">
            <div v-if="isValidCPN()">
              <system-config-details-templates type="tso" :items="selectedItem.details.items"></system-config-details-templates>
            </div>
            <div v-else>
              <system-config-details-templates type="crosscheck" :items="selectedItem.details.items"></system-config-details-templates>
            </div>
          </div>
        </div>
      </oms-window>
    </div>
    <maintmenu-sorted-datalist v-else
      :totalPages="totalPages"
      @omsKnobIncrease="nextPage"
      @omsKnobDecrease="previousPage">
      <div slot="maint-data-table-content">

        <li v-if="isViewType('apmConfiguration')" class="hoverable-list-item" v-for="item in sortedPage"
          :key="item.id"
          @click.stop="showDetails(item.id)">
          <span class="hoverable-list-item-bullet"></span>
          <div class="hoverable-list-item-table flex-justified apmConfiguration header">
            <div class="">{{item.value}}</div>
            <div class="uppercase">{{item.leftAPM}}</div>
            <div class="">{{item.rightAPM}}</div>
            <div></div>
          </div>
        </li>

        <li v-if="isViewType('apmThirdParty')" class="" v-for="item in sortedPage"
            :key="item.id">
          <div class="flex-justified apmThirdParty w100">
            <div class="w70">{{item.value}}</div>
            <div class="w15">{{item.leftApm}}</div>
            <div class="w15">{{item.rightApm}}</div>
            <div></div>
          </div>
        </li>

        <li v-if="isViewType('softPartNumber')" class="hoverable-list-item" v-for="item in sortedPage"
          :key="item.id"
          @click.stop="showDetails(item.id)">
          <span class="hoverable-list-item-bullet"></span>
          <div class="hoverable-list-item-table flex-justified softPartNumber" :class="{invalid: !isValidCPN(item)}">
            <div class="">{{item.name}}</div>
            <div class="uppercase">{{item.position}}</div>

            <div class="last" v-if="!isValidCPN(item)">---------------------------</div>
            <div class="last" v-else>{{item.cpn}}</div>
          </div>
        </li>
      </div>
    </maintmenu-sorted-datalist>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import systemConfigDetailsTemplates from '@/components/trainer/oms/maintMenuSections/components/display/system-config-details-templates'
import omsWindow from '@/components/trainer/oms/shared/oms-window'
export default {
  name: 'systemconfig',
  mixins: [baseView],
  data () {
    return {
      sysConfigDetails: false,
      selectedItem: {},
      maxItemsPerPage: 21
    }
  },
  watch: {
    sortedData () {
      this.sysConfigDetails = false
    },
    selectedView () {
      this.maxItemsPerPage = 26
    }
  },
  computed: {
    header () {
      if (this.selectedItem && this.selectedItem.details) {
        return this.selectedItem.details.header
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.$bus.$on('closeWindow', (windowPropName) => {
      this.hideLayer(windowPropName)
    })
  },
  beforeDestroy () {
    this.$bus.$off('closeWindow')
  },
  components: {
    systemConfigDetailsTemplates,
    omsWindow
  },
  methods: {
    showDetails (id) {
      this.selectedItem = this.sortedData.filter(item => item.id === id)[0]
      this.sysConfigDetails = true
    },
    hideLayer (prop) {
      this[prop] = false
    },
    isViewType (key) {
      let selectedView = this.$store.getters['appContext/omsViewPort/getViewComboSelectedState']('viewCombo')
      if (selectedView) {
        return selectedView.key === key
      } else {
        return false
      }
    },
    isValidCPN (item) {
      if (item) {
        return item.cpn.length
      } else {
        return this.selectedItem && this.selectedItem.cpn && this.selectedItem.cpn.length
      }
    },
    changeMaxItemsPerPage (value) {
      this.maxItemsPerPage = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';
.oms-pager-body-default {
  height: 70vh
}
.oms-window {
  &.full {
    position: absolute;
    width: 98% !important;
    height: 77vh;
    top: 22vh;
    left: 1%;
  }
}

.counter .spaced-header {
  width: 70%
}
.apmConfiguration {
  width: 75%;
}

.apmConfiguration-header, .softPartNumber-header {
  box-sizing: border-box;
  height: 3.5vh;
  align-items: center;
  padding-left: 3vh;
}
.apmConfiguration-header {
  .text-shaded {
    white-space: nowrap;
    margin-left: 2vh
  }
  .word {
   margin-left: 0;
   width: auto;
  }
}
.softPartNumber-header {
  .text-shaded {
    width: 25%;
    white-space: nowrap
  }
}

.apmThirdParty {
  table {
    width: 100%;
    th {
      padding-bottom: 0.5vh
    }
  }
  .large {
    width: 50%
  }
  .small {
    width: 17%
  }
}

.softPartNumber {
  width: 95%;
  &.invalid {
    color: $yellow
  }
  div {
    min-width: 25%;
  }
  .last {
    width: 50%
  }
}
.apmThirdParty {

  margin: 5px 0;
  font-size: 1.8vh;
}
.wrapper {
  position: relative;
}
  .hoverable-list-item {
    min-height: 2vh;
  }
</style>
