<template>
<div class="row">
  <table class="maint-menu-display-list">
    <tr>
      <td rowspan="2" v-if="bullet">
        <span class="maint-menu-display-list-bullet" v-show="!editMode"></span>
        <span class="maint-menu-display-list-edit" v-show="editMode" @click.stop="editItem()"></span>
        <span class="maint-menu-display-list-delete" v-show="editMode" @click.stop="deleteItem()"></span>
      </td>
      <td rowspan="2" class="larger">{{item.cas}}</td>
      <td><span class="table-text-shaded">ATA: </span><span :class="{right: !bullet}">{{item.ata}}</span></td>
    </tr>
    <tr>
      <td :inner-html.prop="item.date | date"></td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  name: 'servicemessagesitemdisplay',
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
      this.$bus.$emit('openScnBuilderEdit', { 'type': 'servicemessages', 'title': this.title, 'data': this.item, 'action': 'edit' })
    },
    deleteItem () {
      this.$bus.$emit('openScnBuilderConfirm', { 'type': 'servicemessages', 'title': this.title, 'data': this.item, 'action': 'delete' })
    }
  }
}
</script>
