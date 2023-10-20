<template>
  <div class="inner-container-content">
    <oms-no-data-display v-if="!statuses"></oms-no-data-display>
    <div v-else class="row">
      <oms-table-pager
        :itemsPerPage="itemsPerPage">
        <table slot="pagerContent" class="db-status">
          <thead>
            <th>Database</th>
            <th>Status/Part No.</th>
            <th>Begin</th>
            <th>End</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in statuses"
              :key="index"
              :class="getClass(item)">
              <td @click.stop="showDetails(item)">{{item.db}}</td>
              <td :colspan="dateColspan(item)" v-bind:class="[dateColspan(item) === 3 ? 'colspanClass' : '']">{{item.status}}</td>
              <td v-if="dateColspan(item) === 1">{{ item.begin | DDMMYYYY }}</td>
              <td v-if="dateColspan(item) === 1">{{ item.end | DDMMYYYY }}</td>
            </tr>
          </tbody>
        </table>
      </oms-table-pager>
      <oms-window v-if="detailsPanel" size="half" :header="getHeader()" windowPropName="detailsPanel">
        <div slot="windowContent">
          <div v-for="(item, index) in current.details"
            :key="index">
            <div class="currentDetails">
              <div class="label">{{item.label}}:</div>
              <div v-if="!Array.isArray(item.value)" v-html="item.value"></div>
              <div v-if="Array.isArray(item.value)">
                  <div v-for="(item, index) in item.value"
                    :key="index" class='uppercase'>
                    EFF: {{item.begin}} to {{item.end}} <span v-if="item.active">Active</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </oms-window>
    </div>
  </div>
</template>

<script>
import omsTablePager from '@/components/trainer/oms/shared/paging/oms-table-pager'
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'

export default {
  name: 'dbstatus',
  data () {
    return {
      detailsPanel: false,
      current: {},
      itemsPerPage: 20
    }
  },
  mounted () {
    this.$bus.$on('closeWindow', () => {
      this.toggleDetails()
    })
    this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenu', target: this.$options.name })
  },
  beforeDestroy () {
    this.$bus.$off('closeWindow')
  },
  components: {
    omsTablePager,
    omsNoDataDisplay,
    omsWindow
  },
  computed: {
    ...mapState({
      statuses: state => state.appContext.omsViewPort.data.statuses
    })
  },
  methods: {
    getHeader () {
      return this.current.db.toUpperCase()
    },
    showDetails (item) {
      this.detailsPanel = true
      this.current = item
    },
    toggleDetails () {
      this.detailsPanel = !this.detailsPanel
    },
    getClass (item) {
      let c = item.status.replace(/ /g, '').toLowerCase()
      switch (c) {
        case 'current':
          return c
        case 'invalid':
          return c
        case 'notcurrent':
          return c
        default:
          return ''
      }
    },
    dateColspan (item) {
      if (item.begin === '' && item.end === '') {
        return 3
      }
      return 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';
 $borderWidth: $default-border-width;
 $radius: 0.5vh;
.oms-window {
  position: absolute !important;
  left: 12vh;
  top: 26vh;
  height: 30vh;
}
.currentDetails {
  padding: 0.5vh;
  margin-bottom: 2vh;
}
.colspanClass {
  width: 70%;
}
tr {
  &.notcurrent, &.invalid {
    td:first-child {
      color: $yellow !important
    }
  }
}

</style>
