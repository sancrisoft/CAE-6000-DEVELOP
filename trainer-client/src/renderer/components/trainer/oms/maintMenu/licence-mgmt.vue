<template>
  <div class="inner-viewport-content">
    <div v-if="recycling" class="overlay flex-center">{{recycleStatus}}</div>
    <h1 class="uppercase">{{title}}</h1>
    <oms-scrollable rootClasses="body-border-default licence-mgmt">
      <thead slot="header" class="header">
        <th>Type No</th>
        <th>Part No</th>
        <th>Status</th>
      </thead>
      <div slot="scrollableContent">
        <table>
          <tr v-for="(item, index) in licences"
            :key="index"
            :class="getClass(item)">
            <td>
              <table>
                <tr>
                  <td class="typeNo">{{item.typeNo}}</td>
                  <td class="partNo">{{item.partNo}}</td>
                  <td class="status">{{item.status}}</td>
                  <td>{{item.type}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </oms-scrollable>
    <div class="full-width update-options uppercase">
      <p>Update Uptions</p>
      <hr>
      <div class="activation uppercase">Apm serial Number</div>
      <div class="activation-no">{{activationNo}}</div>
      <div class="flex-center">
        <div class="btn large activation-key uppercase" @click.stop="showKeyInput">Activation Key</div>
      </div>
    </div>
    <div class="full-width">
      <div class="flex-center" v-if="keyInput">
        <oms-key-input
          validateEvent="validateLicenceKey"
          @validateLicenceKey="validate">
        </oms-key-input>
      </div>
       <div class="updateBox" v-if="validating">
         <div class="updateHeader uppercase">Cycle System Power to Complete Updates</div>
         <div v-if="keyValid" class="validationoutput uppercase">{{processing}}</div>
         <div v-if="!keyValid" class="validationoutput uppercase">Invalid Key</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import omsKeyInput from '@/components/trainer/oms/shared/oms-key-input'

let recycleStatusDelay = 1000
let processingDelay = 500

export default {
  name: 'licencemgmt',
  data () {
    return {
      keyInput: false,
      keyValid: false,
      validating: false,
      processing: 'processing',
      recycling: false,
      recycleStatus: ''
    }
  },
  mixins: [omsScrollableMixin],
  components: {
    omsScrollable,
    omsKeyInput
  },
  mounted () {
    this.$store.dispatch('appContext/setContextMenuSelectedItem', { component: 'maintMenu', target: this.$options.name })
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      licences: state => state.appContext.omsViewPort.data.licences,
      activationNo: state => state.appContext.omsViewPort.data.activationNo
    })
  },
  methods: {
    validate (key) {
      this.validating = true
      if (key === '1234567890ABC') {
        this.keyValid = true
        this.keyInput = false
        setTimeout(() => {
          this.processing = 'Key Accepted'
          this.showSystemPowerCycleDialog()
        }, processingDelay)
      } else {
        this.keyValid = false
        this.keyInput = false
      }
    },
    showSystemPowerCycleDialog () {
      let proceed = confirm('Cycle System Power to Complete Updates.\nSelect "OK" to emulate Cycle System Power')
      if (proceed === true) {
        this.recycling = true
        setTimeout(() => {
          this.recycleStatus = 'ALM not available'
        }, recycleStatusDelay)
        setTimeout(() => {
          this.recycling = false
          this.keyInput = false
          this.validating = false
        }, recycleStatusDelay * 2)
      }
    },
    showKeyInput () {
      this.validating = false
      this.keyInput = true
    },
    getClass (item) {
      let c = item.status.replace(/ /g, '').toLowerCase()
      switch (c) {
        case 'enabled':
          return c
        case 'disabled':
          return c
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';

table.body-border-default {
  min-height: 45vh;
}

.updateHeader {
  color: $hoverBlue
}

.updateBox {
  margin: 0px 12vh;
}

.validationoutput {
  border: 1px solid white;
  justify-content: left;
  padding: 0.25vh;
  margin: 1vh 0;
}

  form {
    margin: 0
  }

.update-options {
  margin: 6vh 0;
  .top {
    margin-bottom: 0.5vh;
  }
  .bottom {
    margin-top: 0.5vh;
  }
  .activation-no {
    margin: 0 5vh;
    font-weight:bold;
    font-size: $default-text-size
  }
  .activation-key {
    margin: 1vh 0 1vh 0
  }

  .activation, .activation-no {
      display: inline-block;
  }

  .inline{
    display: inline-block;
  }
}

.disabled td {
  color: #999 !important;
}
</style>
