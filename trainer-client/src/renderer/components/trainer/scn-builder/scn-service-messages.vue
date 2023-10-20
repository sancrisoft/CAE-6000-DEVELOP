<template>
  <div class="scnServiceMessages">
    <form class="scnEditForm no-margin" @submit.stop="saveEditor()">

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">ATA Name:</span>
        <span>
          <select v-model="item.ata" @change="change('ata')">
            <option value="SHOW_ALL_OPTIONS">All</option>
            <option v-for="ata in editStore.atas" v-bind:value="ata.key" >{{ ata.label }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">LRU:</span>
        <span>
          <select v-model="item.lru" @change="change('lru')">
            <option value="SHOW_ALL_OPTIONS">All</option>
            <option v-for="lru in lrusFilteredByAtas" v-bind:value="lru.key" >{{ lru.label }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Service Message:</span>
        <span>
          <select v-model="item.eqid">
            <option v-for="fault in messagesFilteredByLrus" v-bind:value="fault.value" >{{ fault.label }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Phase of Flight:</span>
        <span>
          <select v-model="item.flightPhase">
            <option v-for="phase in editStore.phases" v-bind:value="phase" >{{ phase }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Status:</span>
        <span>
          <input type="checkbox" v-model="item.status" />
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Occurences:</span>
        <span>
          <select v-model="item.occurences">
            <option v-for="occurence in editStore.occurences" v-bind:value="occurence" >{{ occurence }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Flight Leg:</span>
        <span>
          <select v-model="item.flightLeg">
            <option v-for="fl in editStore.fls" v-bind:value="fl" >{{ fl }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Date:</span>
        <span>
          <input v-model="item.date" />
          <br><span class="flex-start formHelperLabel">Date format: 12AUG2018 20:33</span>
        </span>
      </div>

    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      console.log(this.editData.data)
      console.log('------------------------------')
      console.log(this.editStore)

      let formDefaults = {
        ata: 'SHOW_ALL_OPTIONS',
        lru: 'SHOW_ALL_OPTIONS',
        eqid: ''
      }

      this.editData.data = Object.assign({}, formDefaults, this.editData.data)

      return {
        formDefaults,
        item: this.editData.data
      }
    },
    name: 'scnServiceMessages',
    components: {
    },
    computed: {
      ...mapState({
        editStore: state => state.appContext.omsViewPort.data.edit
      }),
      lrusFilteredByAtas () {
        let atasToInclude = this.item.ata === 'SHOW_ALL_OPTIONS' ? this.editStore.atas.map(ataObj => ataObj.key) : [this.item.ata]

        let filteredLrus = this.editStore.lrus.filter(lru => {
          return atasToInclude.indexOf(lru.ata) !== -1
        })

        if (filteredLrus.length === 1) {
          this.$nextTick(function () {
            this.item.lru = filteredLrus[0].key
          })
        }

        return filteredLrus
      },
      messagesFilteredByLrus () {
        let lrusToInclude = this.item.lru === 'SHOW_ALL_OPTIONS' ? this.lrusFilteredByAtas.map(lruObj => lruObj.key) : [this.item.lru]

        let filteredMessages = this.editStore.messages.filter(message => {
          return lrusToInclude.indexOf(message.lruid) !== -1
        })

        if (filteredMessages.length === 1) {
          this.$nextTick(function () {
            this.item.eqid = filteredMessages[0].value
          })
        }

        return filteredMessages
      }
    },
    methods: {
      change (key) {
        switch (key) {
          case 'ata':
            Object.assign(this.item, {
              lru: this.formDefaults.lru,
              eqid: this.formDefaults.eqid
            })
            break
          case 'lru':
            Object.assign(this.item, {
              eqid: this.formDefaults.eqid
            })
            break
        }
      }
    },
    props: {
      editData: {
        type: Object
      }
    }
  }
</script>
