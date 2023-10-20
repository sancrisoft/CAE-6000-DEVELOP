
<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="add-button-container" v-if="editMode">
      <div class="flex-center">
        <div id="save" class="btn" @click.stop="addItem()">Add new item</div>
      </div>
    </div>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div esle class="row">
      <maintmenu-sorted-datalist-selectors
        :view="false"
        :sort="true">
      </maintmenu-sorted-datalist-selectors>
      <maint-menu-pager-list-display
        :current="currentPage"
        :pages="totalPages">
        <div class="flex-justified header" slot="pagerHeaderContent">
          <div class="table-text-shaded name">Name</div>
          <div class="table-text-shaded flightLeg">Flight Leg</div>
          <div class="table-text-shaded flightPhase">Flight Phase</div>
          <div class="table-text-shaded date">Date</div>
          <oms-paging-counter
            counterName="MaintmenuPagerList">
          </oms-paging-counter>
        </div>
      </maint-menu-pager-list-display>
      <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
      <maintmenu-sorted-datalist v-else
        @omsKnobIncrease="nextPage"
        @omsKnobDecrease="previousPage">
        <div slot="maint-data-table-content">
          <li class="hoverable-list-item" v-for="item in sortedPage"
            :key="item.id"
            @click.stop="switchView(item.id)">
              <div>
                <span class="hoverable-list-item-bullet" v-show="!editMode"></span>
                <span class="hoverable-list-item-edit" v-show="editMode" @click.stop="editItem(item)"></span>
                <span class="hoverable-list-item-delete" v-show="editMode" @click.stop="deleteItem(item)"></span>
              </div>
              <div class="flex-justified enlarge">
                <div class="name">{{item.name}}</div>
                <div class="flightLeg">{{item.flightLeg}}</div>
                <div class="flightPhase">{{item.flightPhase}}</div>
                <div class="date text-right" :inner-html.prop="item.date | date"></div>
              </div>
          </li>
        </div>
      </maintmenu-sorted-datalist>
    </div>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'

export default {
  data () {
    return {
      maxItemsPerPage: 15
    }
  },
  name: 'systemtrends',
  mixins: [baseView],
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addItem () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'systemtrends', 'title': this.title, 'data': {}, 'action': 'add' })
    },
    editItem (item) {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'systemtrends', 'title': this.title, 'data': item, 'action': 'edit' })
    },
    deleteItem (item) {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'systemtrends', 'title': this.title, 'data': item, 'action': 'delete' })
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/vars';
.hoverable-list {
  margin-top: 1vh;
}
.hoverable-list-item-table {
  float: left;
  width: 95%;

  .text-right {
    text-align: right
  }
}
.enlarge {
  width: 93%
}
.header {
  .name {
    margin-left: 3vh;
  }

  .date {
    min-width: 10%;
  }
}
.name, .date {
  min-width: 35%;
}
.flightLeg, .flightPhase {
  min-width: 15%;
}
.counter {
  padding-left: 3.5vh
}
</style>
