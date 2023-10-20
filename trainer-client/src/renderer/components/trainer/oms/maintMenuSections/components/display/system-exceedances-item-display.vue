<template>
<div class="row">
  <table class="maint-menu-display-list">
    <tr>
      <td rowspan="3" v-if="bullet">
        <span class="maint-menu-display-list-bullet" v-show="!editMode"></span>
        <span class="maint-menu-display-list-edit" v-show="editMode" @click.stop="editItem()"></span>
        <span class="maint-menu-display-list-delete" v-show="editMode" @click.stop="deleteItem()"></span>
      </td>
      <td class="larger">
        <span class="table-text-shaded">Name: </span><span class="uppercase">{{item.cas}}</span>
      </td>
      <td :inner-html.prop="item.date | date"></td>
    </tr>
    <tr>
      <td>
        <span class="table-text-shaded">Threshold: </span>{{item.threshold}}</td>
      <td>
        <span class="table-text-shaded">Flight Phase: </span> {{item.flightPhase}}
      </td>
    </tr>
    <tr>
      <td>
        <span class="table-text-shaded">Flight Leg: </span>{{item.flightLeg}}
        <span class="table-text-shaded">Peak: </span>{{item.peak}}
      </td>
      <td>
        <span class="table-text-shaded">Duration: </span>{{item.duration}}<span class="table-text-shaded right">{{item.uom}}</span>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  name: 'systemexceedancesitemdisplay',
  props: {
    item: {
      type: Object
    },
    bullet: {
      type: Boolean,
      default: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted () {

  },
  methods: {
    editItem () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'systemexceedances', 'title': this.title, 'data': this.item, 'action': 'edit' })
    },
    deleteItem () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'systemexceedances', 'title': this.title, 'data': this.item, 'action': 'delete' })
    }
  }
}
</script>

<style scoped>
  .larger {
    width: 60% !important;
  }
</style>
