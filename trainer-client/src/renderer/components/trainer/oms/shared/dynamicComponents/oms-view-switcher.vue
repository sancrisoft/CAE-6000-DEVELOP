 <template>
  <div :id="id" class="wrapper view-switcher"
    @click.stop="toggle"
    :style="{height: wrapperHeight}"
    :class="{opened:opened, disabled:selectsDisabled, disabled:maintMenuDisabled}">
    <div class="label" :class="{downArrow: hasDownArrow}" :style="{width: size}">
      <span :class="{highlight: highlighted}" class="list-label">{{selectedLabel}}</span>
      <ul class="select-panel"
        :style="{width: listWidth}">
        <li class="select-panel-list" v-for="item in list"
          :key="item.id"
          :data-target="item.target"
          :class="{selected: item.selected}"
          @click.stop="changeView(item)"
          v-oms-disabled-item="isDisabled(item)">
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import omsSelectMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-select-base-mixin'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      selectsDisabled: false,
      maintMenuDisabled: false
    }
  },
  name: 'omsviewswitcher',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    componentListName: {
      type: String,
      required: true
    },
    componentListLabel: {
      type: String,
      default: ''
    },
    dynamicLabel: {
      type: Boolean,
      default: false
    },
    fixedSize: {
      type: Number,
      default: 25
    },
    highlight: {
      type: Boolean,
      default: false
    },
    downArrow: {
      type: Boolean,
      default: true
    }
  },
  mixins: [omsSelectMixin],
  mounted () {
    if (this.$props.componentListName === 'manageMenu') {
      this.$bus.$on('manageMenuToggle', () => {
        this.toggle()
      })
      this.$bus.$on('manageMenuSelect', (list, direction) => {
        this.selectItem(list, direction)
      })
    }

    this.$bus.$on('omsViewSwitcherAvailabilityState', (state) => {
      this.selectsDisabled = state
    })

    this.$bus.$on('maintMenuAvailabilityState', (state) => {
      if (this.$options.propsData.componentListName === 'maintMenu') {
        this.maintMenuDisabled = state
      }
    })

    this.$bus.$on('maintMenuSectionsAvailabilityState', (state) => {
      if (this.$options.propsData.componentListName === 'maintMenuSections') {
        this.maintMenuDisabled = state
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('manageMenuToggle')
    this.$bus.$off('manageMenuSelect')
    this.$bus.$off('omsViewSwitcherAvailabilityState')
    this.$bus.$off('maintMenuAvailabilityState')
  },
  computed: {
    ...mapState({
      manageMenuDisabledText: state => state.appContext.contextMenusLists.manageMenuDisabledText
    }),
    highlighted () {
      let isHighlighted = this.$options.propsData.highlight !== undefined ? this.$options.propsData.highlight : true
      return isHighlighted
    },
    size () {
      return this.$options.propsData.fixedSize + 'vh'
    },
    hasDownArrow () {
      let enabled = this.$options.propsData.downArrow !== undefined ? this.$options.propsData.downArrow : true
      return enabled
    },
    selected () {
      let list = this.$options.propsData.list
      if (this.$options.propsData.dynamicLabel && list) {
        let selected = list.filter(function (item) {
          if (item.selected) return item
        })[0]

        if (!selected) {
          selected = list.filter(function (item) {
            if (item.default) return item
          })[0]
        }

        return selected
      } else {
        return {
          label: this.$options.propsData.componentListLabel
        }
      }
    }
  },
  methods: {
    isDisabled (item) {
      return !item.enabled ? this.manageMenuDisabledText : ''
    },
    selectItem (_list, direction) {
      let list = [ ..._list ]
      let selectedIndex = list.findIndex((item) => {
        return item.selected
      })

      if (direction === 'next') {
        if (selectedIndex === list.length - 1) {
          selectedIndex = 0
        } else {
          selectedIndex = selectedIndex + 1
        }
      }

      if (direction === 'previous') {
        if (selectedIndex === 0) {
          selectedIndex = list.length - 1
        } else {
          selectedIndex = selectedIndex - 1
        }
      }
    },
    changeView (item) {
      if (item.enabled) {
        let obj = {
          component: this.componentListName,
          view: item.target
        }
        this.$emit('setView', obj)
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/oms-select';
@import '~@/assets/vars';
.wrapper {
  &.view-switcher {
    .label {
      text-transform: uppercase;
      padding: 0.75vh 0.2vh;

      .list-label {
        font-size: $default-large-text-size !important;
      }
      &.downArrow {
        padding-right: 3vh;
        &:after {
          top: 1.75vh;
        }
      }
    }

    .label:not(.downArrow) .list-label {
      padding: 0;
      display: flex;
      justify-content: center;
    }
    .select-panel {
      border-radius: 0;
      top: 0.5vh;
      .select-panel-list {
        font-size: $default-text-size !important
      }
    }
  }
}
</style>
