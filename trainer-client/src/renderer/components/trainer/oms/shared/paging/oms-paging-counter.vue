
<template>
  <div class="pager">
    <div v-if="counterShown">
      <div class="current"><span class="knob" :class="{enabled: knobOn}"></span>{{current}}</div>
      <span class="text-shaded">/{{pages}}</span>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'omspagercounterdisplay',
  data () {
    return {
      current: 0,
      pages: 0,
      counterShown: false
    }
  },
  props: {
    counterName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: 'default'
    },
    digits: {
      type: Number,
      default: 2
    }
  },
  computed: {
    ...mapGetters({
      selectedKnob: 'appContext/getSelectedKnob'
    }),
    knobOn () {
      let knob = this.selectedKnob
      if (knob) {
        return (knob.name.indexOf('maintmenusorteddatalist') > -1 && knob.status && knob.pages > 1) ||
        (knob.name.indexOf('omstablepager') > -1 && knob.status && knob.pages > 1) ||
        (knob.name.indexOf('omsPager') > -1 && knob.status && knob.pages > 1 && this.location === knob.location)
      }
    }
  },
  mounted () {
    this.pagingCounterName = this.$options.propsData.counterName

    this.$bus.$on(`set${this.pagingCounterName}PagingCounter`, (obj) => {
      this.update(obj)
    })

    this.$bus.$on(`reset${this.pagingCounterName}PagingCounter`, () => {
      this.reset()
    })
  },
  beforeDestroy () {
    this.$bus.$off(`set${this.pagingCounterName}PagingCounter`)
    this.$bus.$off(`reset${this.pagingCounterName}PagingCounter`)
  },
  methods: {
    reset () {
      this.current = 0
      this.pages = 0
      this.counterShown = false
    },
    update (obj) {
      this.current = this.formatDigits(obj.current)
      this.pages = this.formatDigits(obj.pages)
      this.counterShown = (obj.current >= 0 && obj.pages > 0)
    },
    formatDigits (value) {
      return value.toLocaleString('en-US', {minimumIntegerDigits: this.digits, useGrouping: false})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.pager {
  align-items: center;
  display: flex;
  padding: 0;
  font-size: $default-small-text-size;
  width: 10.5vh;
  margin-left: auto;
  .current {
    font-size: $default-text-size;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    border: 0.2vh solid $wh;
    border-radius: 0.5vh;
    width: 5.5vh;
    height: auto;
    padding: 0.25vh;
    .knob {
      @include knob
    }
  }
}

.oms-viewport-header {
  .pager {
    margin-right: 4vh;
    .current {
        border-color: $gr;
    }
    .text-shaded {
      color: $gr;
      font-size: 2vh;
    }
  }
}

</style>


