<template>
  <div class="inner-viewport-content">
    <h1>Maintenance Main Menu</h1>
    <oms-hoverable-list-menu :items="main"></oms-hoverable-list-menu>
    <oms-hoverable-list-menu :items="utility"></oms-hoverable-list-menu>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import omsHoverableListMenu from '@/components/trainer/oms/shared/oms-hoverable-list-menu'
import { mapState } from 'vuex'
export default {
  name: 'maintmenu',
  mounted () {
    this.$store.dispatch('appContext/resetContextMenuSelectedChildItem', { component: 'maintMenuSections', view: this.$options.name })
    this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenuSections', target: this.$options.name })
  },
  computed: {
    ...mapState({
      main: state => state.appContext.omsViewPort.data.main,
      utility: state => state.appContext.omsViewPort.data.utility
    })
  },
  components: {
    omsHoverableListMenu
  }
}
</script>

<style lang="scss" scoped>
  .utilities {
    margin-top: 2.5vh !important
  }
</style>
