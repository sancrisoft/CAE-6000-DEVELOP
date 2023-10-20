<template>
    <oms-key-input
      validateEvent="validate"
      :validationMessage="invalidMessage"
      @validate="validateKeyInput"
      label="Enter Password">
    </oms-key-input>
</template>
<script>
import omsKeyInput from '@/components/trainer/oms/shared/oms-key-input'
export default {
  name: 'dataloadpassword',
  data () {
    return {
      password: '',
      invalidMessage: ''
    }
  },
  components: {
    omsKeyInput
  },
  methods: {
    validateKeyInput (key) {
      this.invalidMessage = ''
      let user = key.toUpperCase() === this.$store.state.appContext.appConfig.omsPasswordInputPassword
      let admin = key.toUpperCase() === this.$store.state.appContext.appConfig.adminInputPassword
      let userType = admin ? 'admin' : 'user'

      if (user || admin) {
        this.$emit('passwordSuccess', userType)
      } else {
        this.invalidMessage = 'Invalid Password'
      }
    }
  }
}
</script>

