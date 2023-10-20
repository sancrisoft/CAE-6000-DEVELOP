import utils from '@/components/trainer/oms/shared/utils/oms-utils'
import { mapGetters } from 'vuex'
export default {
  computed: {
    id () {
      return utils.getRandomId(this.$options.name)
    },
    ...mapGetters({
      selectedKnob: 'appContext/getSelectedKnob'
    }),
    knobOn () {
      return this.selectedKnob && this.selectedKnob.name.indexOf(this.id) > -1 && this.selectedKnob.status
    }
  },
  mounted () {
    this.$bus.$on(`omsKnob-decrease${this.id}PagingCounter`, () => {
      this.$emit('omsKnobDecrease')
    })
    this.$bus.$on(`omsKnob-increase${this.id}PagingCounter`, () => {
      this.$emit('omsKnobIncrease')
    })
  },
  beforeDestroy () {
    this.$bus.$off(`omsKnob-decrease${this.id}PagingCounter`)
    this.$bus.$off(`omsKnob-increase${this.id}PagingCounter`)
    this.$bus.$off('omsKnobs-reset')
  },
  methods: {
    setKnob (pages, location) {
      this.$store.dispatch('appContext/registerCurrentSelectedKnob', {
        name: this.id,
        status: true,
        pages: pages || 1,
        location: location || 'default'
      })
    }
  }
}
