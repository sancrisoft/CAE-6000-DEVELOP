<template>
  <div class="detailsPanel">
    <oms-window :header="detailsHeader" size="full" windowPropName="detailsPanel">
      <div slot="windowContent">

        <table class="dataLoadDetails" v-if="headerLeft==='Target/LRU'" >
          <thead>
            <th>{{headerLeft}}</th>
            <th>{{headerRight}}</th>
          </thead>
          <tbody v-for="(item, index) in selectedDetails" :key="index">
            <tr>
              <td valign="top">{{item.itemName}}</td>
              <td></td>
            </tr>
            <tr v-for="(s, index) in item.data" :key="index">
              <td class="missing">{{s.missing}}</td>
              <td>
                <div class="software_first_line">{{s.info}}</div>
                <div class="software_second_line" v-if="s.missing===''">{{s.info}}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="dataLoadDetails" v-else >
           <thead>
            <th>{{headerLeft}}</th>
            <th>{{headerRight}}</th>
          </thead>
          <tbody v-for="(item, index) in selectedDetails" :key="index">
            <tr>
              <td valign="top">{{item.itemName}}</td>
              <td></td>
            </tr>
            <tr v-for="(s, index) in item.data" :key="index">
              <td></td>
              <td>{{s}}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </oms-window>
  </div>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      detailsHeader: state => state.appContext.omsViewPort.detailsHeader,
      headerLeft: state => state.appContext.omsViewPort.headerLeft,
      headerRight: state => state.appContext.omsViewPort.headerRight,
      selectedDetails: state => state.appContext.omsViewPort.selectedDetails
    })
  },
  components: {
    omsWindow
  }
}
</script>

<style lang="scss" scoped>

@import '~@/assets/vars';
th {
  border-bottom: 1px solid gray !important;
}
td {
  border: none !important;
}
tbody > tr:last-child > td {
  border-bottom: 1px dashed gray !important;
}
.software_second_line {
  padding-left: 20px;
}
.missing {
  color: yellow;
  font-weight: bold;
}

</style>


