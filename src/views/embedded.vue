<template>
  <div class="embedded">
    <div class="breadcrumb">
      <span @click="back" class="active">
        <img src="../../static/images/btn-back.png" width="28" height="28">
        返回首页
      </span>
      <i class="point">·</i>
      <span>
        新浪微博植入
      </span>
    </div>

    <div class="guide step-1" v-if="currentStep === 1">
      <!-- to change -->
      <span class="stup-num" id="step_1" @click="loginSuccessHandler">1</span>
      <span class="desc">打开微博并登录微博帐号！</span>
      <el-button @click="openFrame" type="primary" size="">打开微博</el-button>
      <el-button @click="nextStep" type="primary" :disabled="disableNext" size="">下一步</el-button>
    </div>

    <div class="guide step-2" v-if="currentStep === 2">
      <span class="stup-num">2</span>
      <span class="desc">是否把新浪微博帐号绑定到小惠帐号“{{xiaohuiName}}”？ </span>
      <el-button @click="binding" type="primary" size="">确定绑定完成植入</el-button>
    </div>

    <div class="toolbar" :class="{'fixed': !pageShowing}" v-if="toolbarShowing">
      <span class="btn-toggle" @click="pageShowing = !pageShowing">
        <i :class="{'open': !pageShowing}"></i>
      </span>
      <span class="btn-refresh" @click="refresh" :class="{'disabled': !pageLoaded}"><i></i></span>
    </div>
    <div class="webview-wrap" v-loading="loading" :class="{'show': pageShowing}">
      <iframe :src="loadUrl"
              @load="loaded"
              frameborder="0"
              name="frameEmbedded"
              id="frameEmbedded"
              width="100%"
              height="500"></iframe>
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
      pageShowing: false,
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

      binding().then((data)=> {
        this.$router.push({
          path: '/finish'
        })
      })
    },
    /**
     * iframe加载完毕事件
     */
    loaded() {
      this.loading = false
      this.pageLoaded = true
    },
    /**
     * 打开iframe
     */
    openFrame() {
      this.loading = true
      this.pageShowing = true
      this.toolbarShowing = true
      this.pageLoaded = false
    },
    /**
     * 显示登录成功提示框
     */
    loginSuccessHandler() {
      this.$notify({
        message: '微博登录成功',
        type: 'success'
      });
      this.currentStep = 2
      this.disableNext = false
    },
    /**
     * 点击下一步
     */
    nextStep() {
      this.currentStep = 2
    },
    /**
     * 点击刷新
     */
    refresh() {
      this.openFrame()
    },
    /**
     * 返回首页
     */
    back() {
      this.$router.push({
        path: '/'
      })
    },
    binding() {
    },
    /**
     * 完成绑定，跳转页面
     */
    finish() {
      this.$router.push({
        path: '/finish'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.embedded
  min-height: 450px

  .guide
    text-align: center
    line-height: 30px
    margin: 40px 0 0 0

    .stup-num
      font-size: 20px
      font-weight: bold
      background: #ff5716
      color: #fff
      width: 30px
      height: 30px
      line-height: 30px
      display: inline-block
      border-radius: 50%
      margin: 0 5px 0 0
    

    .desc
      font-size: 20px
      margin: 0 10px 0 0

    button
      position: relative
      top: -3px

  .webview-wrap
    margin: 0 0 0 0
    background: #fff
    opacity: 0

    &.show
      opacity: 1

  .toolbar
    display: flex
    justify-content: center
    margin: 30px 0 0 0
    z-index: 10

    &.fixed
      position: fixed
      bottom: 0
      left: 50%
      margin: 0 0 0 -25px

    span
      background: #168aad
      width: 37px
      height: 27px
      display: flex
      justify-content: center
      align-items: center
      color: #fff
      cursor: pointer

    .btn-toggle
      border-top-left-radius: 6px
      margin: 0 1px 0 0
      i
        width: 14px
        height: 8px
        background: #168aad url('../../static/images/icon-close.png') no-repeat center
        &.open
          background: #168aad url('../../static/images/icon-open.png') no-repeat center

    .btn-refresh
      border-top-right-radius: 6px
      i
        width: 15px
        height: 14px
        background: #168aad url('../../static/images/icon-refresh.png') no-repeat center

      &.disabled
        opacity: 0.5


</style>
