<template>
<div class="row" :data-itemId="item.id" :data-target="item.target">
  <table class="maint-menu-display-list">
    <tr>
      <td rowspan="2" v-if="bullet"><span class="maint-menu-display-list-bullet"></span></td>
      <td class="larger">{{item.cas}}</td>
      <td :inner-html.prop="item.date | date"></td>
    </tr>
    <tr>
      <td><span class="table-text-shaded">Category: </span>{{item.category}} <span class="table-text-shaded">Number of faults:</span> {{item.totalFaults}}
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
    }
  }
}
</script>

