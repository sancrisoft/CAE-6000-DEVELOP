<template>
  <div class="inner-viewport-content uppercase">
    <h1 class="uppercase">Configure Wireless Lan</h1>
    <oms-no-data-display v-if="!hasData"></oms-no-data-display>
    <div v-else class="row">
      <p>Select an available configuration:</p>
      <div class="row configuration-table">
        <table class="body-border-default configure-wireless-lan">
          <thead>
            <th>Priority</th><th></th>
          </thead>
          <tbody>
            <tr>
              <oms-scrollable>
                <div slot="scrollableContent">
                  <table>
                    <tr v-for="(item, index) in configurations"
                      :key="index"
                      v-bind:id="index">
                      <td class="configuration-no">{{item.priority}}</td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </oms-scrollable>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row-horizontal flex-space-between">
        <div class='btn'>Create New<br>Config</div>
        <div class='btn'>Change Selected<br>Priority</div>
        <div class='btn'>Delete Selected<br>Config</div>
      </div>
      <div class="form-edit">
        <p>Edit Selected Configuration</p>
        <form>
          <div class="row-horizontal">
            <label>Name</label>
            <input type="text" value="" />
          </div>
          <div class="row-horizontal">
            <label>Essid</label>
            <input type="text" value="" />
          </div>
          <div class="row-horizontal comboBox">
            <label>Encryption Type</label>
            <oms-select
              @changeEncryptionType="selectEncryptionType"
              eventName="changeEncryptionType"
              :comboWidth="10"
              :list="encryptionTypes">
            </oms-select>
            <label>Key Code</label>
            <oms-select
              @changeKeyCode="selectKeyCode"
              eventName="changeKeyCode"
              :comboWidth="10"
              :list="keyCodes">
            </oms-select>
          </div>
          <div class="row-horizontal">
            <label>Key</label>
            <input />
          </div>
          <div class="row-horizontal">
            <div class='btn'>Save Config</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import { mapState } from 'vuex'
export default {
  name: 'configurewirelesslan',
  mixins: [infoMgmtBaseViewMixin, omsScrollableMixin],
  components: {
    omsSelect,
    omsScrollable
  },
  created () {
    this.scroll = (this.configurations && this.configurations.length) > this.scrollableItemsToShow
  },
  computed: {
    ...mapState({
      configurations: state => state.appContext.omsViewPort.data.configurations,
      encryptionTypes: state => state.appContext.omsViewPort.data.encryptionTypes,
      keyCodes: state => state.appContext.omsViewPort.data.keyCodes
    })
  },
  methods: {
    selectEncryptionType (selectedId) {
      this.selectedEncryptionType = this.encryptionTypes[selectedId]
    },
    selectKeyCode (selectedId) {
      this.selectedKeyCode = this.keyCodes[selectedId]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';
table.body-border-default {
  min-height: $default-x-large-text-size
}
.configuration-no {
  font-size: $default-x-large-text-size;
  border-right: 1px solid white;
  width: 4vh;
}

.row.configuration-table {
    margin: 1vh 0
}

form {
 margin: 0
}
.row {
  margin: 3vh 0;
  label {
    padding-bottom: 1.5vh;
  }

  label:first-child {
    padding-left: 0
  }
}
.row-items-wrapped {
  flex-direction: column;
  justify-content: flex-start;
}
.row-horizontal {
  display: flex;
  align-items: flex-start;
  margin: 3vh 0;
  label {
    padding: 0 2vh;
    line-height: 3vh;
  }

  &.comboBox label {
    line-height: 4.5vh
  }

  label:first-child {
    padding-left: 0
  }
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
}

</style>
