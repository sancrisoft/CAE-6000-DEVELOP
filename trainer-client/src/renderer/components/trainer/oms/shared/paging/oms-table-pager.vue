<template>
  <div v-on:mouseenter.stop="setKnob(totalPages)">
    <slot name="pagerContent"></slot>
  </div>
</template>

<script>
import utils from '@/components/trainer/oms/shared/utils/oms-utils'
import omsKnob from '@/components/trainer/oms/shared/paging/oms-knob-consumer-mixin'
export default {
  name: 'omstablepager',
  data () {
    return {
      pages: [],
      rows: [],
      currentPage: 1,
      totalPages: 0
    }
  },
  mounted () {
    this.pagerId = utils.getRandomId(this.$options.name)

    this.$on('omsKnobIncrease', () => {
      this.goTo('next')
    })
    this.$on('omsKnobDecrease', () => {
      this.goTo('prev')
    })

    this.init()
  },
  beforeDestroy () {
    this.$off('omsKnob-increase')
    this.$off('omsKnob-decrease')
    this.$bus.$emit('resetViewportHeaderPagingCounter')
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 0
    }
  },
  mixins: [omsKnob],
  methods: {
    init () {
      this.rows = this.$slots.pagerContent[0].children[2].children
      if (this.rows) {
        this.pages = utils.chunk(this.rows, this.$options.propsData.itemsPerPage)
        this.setVisibles(this.currentPage)

        this.totalPages = this.pages.length
      }
    },
    resetVisibles (pageIndex) {
      Array.forEach(this.pages[pageIndex - 1], function (row) {
        row.elm.classList.remove('visible')
      })
    },
    setVisibles (pageIndex) {
      Array.forEach(this.pages[pageIndex - 1], function (row) {
        row.elm.classList.add('visible')
      })

      this.changeCounterDisplay()
    },
    goTo (direction) {
      if (direction === 'next' && this.currentPage !== this.pages.length) {
        this.resetVisibles(this.currentPage)
        this.currentPage++
        this.setVisibles(this.currentPage)
      } else if (direction === 'prev' && this.currentPage > 1) {
        this.resetVisibles(this.currentPage)
        this.currentPage--
        this.setVisibles(this.currentPage)
      }
    },
    changeCounterDisplay () { // sets ViewportHeader paging display
      this.$bus.$emit('setViewportHeaderPagingCounter', {
        current: this.currentPage,
        pages: this.pages.length
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 table tr {
   display: none;
   &.visible {
      display: block
   }
 }
</style>
