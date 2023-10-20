import { mapGetters } from 'vuex'
export default {
  name: 'omsknobhandle',
  computed: {
    ...mapGetters({
      selectedKnob: 'appContext/getSelectedKnob'
    })
  },
  methods: {
    prev () {
      if (this.selectedKnob) {
        this.$bus.$emit(`omsKnob-decrease${this.selectedKnob.name}PagingCounter`)
      }
    },
    next () {
      if (this.selectedKnob) {
        this.$bus.$emit(`omsKnob-increase${this.selectedKnob.name}PagingCounter`)
      }
    }
  }
}
