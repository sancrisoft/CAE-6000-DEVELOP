<template>
   <oms-window size="half" class="floating-panel"
        :header="header"
        windowPropName="confirmPanel">
      <div slot="windowContent">
        <div>{{bodyTxt}}</div>
        <form class="yes-no-form">
          <input v-model="updatedItem.value" :class="{hidden:!updatedItem.value}">
          <input v-model="updatedItem.uom" :class="{hidden:!updatedItem.uom}">
          <div class="btn large slim" @click.stop="submit">YES</div>
          <div class="btn large slim" @click.stop="reset">NO</div>
        </form>
      </div>
    </oms-window>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
export default {
  name: 'confirmpanel',
  props: {
    bodyTxt: {
      type: String
    },
    header: {
      type: String
    },
    updatedItem: {
      type: Object,
      default: () => Object.assign({})
    }
  },
  components: {
    omsWindow
  },
  methods: {
    submit () {
      this.$emit('submit', this.updatedItem)
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
