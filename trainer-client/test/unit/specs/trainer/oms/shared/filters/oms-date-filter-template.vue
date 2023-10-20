<template>
  <div>
     <span :inner-html.prop="lastFlightLeg | DDMMYYYY"></span>
     <span :inner-html.prop="date | date"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lastFlightLeg: 'Apr 30 2015 1:58 PM',
      date: 'Apr 30 2015 1:58 PM'
    }
  }
}
</script>

