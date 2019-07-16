<template>
  <el-row class="m-header">
    <el-col :span="18">
      <div class="logo">
        <img src="../../static/images/logo.png" alt="小慧硬植入" width="40" height="42">
        小慧硬植入
      </div>
    </el-col>
    <el-col :span="6">
      <el-input 
        v-model="keyword"
        placeholder="搜索植入应用"
        size="large"
        class="input-search">
        <i slot="suffix" class="input-icon"></i>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="sass" scope>
.m-header
  height: 100px
  padding: 25px 20px
  .logo
    font-size: 20px
    line-height: 40px
    img
      vertical-align: middle

  .input-search
    
    .input-icon
      width: 20px
      height: 20px
      background: url('../../static/images/icon-search.png') no-repeat
      display: inline-block
      margin: 10px 5px 0 0
</style>