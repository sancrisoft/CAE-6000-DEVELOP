<template>
  <div class="inner-container-content">
    <data-load-overlays :download="download" :enterpassword="enterpassword"></data-load-overlays>
    <h1>{{title}}</h1>
    <oms-hoverable-list-menu :items="items"></oms-hoverable-list-menu>
  </div>
</template>

<script>
import dataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import omsHoverableListMenu from '@/components/trainer/oms/shared/oms-hoverable-list-menu'
import { mapState } from 'vuex'

export default {
  name: 'dataloadmenu',
  mixins: [dataLoadBaseMixin],
  computed: {
    ...mapState({
      items: state => state.appContext.omsViewPort.data.items
    })
  },
  components: {
    omsHoverableListMenu
  },
  methods: {
    viewBtnClicked () {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'dataload' })
    }
  }
}
</script>
