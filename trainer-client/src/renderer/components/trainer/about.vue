<template>
<transition name="bounce">
  <div class="modal-wrapper flex-center">
    <div class="about">
      <h1>About</h1>
      <p>{{projectDescription}}</p>
      <ul>
        <li>OMS Software Version: {{omsSoftwareVersion}}</li>
        <li>OMST Version: {{omstVersion}}</li>
        <li>OMSTAR Version: {{omstarVersion}}</li>
      </ul>
      <div class="flex-center">
        <div id="close" class="btn" @click.stop="closeAbout">Close</div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'about',
  computed: {
    ...mapState({
      projectDescription: state => state.appContext.appConfig.projectDescription,
      omsSoftwareVersion: state => state.appContext.appConfig.omsSoftwareversion,
      omstVersion: state => state.appContext.appConfig.omstVersion,
      omstarVersion: state => state.appContext.appConfig.omstarVersion,
      omsEQVersion: state => state.appContext.appConfig.omsEQVersion
    })
  },
  methods: {
    closeAbout () {
      this.$bus.$emit('toggleAbout')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/vars';
 .content {
  position: relative;
 }

 .about {
  width: 50%;
  font-size: 1.8vh;
  z-index: 999;
  padding: 1.36vh;
  background-color: white;
  z-index: 9999;
  color: black;
  border-radius: 2vh;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $default-text-color;
    background-color: $default-bg-color;
    border-radius: 0.45vh;
    width: 15vh;
    height: 5vh;
    cursor: pointer;
  }
 }
</style>
