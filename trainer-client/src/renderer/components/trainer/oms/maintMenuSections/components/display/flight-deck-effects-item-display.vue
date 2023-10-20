<template>
<div class="row">
  <table class="maint-menu-display-list">
    <tr>
      <td v-if="bullet">
        <span class="maint-menu-display-list-bullet" v-show="!editMode"></span>
        <span class="maint-menu-display-list-edit" v-show="editMode" @click.stop="editItem()"></span>
        <span class="maint-menu-display-list-delete" v-show="editMode" @click.stop="deleteItem()"></span>
      </td>
      <td  class="larger">
        <span class="uppercase">{{item.cas}}</span>
      </td>
      <td class="right" :inner-html.prop="item.date | date"></td>
    </tr>
    <tr>
      <td v-if="bullet"></td>
      <td colspan="2">
        <span class="table-text-shaded">Category: </span><span>{{item.category}}</span>
        <span class="table-text-shaded">Number of faults: </span><span>{{item.totalFaults}}</span>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  name: 'flightdeckeffectsitemdisplay',
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
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'fde', 'title': this.title, 'data': this.item, 'action': 'edit' })
    },
    deleteItem () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'fde', 'title': this.title, 'data': this.item, 'action': 'delete' })
    }
  }
}
</script>
