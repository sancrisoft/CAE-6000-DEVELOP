<template>
  <div class="inner-viewport-content">
    <h1 class="row">{{item.label}} - {{title}}</h1>
    <div class="row btn-wrapper flex-justified">
      <div class="btn slim" @click.stop="refresh">Refresh</div>
      <lru-sys-maintenance-reports-btn></lru-sys-maintenance-reports-btn>
      <div class="btn slim" @click.stop="expandAll">+ All</div>
      <div class="btn slim" @click.stop="collapseAll">- All</div>
    </div>
    <oms-scrollable rootClasses="body-border-default data-reader" :fastScroll="true" :refreshing="refreshing">
      <div slot="scrollableContent">
        <ul class="oms-directory-list">
          <li class="" v-for="(item, index) in list" :key="index">
            <span class="oms-directory-list-bullet expandable" @click.stop="toggle($event)">
            <span class="uppercase text-shaded">{{Object.keys(item)[0]}}: </span>
            <span class="lruName uppercase">{{item.lru}}</span>
            </span>
            <ul class="collapsed" v-if="item.data">
              <li v-for="(child, index) in item.data" :key="index">
                <span class="oms-directory-list-bullet expandable" @click.stop="toggleRows($event)">
                  <div class="parent-row">
                    <span class="capitalize text-shaded">{{Object.keys(child)[0]}}: {{child.label}}</span>
                    <span class="text-shaded bits-title">Bits</span>
                  </div>
                  <div class="child-row collapsed">
                    <div class="fault-row flex-justified" v-for="(lru, index) in child.bits" :key="index">
                    <table class="detail">
                      <tr>
                        <td class="">{{lru.label}}</td>
                        <td class="bits">{{lru.from}}</td>
                        <td class="bits">{{lru.to}}</td>
                      </tr>
                    </table>
                    </div>
                  </div>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </oms-scrollable>
  </div>
</template>
<script>
import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import lruSysMaintenanceReportsBtn from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: [],
      refreshing: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      item: state => state.appContext.omsViewPort.data,
      viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel,
      parentComponentName: state => state.appContext.omsViewPort.parentComponentName
    })
  },
  mounted () {
    this.list = this.item.lrus
    this.$bus.$emit('maintMenuSectionsAvailabilityState', true)
  },
  beforeDestroy () {
    this.$bus.$emit('maintMenuSectionsAvailabilityState', false)
  },
  mixins: [viewBtnsMixin, omsScrollableMixin],
  components: {
    omsScrollable,
    lruSysMaintenanceReportsBtn
  },
  methods: {
    refresh () {
      this.list = []
      this.refreshing = true
      setTimeout(() => {
        this.list = this.item.lrus
        this.refreshing = false
      }, 2000)
    },
    viewBackBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenuSections', view: (this.parentComponentName) })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/oms-directory-list';

$bits-width: 3vh;

.data-reader {
  width: 98%;
  margin: 0 1%;
  height: 82vh;
  border: $default-border
}

.btn-wrapper {
  height: 3vh;
  margin: 2vh 1vh 1vh 1vh
}

.oms-directory-list li {
  margin: 1vh;
  .parent-row {
    width: 50vh;
    .bits-title {
      float: right;
      margin-right: 1vh;

      width: $bits-width * 2;
      text-align: center;
    }
  }
  .fault-row {
    margin-top: 0.1vh;
  }
}
.detail {
  width: 100%
}
.bits {
  width: $bits-width;
}
</style>

