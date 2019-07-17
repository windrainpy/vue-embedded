<template>
  <div class="m-header">
    <el-row>
      <el-col :span="18">
        <div class="logo" @click="tohome">
          <img src="../assets/images/logo.png" alt="小慧硬植入" width="40" height="42">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    tohome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="sass">
.m-header
  padding: 18px 20px
  color: #fff
  max-width: 1200px
  margin: 0 auto

  .logo
    font-size: 22px
    line-height: 40px
    img
      vertical-align: middle

  .input-search
    
    input
      background: transparent
      border: 1px solid #1a807c
      border-radius: 6px
    input::-webkit-input-placeholder
      color: #1a807c
    
    .input-icon
      width: 20px
      height: 20px
      background: url('../assets/images/icon-search.png') no-repeat
      display: inline-block
      margin: 10px 5px 0 0
</style>