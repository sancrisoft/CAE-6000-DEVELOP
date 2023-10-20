<template>
  <div class="trainer-layout">
    <div id="ui-wrapper">
      <asidemenu></asidemenu>
      <section>
        <div class="trainer-layout-wrapper" :class="{ editMode: editMode }">
          <disclaimer v-if="disclaimerShown"></disclaimer>
          <about v-if="aboutShown"></about>
          <div class="trainer-layout-column left">
            <div class="inner-container top">
              <dashboard></dashboard>
            </div>
            <div class="inner-container bottom">
              <div class="demo-text-box" v-html="demoFormatedText"></div>
            </div>
          </div>
          <div class="trainer-layout-column right">
            <div class="inner-container full">
              <oms :editMode="editMode"></oms>
            </div>
          </div>
        </div>
        <scnBuilderEdit v-if="scnBuilderEditShown" :editData="editData"></scnBuilderEdit>
        <scnBuilderConfirm v-if="scnBuilderConfirmShown" :confirmData="confirmData"></scnBuilderConfirm>
      </section>
    </div>
  </div>
</template>

<style scoped>
hr {
  border: 2px solid #ddd;
  border-radius: 2px;
}

div#ui-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100vh;
}

section {
  position: relative;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  background: radial-gradient(ellipse at center, #4c4c4c 0%, #2b2b2b 58%, #2b2b2b 73%, #1c1c1c 91%, #131313 100%);
}
section svg {
  height: 100%;
  width: 100%;
}
.inner-container.top {
  height:80vh;
}
.inner-container.bottom {
  height:20vh !important;
  text-align: center;
}
.demo-text-box {
  font-size: smaller;
  margin: 10px;
  padding: 10px;
  border: 1px solid red;
  color: red;
}
</style>

<script>
import oms from '@/components/trainer/oms/oms-layout-container'
import asidemenu from '@/components/trainer/asidemenu'
import dashboard from '@/components/trainer/dashboard/dashboard-layout'
import disclaimer from '@/components/trainer/disclaimer'
import about from '@/components/trainer/about'
import scnBuilderEdit from '@/components/trainer/scn-builder-edit'
import scnBuilderConfirm from '@/components/trainer/scn-builder-confirm'
import { mapState } from 'vuex'
export default {
  name: 'trainer-layout',
  data () {
    return {
      aboutShown: false,
      disclaimerShown: true,
      scnBuilderEditShown: false,
      scnBuilderConfirmShown: false,
      editMode: false,
      editData: {},
      confirmData: {}
    }
  },
  mounted () {
    this.editMode = this.storeEditMode
    console.log('initial:' + this.$store.state.appContext.appConfig.editMode)
    this.$bus.$on('toggleAbout', () => {
      this.toggleAbout()
    })
    this.$bus.$on('toggleDisclaimer', () => {
      this.toggleDisclaimer()
    })
    this.$bus.$on('openScnBuilder', () => {
      this.toggleEditMode(true)
    })
    this.$bus.$on('closeScnBuilder', () => {
      this.closeScnBuilderEdit()
      this.toggleEditMode(false)
    })
    this.$bus.$on('openScnBuilderEdit', (data) => {
      this.editData = Object.assign(
        {
          'type': '',
          'title': '',
          'data': {},
          'attributes': {
            noSave: false
          },
          'action': ''
        },
        data
      )
      this.openScnBuilderEdit()
    })
    this.$bus.$on('closeScnBuilderEdit', () => {
      this.closeScnBuilderEdit()
    })
    this.$bus.$on('openScnBuilderConfirm', (data) => {
      this.confirmData = data
      this.openScnBuilderConfirm()
    })
    this.$bus.$on('closeScnBuilderConfirm', () => {
      this.closeScnBuilderConfirm()
    })
  },
  beforeDestroy () {
    this.$bus.$off('toggleAbout')
    this.$bus.$off('toggleDisclaimer')
    this.$bus.$off('openScnBuilder')
    this.$bus.$off('closeScnBuilder')
    this.$bus.$off('openScnBuilderEdit')
    this.$bus.$off('closeScnBuilderEdit')
    this.$bus.$off('openScnBuilderConfirm')
    this.$bus.$off('closeScnBuilderConfirm')
  },
  computed: {
    ...mapState({
      disclaimerAccepted: state => state.appContext.disclaimerAccepted,
      demoFormatedText: state => state.appContext.appConfig.demoFormatedText,
      storeEditMode: state => state.appContext.appConfig.editMode
    })
  },
  components: {
    dashboard,
    oms,
    about,
    disclaimer,
    asidemenu,
    scnBuilderEdit,
    scnBuilderConfirm
  },
  methods: {
    toggleAbout () {
      if (this.disclaimerAccepted) {
        this.disclaimerShown = false
        this.scnBuilderShown = false
        this.aboutShown = !this.aboutShown
      }
    },
    toggleDisclaimer () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.scnBuilderShown = false
        this.disclaimerShown = !this.disclaimerShown
      }
    },
    openScnBuilder () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = true
      }
    },
    closeScnBuilder () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = false
      }
    },
    openScnBuilderEdit () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = false
        this.scnBuilderEditShown = true
        this.$store.state.appContext.appConfig.editMode = true
      }
    },
    closeScnBuilderEdit () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = false
        this.scnBuilderEditShown = false
        this.$store.state.appContext.appConfig.editMode = false
      }
    },
    openScnBuilderConfirm () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = false
        this.scnBuilderConfirmShown = true
        this.$store.state.appContext.appConfig.editMode = true
      }
    },
    closeScnBuilderConfirm () {
      if (this.disclaimerAccepted) {
        this.aboutShown = false
        this.disclaimerShown = false
        this.scnBuilderShown = false
        this.scnBuilderConfirmShown = false
        this.$store.state.appContext.appConfig.editMode = false
      }
    },
    toggleEditMode (mode) {
      this.editMode = mode && this.$store.state.appContext.appConfig.editMode
      console.log(mode + '=' + this.$store.state.appContext.appConfig.editMode)
    }
  }
}
</script>
