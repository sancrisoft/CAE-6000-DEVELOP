<template>
  <div class="wrapper">
     <slot name='headerContent'></slot>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/assets/vars';
.wrapper {
  width: 100%;
  height: 3.7vh;
  padding: 0 1vh;
  margin-right: 0.25vh;
  border: 0.09vh solid gray;
  border-radius: 0.45vh;
  box-sizing: border-box;
}
</style>

