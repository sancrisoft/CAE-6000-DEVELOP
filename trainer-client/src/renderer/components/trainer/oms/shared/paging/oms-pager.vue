<template>
  <table class="oms-pager-body-default">
    <tbody>
      <tr>
        <td>
          <div class="scroller" v-if="scroll"><!-- Kept to hide scrollbar--></div>
          <div :id="id" class="scroll-row"
            :class="{scrollable: scroll}"
            v-on:mouseenter="setKnob(pages, location)"
            ref="scrollablePage">
            <slot name='scrollableContent'>
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import omsKnob from '@/components/trainer/oms/shared/paging/oms-knob-consumer-mixin'
export default {
  name: 'omsPager',
  data () {
    return {
      scrollable: null,
      scroll: true,
      currentPage: 1,
      minPage: 1
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    tableId: {
      type: String,
      default: 'pagerContainer'
    },
    location: {
      type: String,
      default: 'default'
    },
    extraPage: {
      type: Boolean,
      default: false
    },
    special: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$bus.$on(`omsKnob-decrease${this.id}PagingCounter`, () => {
      this.previousPage()
    })

    this.$bus.$on(`omsKnob-increase${this.id}PagingCounter`, () => {
      this.nextPage()
    })

    let pager = document.getElementById(this.id)
    pager.onmousewheel = function () { return false }

    this.init()
  },
  beforeDestroy () {
    this.$bus.$off('omsKnob-decreaseStandalonePaging')
    this.$bus.$off('omsKnob-increaseStandalonePaging')
  },
  mixins: [omsKnob],
  methods: {
    init () {
      this.pages = Math.ceil(this.getOmsDirectoryListHeight() / this.getParentListHeight()) + (this.extraPage ? 1 : 0)
      if (this.special === 'APMConfig') {
        this.pages = 24
        this.minPage = 0
      }
      this.scrollable = document.getElementById(this.id)
      let widget = this.scrollable
      if (widget) {
        this.updatePagerCounter()
        this.setContainerHeight()
        if (this.special === 'APMConfig') {
          this.scrollable.scrollBy(0, this.getParentListHeight() * this.currentPage)
        }
      }
      setTimeout(() => {
        this.addSpacerRow()
      }, 500)
    },
    getParentListHeight () {
      if (this.$refs.scrollablePage) {
        return this.$refs.scrollablePage.offsetHeight
      }
    },
    getOmsDirectoryListHeight () {
      if (this.$slots.scrollableContent) {
        return this.$slots.scrollableContent[0].elm.offsetHeight
      }
    },
    nextPage () {
      if (this.currentPage < this.pages) {
        this.currentPage = this.currentPage + 1
      }
      this.updatePagerCounter()
      this.scrollable.scrollBy(0, this.getParentListHeight())
    },
    previousPage () {
      if (this.currentPage > this.minPage) {
        this.currentPage = this.currentPage - 1
      }
      this.updatePagerCounter()
      this.scrollable.scrollBy(0, -this.getParentListHeight())
    },
    updatePagerCounter () {
      this.$store.dispatch('appContext/registerCurrentSelectedKnob', { name: this.id, status: true, pages: this.pages, location: this.location })

      let pagingCounterName = 'omsPager'
      this.$bus.$emit(`set${pagingCounterName}PagingCounter`, { current: this.currentPage, pages: this.pages })
    },
    setContainerHeight () {
      this.dataTable = document.getElementById(this.tableId)
      let containerHeight = this.getParentListHeight() * this.pages
      this.dataTable.setAttribute('style', `height:${containerHeight}px`)
    },
    addSpacerRow () { // inserts extra row to allow last bottom page spacing not to increade all row height
      if (this.dataTable.rows) {
        this.dataTable.insertRow(this.dataTable.rows.length)
      }
    }
  }
}
</script>
<style lang="scss">
  @import '~@/assets/oms-scroller';

  .invisible {
    visibility: hidden
  }

  .scroll-row {
    bottom: 3vh;
    table {
      width: 98%;
    }
    &.scrollable {
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
</style>
