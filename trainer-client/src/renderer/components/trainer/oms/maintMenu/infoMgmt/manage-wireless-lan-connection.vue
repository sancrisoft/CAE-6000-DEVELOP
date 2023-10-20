<template>
  <div class="inner-container-content">
    <h1 class="uppercase">Manage Wireless Lan Connection</h1>
    <div class="oms-checkbox-selector">
      <oms-checkbox-selector
        :selected="true">
        <div slot="oms-checkbox-item-name"
             class="oms-checkbox-item-name uppercase">Enable Wireless LAN / Cellular</div>
      </oms-checkbox-selector>
    </div>
    <div class="override">
      <h2 class="uppercase">Available Wireless Networks</h2>
      <oms-scrollable rootClasses="body-border-default file-transfer">
        <div slot="scrollableContent">
          <table>
            <tr>
              <td>
                <oms-radio-selector
                  :value="dis"
                  id="dis"
                  :name="name"
                  :event="event"
                  :checked="true">
                </oms-radio-selector>
                <label for="dis" class="uppercase dis"><span></span>DISCONNECTED</label>
              </td>
            </tr>
          </table>
        </div>
      </oms-scrollable>
  </div>
  </div>
</template>

<script>
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import omscheckboxselector from '@/components/trainer/oms/shared/oms-checkbox-selector'
import omswindow from '@/components/trainer/oms/shared/oms-window'
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import omsRadioSelector from '@/components/trainer/oms/shared/oms-radio-selector'

export default {
  data () {
    return {
      status: 'unknown',
      error: false,
      resetValue: 1
    }
  },
  name: 'managewirelesslanconnection',
  mixins: [infoMgmtBaseViewMixin, omsScrollableMixin],
  components: {
    omsRadioSelector,
    omsScrollable,
    'oms-checkbox-selector': omscheckboxselector,
    'oms-window': omswindow
  }
}
</script>

<style lang="scss">
  @import '~@/assets/vars';

  div.override div.flex-center div.selector {
    width: 100% !important
  }

  .oms-checkbox-selector {
    margin: 4vh 0
  }

  label.dis {
    width: 100%;
    line-height: 2.25vh;
    font-size: 2.25vh;
    color: $hoverBlue;
  }

</style>

