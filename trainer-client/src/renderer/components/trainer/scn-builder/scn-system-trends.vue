<template>
  <div class="scnSystemTrends">
    <form class="scnEditForm no-margin" @submit.stop="saveEditor()">

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Trend:</span>
        <span>
          <select v-model="item.acm_trend_id">
            <option v-for="trend in editStore.trends" v-bind:value="trend.id" >{{ trend.label }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Phase of Flight:</span>
        <span>
          <select v-model="item.flightPhase">
            <option v-for="phase in editStore.phases" v-bind:value="phase" >{{ phase }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Flight Leg:</span>
        <span>
          <select v-model="item.flightLeg">
            <option v-for="fl in editStore.fls" v-bind:value="fl" >{{ fl }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Date:</span>
        <span>
          <input v-model="item.date" />
          <br><span class="flex-start formHelperLabel">Date format: 12AUG2018 20:33</span>
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
      return {
        item: this.editData.data
      }
    },
    name: 'scnSystemTrends',
    components: {
    },
    computed: {
      ...mapState({
        editStore: state => state.appContext.omsViewPort.data.edit
      })
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
