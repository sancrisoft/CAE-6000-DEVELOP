export default {
  name: 'omsscrollablemixin',
  mounted () {
    this.setScroll()
  },
  methods: {
    toggle (e, item) {
      this.toggleListIcon(e)
      this.toggleChild(e)
    },
    toggleChild: (el) => {
      let listItem = null
      if (el.target) {
        listItem = el.target.nextElementSibling
      } else {
        listItem = el
      }

      if (listItem) {
        let isCollapsed = listItem.classList.contains('collapsed')
        let isExpanded = listItem.classList.contains('expanded')
        if (isCollapsed) {
          listItem.classList.replace('collapsed', 'expanded')
        } else if (isExpanded) {
          listItem.classList.replace('expanded', 'collapsed')
        }
      }
    },
    toggleListIcon: function (e) {
      let span = e.target
      let isCollapsed = span.classList.contains('expandable')
      let isExpanded = span.classList.contains('collapsible')
      if (isCollapsed) {
        span.classList.replace('expandable', 'collapsible')
        this.setScroll()
      } else if (isExpanded) {
        span.classList.replace('collapsible', 'expandable')
        this.setScroll()
      }
    },
    setScroll () {
      this.$bus.$emit('omsScrollable-setScroll')
    },
    toggleRows (e) {
      this.toggleListIcon(e)
      let childs = e.currentTarget.querySelectorAll('.child-row')
      Array.from(childs).forEach((el) => {
        this.toggleChild(el)
      })
    },
    ignoreToggle () {
      return false
    },
    expandAll () {
      this.$el.querySelectorAll('.expandable').forEach((item) => {
        item.classList.replace('expandable', 'collapsible')
      })
      this.$el.querySelectorAll('.collapsed').forEach((item) => {
        item.classList.replace('collapsed', 'expanded')
      })
      this.setScroll()
    },
    collapseAll () {
      this.$el.querySelectorAll('.collapsible').forEach((item) => {
        item.classList.replace('collapsible', 'expandable')
      })
      this.$el.querySelectorAll('.expanded').forEach((item) => {
        item.classList.replace('expanded', 'collapsed')
      })
      this.setScroll()
    }
  }
}
