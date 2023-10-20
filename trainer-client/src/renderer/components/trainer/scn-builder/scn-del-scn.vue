<template>
  <div class="scnDelScn">
    Are you sure you want to delete scenario {{ currentScenario.name }}?
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'scnDelScn',
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        scenarios: state => state.appContext.scenarios,
        defaultScenario: state => state.appContext.appConfig.defaultScenarioId
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
      confirmData: {
        type: Object
      }
    }
  }
</script>
