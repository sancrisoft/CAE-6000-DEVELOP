<template>
<div class="row" :data-itemId="item.id" :data-target="item.target">
  <table class="maint-menu-display-list">
    <tr>
      <td rowspan="3" v-if="bullet">
        <span class="maint-menu-display-list-bullet" v-show="!editMode"></span>
        <span class="maint-menu-display-list-edit" v-show="editMode" @click.stop="editItem()"></span>
        <span class="maint-menu-display-list-delete" v-show="editMode" @click.stop="deleteItem()"></span>
      </td>
      <td rowspan="2" class="larger">{{item.cas}}</td>
      <td><span class="table-text-shaded">ATA: </span><span>{{item.ata}}</span></td>
    </tr>
    <tr>
      <td :inner-html.prop="item.date | date"></td>
    </tr>
    <tr v-if="item.flightLeg">
      <td><span class="table-text-shaded">Flight Leg: </span>{{item.flightLeg}}</td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  name: 'faultmessagesitemdisplay',
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
    },
    parentPage: {
      type: Number,
      default: 1
    }
  },
  mounted () {

  },
  methods: {
    editItem () {
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'faultmessages', 'title': this.title, 'data': this.item, 'action': 'edit' })
    },
    deleteItem () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'faultmessages', 'title': this.title, 'data': this.item, 'action': 'delete' })
    }
  }
}
</script>
