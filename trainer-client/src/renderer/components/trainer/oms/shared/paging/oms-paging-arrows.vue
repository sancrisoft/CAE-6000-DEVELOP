<template>
  <div class="counter-arrows flex-start">
    <span class="prev btn small" @click.stop="previousPage">˂˂</span>
    <span class="next btn small" @click.stop="nextPage">˃˃</span>
    <div class="counter-text">
      <span class="spacer">|</span>
      <span>{{headertext}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headertext: {
      type: String
    }
  },
  methods: {
    previousPage () {
      this.$emit('previousPage')
    },
    nextPage () {
      this.$emit('nextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/vars';
 .counter-arrows {
    padding: 0.25vh 0.5vh 0.25vh 0.25vh;
    span:first-child {
      margin-right: 1vh
    }

    > div {
      width: 100%
    }

    .spaced-header {
      width: 75%;
      margin: 0 1vh;
    }
    .spacer {
      font-size: 2.5vh;
      color: $gr
    }

    .counter-text {
      height: 3vh;
      align-items: center;
      display: inline-flex;
      font-size: $default-small-text-size;
    }
  }
</style>

