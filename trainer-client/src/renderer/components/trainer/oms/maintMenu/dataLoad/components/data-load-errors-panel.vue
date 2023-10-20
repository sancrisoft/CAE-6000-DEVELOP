<template>
  <oms-window class="data-load-errors-panel" size="full"
    :header="errorsHeader"
    windowPropName="dataloaderrors">
    <div slot="windowContent">
      <table class="dataLoadDetails">
        <tbody>
          <tr v-if="errors.length" v-for="item in errors" :key="item.id">
            <td valign="top">
              <div>{{item.itemName}}</div>
              <div v-for="type in item.type">{{type}}</div>
              <div class="error">{{item.error}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </oms-window>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      errorsHeader: state => state.appContext.omsViewPort.errorsHeader,
      errors: state => state.appContext.omsViewPort.data.errors
    })
  },
  components: {
    omsWindow
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.error {
  color: $yellow
}
.data-load-errors-panel {
  z-index: 888
}
</style>



