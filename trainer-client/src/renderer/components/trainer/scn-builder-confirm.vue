<template>
  <transition name="bounce">
    <div class="modal-wrapper flex-center">
      <div class="scnBuilderModal confirmModal">
        <h1>{{ confirmData.action.toUpperCase() }} {{ confirmData.title }}</h1>

        <div class="flex-center sb-content">
          <span v-if="isConfirmNotice">{{confirmData.message}}</span>

          <scnDelScn v-if="scnDelScnShown" :confirmData="confirmData"></scnDelScn>
        </div>

        <div class="flex-center sb-menu">
          <div class="flex-center" v-show="!isConfirmNotice">
            <div id="save" class="btn" @click.stop="yes()">YES</div>
          </div>
          <div class="flex-center">
            <div id="close" class="btn" @click.stop="no()">{{!isConfirmNotice ? 'NO' : 'OK'}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import scnDelScn from '@/components/trainer/scn-builder/scn-del-scn'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        scnDelScnShown: false
      }
    },
    name: 'scnBuilderConfirm',
    components: {
      scnDelScn
    },
    computed: {
      ...mapState({
        editStore: state => state.appContext.omsViewPort.data.edit
      }),
      isConfirmNotice () {
        return this.confirmData.type === 'confirmNotice'
      }
    },
    mounted () {
      this.$bus.$on('deleteScn', () => {
        this.deleteScn()
      })

      let targetName = this.confirmData.type || ''
      switch (targetName) {
        case 'deleteScn' : this.deleteScn()
          break
      }
    },
    beforeDestroy () {
      this.$bus.$off('deleteScn')
    },
    methods: {
      yes () {
        if (this.confirmData.callback) {
          this.confirmData.callback()
        } else {
          var obj = { name: 'scn' + this.confirmData.type, data: this.confirmData.data, action: this.confirmData.action }
          this.$store.dispatch('appContext/postSBContent', obj)
            .then((response) => {
              if (response.data.data.status !== 'OK') {
                this.$bus.$emit('openScnBuilderConfirm', { 'type': 'confirmNotice', 'title': 'Error', 'message': response.data.data.status, 'action': '' })
              } else {
                // Call switchView() to reload view after the data has changed. (REF fe7242fd-7dc0-4d52-970e-6a55954fa351)
                this.$bus.$emit('switchView', { reloadView: true })
              }
            })
        }

        this.$bus.$emit('closeScnBuilderConfirm')
      },
      no () {
        this.$bus.$emit('closeScnBuilderConfirm')
      },
      closeAll () {
        this.$bus.$emit('closeScnBuilderEdit')

        this.scnDelScnShown = false
      },
      deleteScn () {
        this.closeAll()
        this.scnDelScnShown = true
      }
    },
    props: {
      confirmData: {
        type: Object
      }
    }
  }
</script>
