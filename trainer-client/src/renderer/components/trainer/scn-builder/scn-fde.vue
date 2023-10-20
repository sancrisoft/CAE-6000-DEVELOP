<template>
  <div class="scnFde">
    <form class="scnEditForm no-margin" @submit.stop="saveEditor()">

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Category:</span>
        <span>
          <select v-model="item.category" @change="change('category')">
            <option value="SHOW_ALL_OPTIONS">All</option>
            <option v-for="category in editStore.categories" v-bind:value="category" >{{ category }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Name:</span>
        <span>
          <select v-model="item.casid" @change="item.faults = null">
            <option v-for="cas in casesFilteredByCategory" v-bind:value="cas.id" >{{ cas.name }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Faults:</span>
        <span>
           <v-select multiple v-model="item.faults" :options="faultsFilteredByCas" class="v-select"></v-select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Phase of Flight:</span>
        <span>
          <select v-model="item.phase">
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
            <option v-for="occurence in editStore.occurences" v-bind:value="occurence">{{ occurence }}</option>
          </select>
        </span>
      </div>

      <div class="row flex-start">
        <span class="text-shaded scnEditLabel">Flight Leg:</span>
        <span>
          <select v-model="item.fl">
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
      let formDefaults = {
        category: 'SHOW_ALL_OPTIONS',
        casid: ''
      }

      this.editData.data = Object.assign({}, formDefaults, this.editData.data)

      return {
        formDefaults,
        item: this.editData.data
      }
    },
    name: 'scnFde',
    components: {
    },
    computed: {
      ...mapState({
        editStore: state => state.appContext.omsViewPort.data.edit
      }),
      casesFilteredByCategory () {
        let categoriesToInclude = this.item.category === 'SHOW_ALL_OPTIONS' ? this.editStore.categories.map(categoryObj => categoryObj) : [this.item.category]

        let filteredCases = this.editStore.cases.filter(cas => {
          return categoriesToInclude.indexOf(cas.category) !== -1
        })

        if (filteredCases.length === 1) {
          this.$nextTick(function () {
            this.item.casid = filteredCases[0].id
          })
        }

        return filteredCases
      },
      faultsFilteredByCas () {
        return this.editStore.faults.filter(fault => {
          return fault.casid === this.item.casid
        })
      }
    },
    methods: {
      change (key) {
        switch (key) {
          case 'category':
            Object.assign(this.item, {
              casid: this.formDefaults.casid
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
