 <template>
  <div :id="id" class="wrapper"
    @click.stop="toggle"
    :style="{height: wrapperHeight}"
    :class="{opened:opened, disabled:disabled}">
    <div class="label downArrow" :style="{width: size}">
      <span class="highlight list-label">{{selectedLabel}}</span>
      <ul class="select-panel"
        :style="{width: listSize}">
        <li class="select-panel-list prev uppercase"
          v-if="prevShown"
          @click.stop="prev">{{prevLabel}}</li>
        <li class="select-panel-list" v-for="(item, index) in currentList"
        :key="index"
        :class="{disabled:disabledItem(item), selected: item.selected}"
        @click.stop="select(item, index)">{{item.label}}</li>
        <li class="select-panel-list next uppercase"
          v-if="nextShown"
          @click.stop="next">{{nextLabel}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import omsSelectMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-select-base-mixin'
import utils from '@/components/trainer/oms/shared/utils/oms-utils'
export default {
  data () {
    return {
      chunckedIndex: 0
    }
  },
  name: 'omsselect',
  mixins: [omsSelectMixin],
  computed: {
    prevLabel () {
      return (this.comboWidth < 5) ? '--' : 'Prev'
    },
    nextLabel () {
      return (this.comboWidth < 5) ? '--' : 'Next'
    },
    isChunked () {
      return this.chunked && this.list.length > this.maxChunckedItems
    },
    chunkedList () {
      return this.isChunked ? utils.chunk(this.list, this.maxChunckedItems) : []
    },
    currentList () {
      return this.isChunked ? this.chunkedList[this.chunckedIndex] : this.list
    },
    prevShown () {
      return this.isChunked && this.currentList && (this.chunckedIndex > 0)
    },
    nextShown () {
      return this.isChunked && this.currentList && (this.chunckedIndex < this.currentList.length) && this.currentList.length === this.maxChunckedItems
    }
  },
  props: {
    chunked: {
      type: Boolean,
      default: false
    },
    maxChunckedItems: {
      type: Number,
      default: 10
    }
  },
  methods: {
    select (item, index) {
      if (this.disabledItem(item)) {
        return
      }
      if (this.isChunked) {
        this.$emit(this.$options.propsData.eventName, this.chunkedList[this.chunckedIndex][index].id)
      } else {
        this.$emit(this.$options.propsData.eventName, this.list[index].id)
        this.$bus.$emit(this.$options.propsData.eventName, this.list[index].id)
      }
      this.opened = 0
    },
    prev () {
      this.chunckedIndex--
      this.opened = 1
    },
    next () {
      this.chunckedIndex++
      this.opened = 1
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/oms-select';

.wrapper {
  display: block;
  float: right
}

.prev, .next {
  position: relative;
  &:after {
    content: "";
    display: block;
    border: 0.8vh solid transparent;
    border-top-color: $default-text-color;
    position: absolute;
    top: 0.7vh;
    right: 0vh;
    transform: rotate(270deg);
  }
}
.prev:after {
  transform: rotate(90deg);
  right: 1vh;
}

</style>
