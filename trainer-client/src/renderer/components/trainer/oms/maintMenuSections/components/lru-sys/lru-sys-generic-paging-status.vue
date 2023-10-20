<template>
  <div class="inner-viewport-content">
    <h1 class="row">{{title}}</h1>
    <lru-sys-reports-header></lru-sys-reports-header>
    <div class="row flex-center">
      <oms-pager :extraPage="false">
        <div slot="scrollableContent">
          <div id="pagerContainer">
            <div v-for="(page, index) in pages" :key="index">
               <div class="page" v-html="page">
               </div>
            </div>
          </div>
        </div>
      </oms-pager>
    </div>
  </div>
</template>
<script>
import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import omsPager from '@/components/trainer/oms/shared/paging/oms-pager'
import lruSysReportsHeader from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-reports-header'
import { mapState } from 'vuex'
export default {
  name: 'lruysysgenericpagingstatus',
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      pages: state => state.appContext.omsViewPort.data,
      viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel,
      parentComponentName: state => state.appContext.omsViewPort.parentComponentName
    })
  },
  mixins: [viewBtnsMixin],
  components: {
    lruSysReportsHeader,
    omsPager
  },
  mounted () {
    this.$bus.$emit('maintMenuSectionsAvailabilityState', true)
  },
  beforeDestroy () {
    this.$bus.$emit('maintMenuSectionsAvailabilityState', false)
  },
  methods: {
    viewBackBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenuSections', view: this.parentComponentName })
    }
  }
}
</script>
<style lang="scss">
table.oms-pager-body-default {
  margin-top: 0;
  min-height: 85vh;
  line-height: 5vh;
  .tableTwoColumn {
    tr {
      td {
        &:first-child {
          width: 75%
        }
      }
    }
  }
}
.twoColumn50 {
  td {
    width: 50% !important
  }
  &.condensed {
    line-height: 3vh !important
  }
}

.treeColumn50-25-25 {
  td:first-child {
    width: 50% !important
  }
  &.condensed {
    line-height: 3vh !important
  }
}
.twoColumn50percent {
  width: 75% !important
}
.tableTreeColumn tr {
  td {
    &:first-child {
      padding-right: 2vh;
      text-align: right;
      width: 50%
    }
    &:nth-child(2) {
      width: 15%
    }
  }
}

#pagerContainer {
  .page {
    width: 100%;
    padding-top: 3vh;
    display: block;
    min-height: 80vh;
    box-sizing: border-box;
    h1, p {
      width: 100%
    }

    .genericPageRow {
      width:100% !important;
      height: 2vh;
      position:relative;
      overflow-x: visible;

      .genericPageCell{
        width:1.75% !important;
        height: 2vh;
        position: relative;
        float:left;
        overflow-x: visible;
          .genericPageCellValue{
            height: 2vh;
            line-height: 2vh !important;
            position: relative;
            float:left;
            white-space: nowrap;
          }
      }
    }
  }
}

</style>


