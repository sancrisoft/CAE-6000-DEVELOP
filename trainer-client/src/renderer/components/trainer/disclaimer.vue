
<template>
  <transition name="bounce">
      <div class="modal-wrapper flex-center">
        <div class="disclaimer">
          <div v-html="disclaimerFormatedText"></div>
          <p>@{{year}} CAE Inc.</p>

          <div v-if="!disclaimerAccepted" class="flex-center">
            <div id="accept" class="btn" @click.stop="acceptDisclaimer">I Accept</div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'disclaimer',
  created () {
    this.year = (new Date()).getFullYear()
  },
  computed: {
    ...mapState({
      disclaimerAccepted: state => state.appContext.disclaimerAccepted,
      disclaimerFormatedText: state => state.appContext.appConfig.disclaimerFormatedText
    })
  },
  methods: {
    acceptDisclaimer () {
      this.$store.commit('appContext/ACCEPT_DISCLAIMER')
      this.$bus.$emit('toggleDisclaimer')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/vars';
.disclaimer {
  width: 50%;
  height: 40vh;
  font-size: 1.8vh;
  z-index: 999;
  padding: 1.36vh;
  background-color: white;
  z-index: 9999;
  color: black;
  border-radius: 2vh;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $default-text-color;
    background-color: $default-bg-color;
    border-radius: 0.45vh;
    width: 15vh;
    height: 5vh;
    cursor: pointer;
  }
}
</style>
