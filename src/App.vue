<template>
  <el-container class="container">
    <el-header class="m-header-wrap">
      <m-header />
    </el-header>
    <el-main class="m-main">
      <router-view></router-view>
    </el-main>
  </el-container>
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

<style lang="sass" scope>
.container
  background: #eff3f5
  
  .m-header-wrap
    background: #fff
    padding: 0
    height: 90px!important
  
  .m-main
    padding: 0
</style>