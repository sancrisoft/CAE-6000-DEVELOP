<template>
  <table :class="rootClasses">
    <slot name="header"></slot>
    <tbody>
      <tr>
        <td>
          <div v-on:mouseenter="setKnob()">
            <div class="scroller" v-if="scroll" @click.stop="setScrollBtnAvailabilities">
              <div v-if="fastScroll" class="arrow-top btn" :class="{disabled:upAvailability}" @click="top"></div>
              <div class="arrow-up btn" @click="up" :class="{disabled:upAvailability}"></div>
              <div class="knob" :class="{enabled: knobOn}"></div>
              <div class="arrow-dwn btn" :class="{disabled:!dwnAvailability}" @click="down" ></div>
              <div v-if="fastScroll" class="arrow-bottom btn" :class="{disabled:!dwnAvailability}" @click="bottom"></div>
            </div>
            <div :id="id" class="scroll-row" :class="{scrollable: scroll}" ref="scrollableRow">
              <slot name='scrollableContent'>
              </slot>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import omsKnob from '@/components/trainer/oms/shared/paging/oms-knob-consumer-mixin'
let delay = 500
export default {
  name: 'omsScrollable',
  data () {
    return {
      scrollable: null,
      scroll: false,
      topAvailability: false,
      upAvailability: false,
      dwnAvailability: true,
      bottomAvailability: true
    }
  },
  mounted () {
    this.$bus.$on('omsScrollable-setScroll', () => {
      this.setScroll()
    })

    this.$bus.$on(`omsKnob-decrease${this.id}PagingCounter`, () => {
      this.up()
    })
    this.$bus.$on(`omsKnob-increase${this.id}PagingCounter`, () => {
      this.down()
    })

    this.init()
  },
  beforeDestroy () {
    this.$bus.$off(`omsScrollable-setScroll`)
    this.$bus.$off(`omsKnob-decrease${this.id}PagingCounter`)
    this.$bus.$off(`omsKnob-increase${this.id}PagingCounter`)
  },
  mixins: [omsKnob],
  watch: {
    refreshing () {
      this.scroll = false
    }
  },
  props: {
    fastScroll: {
      type: Boolean,
      default: false
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    rootClasses: {
      type: String,
      default: ''
    }
  },
  methods: {
    init () {
      setTimeout(() => {
        this.scrollable = document.getElementById(this.id)
        let widget = this.scrollable
        if (widget) {
          this.$bus.$on(`scrollTop-${this.id}`, () => {
            this.top()
          })
          this.$bus.$on(`scrollUp-${this.id}`, () => {
            this.up()
          })
          this.$bus.$on(`scrollDown-${this.id}`, () => {
            this.down()
          })
          this.$bus.$on(`scrollBottom-${this.id}`, () => {
            this.bottom()
          })

          widget.onmousewheel = function () { return false }
        }
      }, delay)

      setTimeout(() => {
        this.setScrollBtnAvailabilities()
      }, delay + delay)
    },
    setScrollBtnAvailabilities () {
      if (this.scrollable) {
        this.upAvailability = !this.scrollable.scrollTop
        this.dwnAvailability = this.scrollable.offsetHeight + this.scrollable.scrollTop !== this.scrollable.scrollHeight
      }
    },
    top () {
      this.scrollable.scrollBy(0, -this.getParentListHeight())
      this.setScrollBtnAvailabilities()
    },
    up (e) {
      this.scrollable.scrollBy(0, -this.getOmsDirectoryListElementHeight())
      this.setScrollBtnAvailabilities()
    },
    down (e) {
      this.scrollable.scrollBy(0, this.getOmsDirectoryListElementHeight())
      this.setScrollBtnAvailabilities()
    },
    bottom () {
      this.scrollable.scrollBy(0, this.getParentListHeight())
      this.setScrollBtnAvailabilities()
    },
    getTop () {
      let xPos = 0
      let widget = this.scrollable
      while (widget) {
        // for all other non-BODY elements
        xPos += (widget.offsetLeft - widget.scrollLeft + widget.clientLeft)
        widget = widget.offsetParent
      }
      return xPos
    },
    setScroll () {
      let vm = this
      setTimeout(function () {
        if (vm.getParentListHeight() < vm.getOmsDirectoryListHeight()) {
          vm.scroll = true
        } else {
          vm.scroll = false
        }
        vm.setScrollBtnAvailabilities()
      }, 500)
    },
    getParentListHeight () {
      if (this.$refs.scrollableRow) {
        return this.$refs.scrollableRow.offsetHeight
      }
    },
    getOmsDirectoryListHeight () {
      if (this.$slots.scrollableContent) {
        return this.$slots.scrollableContent[0].elm.offsetHeight
      }
    },
    getOmsDirectoryListElementHeight () {
      if (this.$slots.scrollableContent) {
        // Structure: .elm{div}.childNodes[0]{ul}.children[0]{li}.children[0]{span}
        return this.$slots.scrollableContent[0].elm.childNodes[0].children[0].children[0].offsetHeight
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/oms-scroller';

  .scroll-row {
    bottom: 0;
  }

  .scroller {
    .btn {
      margin: 0
    }
    div {
      display: block;
      width: 2vh;
      height: 2vh;

      &.knob {
        margin: 1vh 0;
        @include knob
      }
    }

    .arrow-top, .arrow-up, .arrow-dwn, .arrow-bottom {
      position: relative;
      height: 4vh;
      &:before {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    .arrow-top {
      &:before {
        background: url('~@/assets/static/img/arrow-sprite.png') -48px -2px no-repeat
      }
      &.disabled {
        &:before {
          background: url('~@/assets/static/img/arrow-sprite.png') 4px -2px no-repeat
        }
        border-color: transparent;
      }
    }
    .arrow-up {
      margin-top: 0.5vh;
      &:before {
        background: url('~@/assets/static/img/arrow-sprite.png') -31px 0 no-repeat
      }
      &.disabled {
        &:before {
          background: url('~@/assets/static/img/arrow-sprite.png') -14px 0 no-repeat
       }
       border-color: transparent;
      }
    }
    .arrow-dwn {
      margin-bottom: 0.5vh;
      &:before {
        background: url('~@/assets/static/img/arrow-sprite.png') -31px -33px  no-repeat
      }
      &.disabled {
        &:before {
          background: url('~@/assets/static/img/arrow-sprite.png') -14px -34px  no-repeat
        }
        border-color: transparent;
      }
    }
    .arrow-bottom {
      &:before {
        background: url('~@/assets/static/img/arrow-sprite.png') -48px -36px  no-repeat
      }
      &.disabled {
        &:before {
          background: url('~@/assets/static/img/arrow-sprite.png') 4px -36px  no-repeat
        }
        border-color: transparent;
      }
    }
  }
</style>
