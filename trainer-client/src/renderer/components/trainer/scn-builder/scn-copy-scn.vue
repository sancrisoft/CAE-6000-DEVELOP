<template>
  <div class="scnCopyScn">
    What do you want to save scenario "{{ currentScenario.name }}" as?

    <form class="scnEditForm no-margin" @submit.stop="saveEditor()">

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Name:</span>
        <span>
          <input v-model="item.saveAsName" />
        </span>
      </div>

    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'scnCopyScn',
    data () {
      console.log(this.editData.data)
      console.log('------------------------------')
      console.log(this.editStore)
      return {
        attributes: this.editData.attributes,
        item: this.editData.data
      }
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
