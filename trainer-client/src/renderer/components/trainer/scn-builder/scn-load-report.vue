<template>
  <div class="scnLoadReport">
    Select the aircraft report to load into a new scenario.

    <form class="scnEditForm" enctype="multipart/form-data">

      <div class="row flex-start">
        <div class="dropbox">
          <p v-if="file.name">
            REPORT LOADED
          </p>
          <p v-else>
            BROWSE FOR XML REPORT
          </p>
          <input type="file" @change="aircraftReportChange($event.target)" />
        </div>
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
        file: {},
        attributes: this.editData.attributes,
        item: this.editData.data
      }
    },
    name: 'scnLoadReport',
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
      aircraftReportChange (eventTarget) {
        let fileList = eventTarget.files

        if (!fileList.length) {
          this.attributes.noSave = true

          return
        }

        this.file = fileList[0]

        // Read the XML content from the file.
        const reader = new FileReader()
        reader.onload = (e) => {
          this.item.aircraftReportXml = e.target.result

          this.attributes.noSave = false
        }
        reader.readAsText(this.file)
      }
    },
    props: {
      editData: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/vars';

  input[type="file"] {
    opacity: 0; /* invisible but it's there! */

    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    cursor: pointer;
  }

  .dropbox {
    background: gray;
    color: white;
    border-radius: 0.45vh;
    padding: 10px 10px;
    width: 100%;
    position: relative;
    cursor: pointer;

    &:hover {
      background: lightgray;
    }

    p {
      font-size: 1.2em;
      text-align: center;
    }
  }
</style>
