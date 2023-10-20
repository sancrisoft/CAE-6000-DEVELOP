<template>
  <form v-on:submit.prevent="validate">
    <label v-if="label" for="key">{{label}}:</label>
    <input name="key" type="text" v-model="key"
      :class="[{invalid: error}, {enabled: enabled}]"
      @focus="reset()"
      @blur="reset()"
      @keyup="enable()"
      @mouseout="disable()" />
  </form>
</template>
<script>
export default {
  name: 'omskeyinput',
  data () {
    return {
      key: '',
      enabled: false,
      error: false
    }
  },
  props: {
    validateEvent: {
      type: String,
      required: true
    },
    validationMessage: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    reset () {
      this.key = ''
      this.error = false
    },
    enable () {
      this.enabled = true
    },
    disable () {
      this.enabled = false
    },
    setValidationMessage () {
      if (this.$options.propsData.validationMessage && this.$options.propsData.validationMessage.length > 0) {
        this.key = this.$options.propsData.validationMessage
        this.error = true
      } else {
        this.key = ''
        this.error = false
      }
    },
    validate () {
      this.$emit(this.$props.validateEvent, this.key)
      setTimeout(() => {
        this.setValidationMessage()
      }, 200)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
  input {
    text-transform: uppercase;
    height: 1.5vh;
    width: 20vh;
    font-size: $default-text-size
  }
  .invalid {
    color: $yellow
  }
  .enabled {
    border-style: dashed;
    &:hover {
      border-style: dashed;
      border-color: $hoverBlue;
    }
  }
</style>
