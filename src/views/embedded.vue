<template>
  <div>
    <div class="m-container-breadcrumb">
      <div class="breadcrumb">
        <span @click="back" class="active">
          <img src="../assets/images/btn-back.png" width="28" height="28">
          返回首页
        </span>
        <i class="point">·</i>
        <span>
          新浪微博植入
        </span>
      </div>
    </div>

    <div class="m-container-frame">
      <div class="guide step-1" v-if="currentStep === 1">
        <!-- to change -->
        <span class="stup-num" id="step_1" @click="loginSuccessHandler">1</span>
        <span class="desc">请登录微博帐号！</span>
        <el-button @click="nextStep" size="large" class="btn-white">下一步</el-button>
      </div>

      <div class="guide step-2" v-if="currentStep === 2">
        <span class="stup-num">2</span>
        <span class="desc">是否把新浪微博帐号绑定到小惠帐号“{{xiaohuiName}}”？ </span>
        <el-button @click="_binding" size="large" class="btn-white">确定绑定完成植入</el-button>
      </div>

      <div class="toolbar">
        <span class="btn-refresh" @click="refresh" :class="{'disabled': !pageLoaded}"></span>
      </div>
      <div class="webview-wrap" v-loading="loading">
        <iframe :src="loadUrl"
                @load="loaded"
                frameborder="0"
                name="frameEmbedded"
                id="frameEmbedded"
                width="100%"
                height="840"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import {triggerWebdriver, checkLoginStatus,
        getXiaohuiName, getXiaohuiId,
        binding} from '../api/embedded'

export default {
  name: 'embedded',
  data() {
    return {
      loading: false,
      pageLoaded: false,
      toolbarShowing: false,
      disableNext: true,
      currentStep: 1,

      driverId: '',
      xiaohuiId: '',
      xiaohuiName: '15899958048',
      loadUrl: 'https://weibo.com',
    }
  },
  beforeRouteEnter(to, from, next) {
    const mapping = {
      'weibo': 'https://weibo.com',
      'QQ': 'https://www.qq.com',
      'weixin': 'https://weixin.qq.com',
      'Facebook': 'http://facebook.com',
      'Twitter': 'http://twitter.com',
    }
    next(vm => {
      vm.loadUrl = mapping[to.query.appName]
    })
  },
  mounted() {
    // to change
    // this._checkLoginStatus()
  },
  methods: {
    /**
     * 让后端打开页面
     */
    openPage() {
      triggerWebdriver().then((res) => {
        this.driverId = res.data.entity
        window.localStorage.setItem('driverId', this.driverId)
        this._getXiaohuiId()
      })
    },
    /**
     * 获取小慧ID
     */
    _getXiaohuiId() {
      let data = {driverid: this.driverId}

      getXiaohuiId(data).then((data) => {
        this.xiaohuiId = data.entity
      })
    },
    /**
     * 轮询用户（扫码）的登录状态
     */
    _checkLoginStatus() {
      let data = {driverid: this.driverId}

      this.interval = setInterval(() => {
        checkLoginStatus(data).then((data) => {
          let loginState = data.entity
          // 登录成功
          if(loginState) {
            clearInterval(this.interval)
            this._getXiaohuiName()
          }
        })
      }, 5000)
    },
    /**
     * 获取小慧帐号用户名，进入下一步
     */
    _getXiaohuiName() {
      let data = {driverid: this.driverId}

      getXiaohuiName(data).then((data) => {
        this.xiaohuiName = data.entity
        this.currentStep = 2
      })
    },
    /**
     * 完成绑定小慧帐号
     */
    _binding() {
      let data = {
        driverid: this.driverId,
        xiaohui: this.xiaohuiId
      }

      // to change
      this.$router.push({
        path: '/finish'
      })

      // binding().then((data)=> {
      //   this.$router.push({
      //     path: '/finish'
      //   })
      // })
    },
    /**
     * 显示登录成功提示框
     */
    loginSuccessHandler() {
      this.$message({
        message: '微博登录成功',
        type: 'success',
        // duration: 0
      })
      this.currentStep = 2
      this.disableNext = false
    },
    /**
     * iframe加载完毕事件
     */
    loaded() {
      this.loading = false
      this.pageLoaded = true
    },
    /**
     * 点击刷新
     */
    refresh() {
      this.loading = true
      this.toolbarShowing = true
      this.pageLoaded = false
    },
    /**
     * 点击下一步
     */
    nextStep() {
      if(this.currentStep === 1) {
        this.$message({
          message: '请登录微博帐号',
          type: 'error',
          // duration: 0
        })
      }
    },
    /**
     * 返回首页
     */
    back() {
      this.$router.push({
        path: '/'
      })
    },
  }
}
</script>

<style lang="sass" scoped>
.m-container-frame
  min-height: 450px

  .guide
    text-align: center
    line-height: 30px
    margin: 25px 0
    color: #fff

    .stup-num
      font-size: 22px
      font-weight: bold
      background: #ffffff
      color: #26a3a7
      width: 32px
      height: 32px
      line-height: 32px
      display: inline-block
      border-radius: 50%
      margin: 0 12px 0 0
    

    .desc
      font-size: 22px
      margin: 0 10px 0 0

    button
      position: relative
      top: -3px

  .webview-wrap
    margin: 0 0 0 0
    background: #fff

  .toolbar
    display: flex
    justify-content: center
    position: fixed
    z-index: 9999
    bottom: 30px
    right: 30px

    span
      width: 72px
      height: 72px
      display: flex
      justify-content: center
      align-items: center
      color: #fff
      cursor: pointer
      border-radius: 50%
      opacity: 0.7
      background: #168aad url('../assets/images/icon-refresh.png') no-repeat center

      &:hover
        opacity: 1
      &.disabled
        opacity: 0.2



</style>
