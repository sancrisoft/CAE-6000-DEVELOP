<template>
  <div class="wrapper" :class="{selected:selected}">
    <span class="oms-checkbox-item"></span>
    <slot name='oms-checkbox-item-name'></slot>
  </div>
</template>
<script>
export default {
  name: 'omscheckboxselector',
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<<style lang="scss" scoped>
@import '~@/assets/vars';

.wrapper {
  display: flex;
  display: flex;
  flex-flow: row;
}

.oms-checkbox-item {
    width: 1.5vh;
    height: 1.5vh;
    line-height: 1.5vh;
    display: inline-block;
    margin: 0 1vh 0 0;
    overflow: visible;
    background-image: url('~@/assets/static/svg/checkbox-unchecked.svg');
    background-size: contain;
  }

.selected {
  .oms-checkbox-item {
      background-image: url('~@/assets/static/svg/checkbox-checked.svg');
      background-size: contain;
    }
  .oms-checkbox-item-name {
    color: $hoverBlue
  }
}
</style>

