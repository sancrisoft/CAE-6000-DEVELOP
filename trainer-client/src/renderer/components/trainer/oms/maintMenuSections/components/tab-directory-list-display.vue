
<template>
  <oms-scrollable :fastScroll="true"
  rootClasses="oms-tab-directory-list-body-default">
    <div slot="scrollableContent">
      <ul class="oms-directory-list">
        <li class="" v-for="(item, index) in items" :key="index">
          <span class="oms-directory-list-bullet expandable" @click.stop="toggle($event)">
            <span class="uppercase text-shaded">{{Object.keys(item)[0]}}: </span>
            <span class="lruName uppercase">{{item.lru}}</span>
          </span>
          <ul class="collapsed" v-if="item.data">
            <li class="" v-for="(child, index) in item.data" :key="index">
              <span class="oms-directory-list-bullet expandable" @click.stop="toggleRows($event)">
                <div class="parent-row">
                      <span class="capitalize text-shaded">{{Object.keys(child)[0]}}: </span>
                      <span class="ndo-number">{{child.label.NDOnumber}}</span>
                      <span>{{child.label.NDOname}}</span>
                      <span class="text-shaded bits">Bits</span>
                </div>
                <div class="child-row collapsed" @click.stop="ignoreToggle()">
                  <div class="fault-row" v-for="(fault, index) in child.label.items" :key="index">
                    <span class="larger uppercase">{{fault.desc}}</span>
                    <template v-if="!editMode">
                      <span v-if="hasNdoNumber(fault)">{{fault.NDOnumber}}</span>
                      <span v-else>--------</span>
                    </template>
                    <template v-else>
                      <div>
                        <template v-if="hasNdoNumber(fault)">
                          <div class="dataFieldValue"
                            @click.stop="editDataFieldValue(fault)"
                          >
                            {{fault.NDOnumber}}
                          </div>
                        </template>
                        <template v-else>
                          <input type="text" class="dataFieldValue" maxlength="6"
                            v-model="fault.dataFieldValue"
                            @keyup.enter="saveDataFieldValue(fault)"
                          ></input>
                        </template>
                      </div>
                    </template>
                    <span  class="bits-digits">{{fault.bits}}</span>
                  </div>
                </div>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </oms-scrollable>
</template>
<script>
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import { mapState } from 'vuex'
export default {
  name: 'fdedirectorylistdisplay',
  mixins: [omsScrollableMixin],
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    omsScrollable
  },
  mounted () {
    this.$bus.$on('directorylist.expandCollapse', (bool) => {
      if (bool) {
        this.expandAll()
      } else {
        this.collapseAll()
      }
    })
  },
  computed: {
    ...mapState({
      omsViewPort: state => state.appContext.omsViewPort,
      editMode: state => state.appContext.appConfig.editMode
    })
  },
  methods: {
    hasNdoNumber (item) {
      return item.NDOnumber && item.NDOnumber.length
    },
    editDataFieldValue (dataField, dataFieldValue) {
      dataField.dataFieldValue = dataField.NDOnumber
      dataField.NDOnumber = ''
    },
    saveDataFieldValue (dataField, $event) {
      dataField.NDOnumber = dataField.dataFieldValue

      var obj = {
        name: 'scnlrudata',
        action: 'upsert',
        data: Object.assign(
          {
            contextType: this.omsViewPort.componentName,
            contextId: this.omsViewPort.data.id
          },
          dataField
        )
      }
      this.$store.dispatch('appContext/postSBContent', obj)
        .then((response) => {})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/oms-directory-list';
.lruName {
  margin-left: 3vh
}

.table-content {
  width: 95%;
}

.table-content {
  .collapsible, .expandable {
    width: 100%;
    .parent-row {
      display: flex;
    }
  }
  .bits, .bits-digits {
    width: 4vh;
    text-align: center;
  }
  .bits {
    margin-left: auto;
  }
}

.fault-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .larger {
    width: $oms-directory-list-bullet-width * 0.7;
  }

  & > * {
    width: $oms-directory-list-bullet-width * 0.25;
  }

  .bits-digits {
    width: $oms-directory-list-bullet-width * 0.05;
  }

  .dataFieldValue, input.dataFieldValue {
    width: $oms-directory-list-bullet-width * 0.125;
    height: 1em;
    font-size: 1em;
    line-height: normal;

    border: 1px dashed $editModeColorLight;
    background-color: $editModeColor;

    &[type="text"] {
      font-family: $fontFace;
      color: $default-text-color;

      background-color: $editModeColorLight;
    }
  }
}
  .bits {
    float: right;
  }
</style>
