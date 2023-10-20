<template>
  <div>
    <div id="startload" v-if="startload">
      <oms-window size="half" class="floating-panel">
        <div slot="windowContent">{{startLoadtxt}}</div>
      </oms-window>
    </div>
    <div id="noItemSelected" v-if="noItemSelected">
      <oms-window size="half"
      windowPropName="noItemSelected" class="floating-panel">
        <div slot="windowContent" class="flex-centered">
          <div class="continue-panel">No loadable items are selected</div>
          <div class="row flex-centered continue-btn-container">
            <div class="btn slim continue" @click.stop="closeContinue">Continue</div>
          </div>
        </div>
      </oms-window>
    </div>
    <div id="download" v-if="download">
      <oms-overlay-panel
        size="half"
        bodyTxt="Updating Database List">
      </oms-overlay-panel>
    </div>
    <div id="enterpassword" v-if="enterpassword">
      <h1>Maintenance Data Load Password</h1>
      <oms-password-input @passwordSuccess="switchView"></oms-password-input>
    </div>
  </div>
</template>

<script>
import omsAcftTypeConsumerMixin from '@/components/trainer/oms/shared/oms-acft-type-consumer-mixin'
import omsPasswordInput from '@/components/trainer/oms/shared/oms-password-input'
import omsOverlayPanel from '@/components/trainer/oms/shared/oms-overlay-panel'
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'
export default {
  name: 'dataloadoverlays',
  computed: {
    ...mapState({
      startLoadtxt: state => state.appContext.omsViewPort.startLoadTxt
    })
  },
  mixins: [omsAcftTypeConsumerMixin],
  props: {
    download: {
      type: Boolean,
      default: false
    },
    enterpassword: {
      type: Boolean,
      default: false
    },
    startload: {
      type: Boolean,
      default: false
    },
    noItemSelected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    omsPasswordInput,
    omsOverlayPanel,
    omsWindow
  },
  methods: {
    switchView (key) {
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'dataloadmenu', userType: key })
    },
    closeContinue () {
      this.$bus.$emit('closeWindow', 'noItemSelected')
    }
  }
}
</script>
<style scoped lang="scss">
.continue-panel {
  line-height: 5vh;
}
.continue-btn-container {
 align-content: center;
 .btn {
   width: 150px;
   margin: 0 auto
 }
}
</style>
