<template>
  <div class="scnEditScn">
    <form class="scnEditForm no-margin" @submit.stop="saveEditor()">

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Name:</span>
        <span>
          <input v-model="item.name" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Description:</span>
        <span>
          <input v-model="item.description" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Author:</span>
        <span>
          <input v-model="item.author" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Version:</span>
        <span>
          <input v-model="item.version" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Tail Number:</span>
        <span>
          <input v-model="item.tailNumber" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Flight Leg Counter:</span>
        <span>
          <input v-model="item.flightLegCounter" />
        </span>
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

      this.editData.data = Object.assign({}, this.editData.data)

      return {
        item: this.editData.data
      }
    },
    name: 'scnEditScn',
    components: {
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
