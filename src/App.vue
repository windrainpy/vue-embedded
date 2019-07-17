<template>
  <div class="m-app">
    <div class="m-container-header">
      <m-header />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from './components/MHeader'

export default {
  name: 'app',
  components: {
    MHeader
  }
}
</script>

<style lang="sass" scoped>
.m-app
  background: url('./assets/images/bg-body.jpg') no-repeat center 80px
  min-height: 1080px
  .m-container-header
    background: url('./assets/images/bg-header.jpg') no-repeat center top
    height: 80px
</style>