<template>
  <div class="scnExportScn full-width">
    Scenario "{{ currentScenario.name }}" is exported into the field below.  Save a copy of the code.

    <form class="scnEditForm no-margin">

      <div class="row flex-start">
        <textarea v-model="item.scenarioJsonString" />
      </div>

    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      console.log(this.editData.data)
      console.log('------------------------------')
      console.log(this.editStore)
      return {
        attributes: this.editData.attributes,
        item: this.editData.data
      }
    },
    name: 'scnExportScn',
    components: {
    },
    mounted () {
      this.attributes.noSave = true
    },
    computed: {
      ...mapState({
        scenarios: state => state.appContext.scenarios,
        defaultScenario: state => state.appContext.appConfig.defaultScenarioId,
        editStore: state => state.appContext.omsViewPort.data.edit
      }),
      currentScenario () {
        return this.scenarios.filter(item => {
          return item.selected
        })[0]
      }
    },
    methods: {
    },
    props: {
      editData: {
        type: Object
      }
    }
  }
</script>
