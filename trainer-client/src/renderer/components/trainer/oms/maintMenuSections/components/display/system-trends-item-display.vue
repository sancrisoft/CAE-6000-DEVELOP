<template>
<div class="row">
    <table class="maint-menu-display-list">
    <tr>
      <td colspan="3">
        <span class="table-text-shaded">Name: </span><span class="uppercase">{{item.name}}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span class="table-text-shaded">Flight Leg: </span>{{item.threshold}}</td>
      <td>
        <span class="table-text-shaded">Flight Phase: </span> {{item.flightPhase}}
      </td>
      <td :inner-html.prop="item.date | date"></td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  name: 'systemtrendsitemdisplay',
  props: {
    item: {
      type: Object
    },
    bullet: {
      type: Boolean,
      default: true
    }
  }
}
</script>
