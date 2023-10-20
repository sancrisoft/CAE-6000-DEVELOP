import viewBtnsMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      availabilityState: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      parentComponentName: state => state.appContext.omsViewPort.parentComponentName
    })
  },
  mixins: [viewBtnsMixin],
  methods: {
    setAvailabilityState (state) {
      this.availabilityState = state
    },
    viewBackBtnClicked () {
      // The back button is only available if the user has already entered the utility function password beforehand, so assume they are still authenticated. (REF 7e486e1b-572f-4033-9d5d-9016a208f227)
      this.$store.dispatch('appContext/setUtilityFunctionsValidPassword', true)

      this.$bus.$emit('switchView', { component: 'maintMenuSections', view: (this.parentComponentName) })
    }
  }
}
