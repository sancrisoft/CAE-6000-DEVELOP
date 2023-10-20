

<template>
  <div class="inner-viewport-content">
    <div class="row" id="enterpassword" v-if="!validPassword">
      <h1>Utility Functions Password</h1>
      <oms-password-input @passwordSuccess="showUtilities"></oms-password-input>
    </div>
    <div v-else class="row">
      <h1>{{title}}</h1>
      <div class="header text-shaded">Modify Maintenance Data:</div>
      <oms-hoverable-list-menu :items="maintenanceDataTargets"></oms-hoverable-list-menu>

      <div class="header text-shaded">Manage Maintenance Data / Files:</div>
      <oms-hoverable-list-menu :items="filteredMaintenanceDataFiles"></oms-hoverable-list-menu>

      <div class="checkBoxList">
        <oms-table-list
          :items="utilityfunctionsConfig"
          itemLabel="label"
          @oms-table-list-item-toogle="toggleSelected">
        </oms-table-list>
      </div>
    </div>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import omsTableList from '@/components/trainer/oms/shared/dynamicComponents/oms-table-list'
import omsPasswordInput from '@/components/trainer/oms/shared/oms-password-input'
import omsHoverableListMenu from '@/components/trainer/oms/shared/oms-hoverable-list-menu'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  name: 'utilityfunctions',
  mixins: [baseView],
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      maintenanceDataTargets: state => state.appContext.omsViewPort.data.items && state.appContext.omsViewPort.data.items.maintenanceDataTargets,
      maintenanceDataFiles: state => state.appContext.omsViewPort.data.items && state.appContext.omsViewPort.data.items.maintenanceDataFiles,
      utilityfunctionsConfig: state => state.appContext.utilityfunctionsConfig,
      validPassword: state => state.appContext.utilityFunctionsValidPassword,
      userType: state => state.appContext.utilityFunctionsAuthenticatedUserType
    }),
    filteredMaintenanceDataFiles () {
      if (this.userType === 'user' && this.maintenanceDataFiles) {
        return this.maintenanceDataFiles.filter(item => item.userType === 'user')
      } else {
        return this.maintenanceDataFiles
      }
    }
  },
  beforeDestroy () {
    // Remove user authentication, as it will be re-added when the user uses the back button. (REF 7e486e1b-572f-4033-9d5d-9016a208f227)
    this.$store.dispatch('appContext/setUtilityFunctionsValidPassword', false)
  },
  methods: {
    showUtilities (user) {
      this.userType = user
      this.$store.dispatch('appContext/setUtilityFunctionsValidPassword', true)
      this.$store.dispatch('appContext/setUtilityFunctionsAuthenticatedUserType', user)
    },
    ...mapActions({
      toggleSelected: 'appContext/toggleUtilityfunctionsConfig'
    })
  },
  components: {
    omsPasswordInput,
    omsHoverableListMenu,
    omsTableList
  }
}
</script>

<style scoped>
.header {
  margin: 5vh 0 1vh 0
}
.checkBoxList {
  margin-top: 28vh;
}

</style>
