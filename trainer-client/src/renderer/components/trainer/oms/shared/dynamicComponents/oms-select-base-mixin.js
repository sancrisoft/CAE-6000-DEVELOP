
import utils from '@/components/trainer/oms/shared/utils/oms-utils'
export default {
  name: 'omsselect',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    eventName: {
      type: String,
      default: ''
    },
    comboWidth: {
      type: Number,
      default: 25
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: false,
      wrapperHeight: 'auto',
      listWidth: 'auto'
    }
  },
  mounted () {
    document.body.addEventListener('click', () => {
      this.close()
    }, false)

    this.$bus.$on('oms-select.forceClose', (triggeringTargetId) => {
      if (triggeringTargetId !== this.id) {
        this.close()
      }
    })
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.close())
  },
  computed: {
    id () {
      return utils.getRandomId('oms-select')
    },
    size () {
      return this.comboWidth + 'vh'
    },
    listSize () {
      return (this.comboWidth < 5) ? 5 + 'vh' : this.comboWidth * 1.1 + 'vh'
    },
    selected () {
      let list = this.list
      let selected = list.filter(item => item.selected)
      if (selected.length) {
        return selected[0]
      } else {
        return { label: 'None Selected' }
      }
    },
    selectedLabel () {
      return this.selected && this.selected.label ? this.selected.label : ''
    }
  },
  methods: {
    disabledItem (item) {
      if (Object.getOwnPropertyNames(item).indexOf('enabled') === -1) {
        return false
      } else {
        return !item.enabled
      }
    },
    open () {
      this.$bus.$emit('oms-select.forceClose', this.id)
      let list = this.$el.querySelector('.select-panel')
      this.wrapperHeight = this.getWrapperHeight(list)
      this.listWidth = this.getListWidth(list)
      this.opened = true
    },
    close () {
      if (this.opened) {
        this.opened = false
        this.wrapperHeight = 'auto'
        this.listWidth = 'auto'
      }
    },
    getWrapperHeight (list) {
      let height = 25
      height += list.offsetHeight
      Array.from(list.children).forEach(function (child) {
        height += child.offsetHeight
      })
      return utils.pxTOvh(height)
    },
    getListWidth (list) {
      let longerLabelWidth = 0
      Array.from(list.children).forEach(function (child) {
        if (child.offsetWidth > longerLabelWidth) {
          longerLabelWidth = child.offsetWidth
        }
      })
      // TODO: get rid of document.getElementById
      let listWidth = document.getElementById(this.id).offsetWidth
      if (longerLabelWidth > listWidth) {
        return utils.pxTOvh(longerLabelWidth) + 0.25 + 'vh'
      } else {
        return utils.pxTOvh(listWidth) - 1 + 'vh'
      }
    },
    select (item, index) {
      if (this.disabledItem(item)) return
      this.$emit(this.$options.propsData.eventName, this.list[index].id)
    },
    toggle (event) {
      let isOpened = this.opened
      if (isOpened) {
        this.close()
      } else {
        this.open(event)
      }
    }
  }
}
