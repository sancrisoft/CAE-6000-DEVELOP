<template>
  <div>
    <table class="parameter-group-display-list">
      <thead>
        <th class="header table-text-shaded">Parameter Name</th>
        <th class="header table-text-shaded">Value</th>
      </thead>
      <tr v-for="item in sortedData" :key="item.id">
        <td class="larger uppercase">{{item.name}}</td>
        <td :class="{'flex-justified': !editMode, dynamic:editMode}"
          @click.stop="changeItemValue(item)">
          <span class="hoverable">{{item.value}}</span>
          <span class="hoverable">{{item.uom}}</span>
        </td>
      </tr>
    </table>
    <confirm-panel
      v-show="confirmPanel"
      header="Confirm Selection"
      :bodyTxt="selectedItem.name"
      :updatedItem="selectedItem"
      @submit="submit"
      @reset="reset">
    </confirm-panel>
  </div>
</template>
<script>
import confirmPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/confirm-panel'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      confirmPanel: false,
      selectedItem: {}
    }
  },
  name: 'parametergrouplist',
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      sortedData: state => state.appContext.omsViewPort.sortedData
    })
  },
  mounted () {
    this.$bus.$on('closeWindow', (windowPropName) => {
      this[windowPropName] = false
    })
  },
  components: {
    confirmPanel
  },
  methods: {
    changeItemValue (item) {
      if (this.editMode) {
        this.selectedItem = Object.assign({}, item)
        this.confirmPanel = true
      }
    },
    submit (newItem) {
      this.$store.dispatch('appContext/omsViewPort/changeSystemParametersData', newItem)
      this.reset()
    },
    reset () {
      this.sectedValue = {}
      this.confirmPanel = false
    }
  }
}
</script>


