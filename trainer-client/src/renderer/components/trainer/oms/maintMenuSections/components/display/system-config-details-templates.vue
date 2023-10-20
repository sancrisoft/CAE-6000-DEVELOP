
<template>
  <oms-no-data-display v-if="!hasItem"></oms-no-data-display>
  <div v-else class="row">
    <div v-if="isApmConfiguration">
      <oms-pager :extraPage="true" location="omsWindow" :currentPage="itemindex" special="APMConfig"
        rootClasses="details-table table-header">
        <div slot="scrollableContent">
          <div id="pagerContainer">
            <div v-for="(page,page_index) in items" :key="page_index">
              <div class="page">
                <table id="pagerContainerAPMConfig" class="details-table">
                  <thead slot="header">
                  <th class="text-shaded bits">Bits</th>
                  <th class="larger"></th>
                  <th class="text-shaded">Left APM</th>
                  <th class="text-shaded">Right APM</th>
                  </thead>
                  <tr v-for="(item, index) in page" :key="index">
                    <td class="bits">{{item.bits}}</td>
                    <td class="larger">{{item.label}}</td>
                    <td>{{item.leftApm}}</td>
                    <td>{{item.rightApm}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </oms-pager>
    </div>
    <div v-if="isApm">
      <h1>APM</h1>
    </div>
    <div v-if="isTso">
      <oms-pager location="omsWindow">
        <div slot="scrollableContent">
          <div id="pagerContainer">
            <template v-for="line in items[0].split('\\n')">{{line}}<br></template><br>
            </div>
        </div>
      </oms-pager>
    </div>
    <div v-if="isCrosscheck">
      <oms-pager location="omsWindow"
        rootClasses="details-table-crosscheck">
        <div slot="scrollableContent">
          <div id="pagerContainer">
            <table class="details-table-crosscheck" v-for="(item, index) in items" :key="index">
              <tr>
                <td class="label">{{item.label}}</td>
                <td><span class="text-shaded">Status:</span><span class="invalid"> {{item.status}}</span></td>
              </tr>
              <tr v-for="(softData, j) in item.data" :key="j">
                <td colspan="2" class="">
                  <table class="crosscheck nowrap">
                    <tr>
                      <td>{{Object.entries(softData)[0][0]}}: </td>
                      <td>{{Object.entries(softData)[0][1]}}</td>
                      <td class="text-right"><span v-if="Object.entries(softData)[1]">
                        {{Object.entries(softData)[1][0]}}: {{Object.entries(softData)[1][1]}}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </oms-pager>
    </div>
  </div>
</template>
<script>
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import omsPager from '@/components/trainer/oms/shared/paging/oms-pager'
export default {
  name: 'sysconfigapmconfiguration',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemindex: {
      type: Number,
      default: 1
    },
    type: {
      string: String,
      default: 'apmConfig'
    }
  },
  computed: {
    hasItem () {
      return this.items && this.items.length
    },
    isApm () {
      return this.type === 'apm'
    },
    isApmConfiguration () {
      return this.type === 'apmConfig'
    },
    isTso () {
      return this.type === 'tso'
    },
    isCrosscheck () {
      return this.type === 'crosscheck'
    }
  },
  components: {
    omsNoDataDisplay,
    omsPager
  }
}
</script>
<style lang="scss">
@import '~@/assets/vars';
.oms-pager-body-default {
  height: 70vh;
  .details-table {
    font-size: 1.4vh;
  }
}
.details-table {
  width: 100%;
  .table-header {
    border-bottom: $default-border
  }
}
.details-table-crosscheck {
  width: 100%;
  margin-bottom: 1vh;
  .label {
    font-size: 3vh
  }

  .invalid {
    color: $yellow
  }
  .crosscheck {
    width: 95%;
    td {
      width: 33%;
      &.text-right {
        text-align: right;
      }
    }
  }
}

.details-table-subsystems, .tso-table {
  width: 100%;
  margin-bottom: 1vh;

  td {
    width: 50%
  }
}

.bits {
  width: 5vh
}
.larger {
  width: 50%
}
#pagerContainer {
  .page {
    width: 100%;
    display: block;
    min-height: 66vh;
    box-sizing: border-box;
    h1, p {
      width: 100%
    }
  }
}
</style>

