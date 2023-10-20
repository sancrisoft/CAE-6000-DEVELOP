<template>
  <input :id="id" :name="name" type="radio" :value="value" @change="selectionChanged($event)" :checked="checked" :disabled="disabled">
</template>
<script>
export default {
  name: 'omsradioselector',
  props: {
    value: { type: Number },
    id: { type: String },
    name: { type: String },
    event: { type: String },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    selectionChanged: function (e) {
      if (this.disabled) return
      this.$bus.$emit(this.$options.propsData.event, e.target.value)
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/vars';
input[type="radio"] {
  display:none;
}

input[type="radio"] + label span {
  display:inline-block;
  margin-right: 1vh;
  width:14px;
  height:14px;
  background: none;
  background-color: $bl;
  border: solid $default-border-width $wh;
  border-radius: 4vh;
  &.disabled {
    background-color: $bl;
    border-color: $gr
  }
}
input[type="radio"]:checked + label span {
  background-color: $hoverBlue;
  border-color: $hoverBlue;
  &.disabled {
    background-color: rgba(255,255,255, 0.25);
    border-color: $gr;
  }
}
</style>
