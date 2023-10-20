<template>
  <div class="inner-viewport-content">
    <h1 class="row">{{label}}</h1>
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
    <div  v-if="progress" class="progress uppercase test-status">
      <p>Duration: {{duration}} sec <span class="spacer"></span>Time Remaining: {{remaining}}</p>
      <p>Test Result: In progress</p>
    </div>
    <div v-if="result" class="result uppercase test-status" :class="{success: isSuccess, failure: isFailure}">
      <p>Test result: {{resultMessage}}</p>
    </div>
    <div class="btn-wrapper flex-center btn-bottom">
      <div class="btn slim" @click.stop="start">Continue</div>
      <lru-sys-maintenance-reports-btn></lru-sys-maintenance-reports-btn>
      <div class="btn slim" @click.stop="cancel">Cancel</div>
    </div>
  </div>
</template>
<script>
  import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
  import omsPager from '@/components/trainer/oms/shared/paging/oms-pager'
  import lruSysMaintenanceReportsBtn from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn'

  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        intro: 1,
        progress: 0,
        result: 0,
        remaining: ''
      }
    },
    name: 'lrusysgenerictest',
    computed: {
      ...mapState({
        test: state => state.appContext.omsViewPort.data,
        label: state => state.appContext.omsViewPort.data.label,
        pages: state => state.appContext.omsViewPort.data.pages,
        duration: state => state.appContext.omsViewPort.data.duration,
        isSuccess: state => state.appContext.omsViewPort.data.success.status,
        isFailure: state => state.appContext.omsViewPort.data.failure.status,
        viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel,
        parentComponentName: state => state.appContext.omsViewPort.parentComponentName
      }),
      resultMessage () {
        if (this.isSuccess) {
          return this.test['success'].message
        } else if (this.isFailure) {
          return this.test['failure'].message
        }
      }
    },
    mixins: [viewBtnsMixin],
    components: {
      omsPager,
      lruSysMaintenanceReportsBtn
    },
    mounted () {
      this.$bus.$emit('maintMenuSectionsAvailabilityState', true)
      this.remaining = this.duration
    },
    beforeDestroy () {
      this.$bus.$emit('maintMenuSectionsAvailabilityState', false)
    },
    methods: {
      viewBackBtnClicked () {
        this.$bus.$emit('switchView', { component: 'maintMenuSections', view: this.parentComponentName })
      },
      cancel () {
        if (this.intro) {
          this.$bus.$emit('switchView', { component: 'maintMenuSections', view: 'lrusysoperations' })
        } else {
          this.reset()
        }
      },
      reset () {
        this.remaining = this.duration
        this.intro = 1
        this.progress = 0
        this.result = 0
      },
      start () {
        this.reset()

        this.intro = 0
        this.progress = 1
        this.result = 0

        let vm = this
        let countner = setInterval(() => {
          vm.remaining--
          if (vm.remaining === 0) {
            clearInterval(countner)
            vm.progress = 0
            vm.result = 1
          }
        }, 1000)
      }
    }
  }
</script>
<style lang="scss">
  table.oms-pager-body-default {
    margin-top: 0;
    height: 84vh;
    line-height: 3vh;
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
      height: 80vh;
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
  .test-status {
    margin-top: -10vh;
  }
  .btn-bottom {
    .btn {
      margin: 0 3vh;
      margin-top: -10px;
    }
  }
</style>


