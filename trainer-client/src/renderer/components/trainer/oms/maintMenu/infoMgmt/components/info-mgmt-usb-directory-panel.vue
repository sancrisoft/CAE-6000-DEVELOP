<template>
  <oms-scrollable :fastScroll="true" rootClasses="body-border-default usb-directory">
    <div slot="scrollableContent">
      <ul class="oms-directory-list">
        <span class="root oms-directory-list-bullet expandable" @click.stop="toggle"></span>
        <li class="oms-directory-list collapsed">
          <ul>
            <li class="oms-directory-list" v-for="(item, index) in usbdirectory"
              :id="index"
              :key="index"
              @click.stop="transferFile(item)">
              <span class="oms-directory-list-bullet expandable" @click.stop="toggle($event, item)">
                <span @click.stop="transferFile(item)">{{item.file}}</span>
              </span>
              <ul class="collapsed" v-if="item.childs"
              @click.stop="transferFile(child)">
                <li class="oms-directory-list" v-for="(child, index) in item.childs" :key="index">
                  <span class="oms-directory-list-bullet expandable" @click.stop="toggle($event, child)">
                    <span @click.stop="transferFile(child)">{{child.file}}</span>
                  </span>
                </li>
              </ul>
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
  mixins: [omsScrollableMixin],
  components: {
    omsScrollable
  },
  computed: {
    ...mapState({
      usbdirectory: state => state.appContext.omsViewPort.data.usbdirectory
    })
  },
  methods: {
    transferFile: function (file) {
      switch (this.$options.parent.currentView) {
        case 'backupmediasets': // diabled
          break
        default:
          this.$bus.$emit('filesToBeTransferredChanged', file)
      }
    },
    toggle: function (e, item) {
      this.toggleListIcon(e)
      this.toggleChild(e)
      if (item) {
        this.transferFile(item)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/oms-directory-list';
  .root:after {
    content: 'F://';
    position: absolute;
    right: -2vh;
    color: $hoverBlue;
  }
</style>
