<template>
  <div class="flex-center">
    <div class="selector">
      <form id="fileTransferForm">
        <table>
          <tr>
            <td>
              <oms-radio-selector
                :value="inboundValue"
                id="inbound"
                :name="name"
                :event="event"
                :checked="true">
               </oms-radio-selector>
              <label for="inbound" class="uppercase"><span></span>{{inbound}}</label>
            </td>
          </tr>
          <tr>
            <td>
              <oms-radio-selector
                :value="outboundValue"
                id="outbound"
                :name="name"
                :event="event">
               </oms-radio-selector>
              <label for="outbound" class="uppercase"><span></span>{{outbound}}</label>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import omsRadioSelector from '@/components/trainer/oms/shared/oms-radio-selector'
export default {
  name: 'infoMgmtFileTransferSelector',
  props: {
    inbound: {
      type: String,
      required: true
    },
    inboundValue: {
      type: Number,
      required: true
    },
    outbound: {
      type: String,
      required: true
    },
    outboundValue: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    }
  },
  components: {
    omsRadioSelector
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.selector {
  width: 60%;
  border: $default-border;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
  }
  td {
    min-width: 88%;
    border: $default-border-width solid transparent;
    margin: 0;
    padding: 0.9vh;
    border-radius: 0.5vh;

    &:hover {
      border-color: #68c3e1;
    }
  }
}
form {
  margin: 1vh;
  width: 100%;
  display: inline-block;
  * {
    display: block;
    float: left;
  }
  label {
    width: 100%;
    line-height: 2.25vh;
  }
}
</style>
