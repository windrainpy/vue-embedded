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
          三步实现新浪微博植入
        </span>
      </div>
    </div>

    <div class="guild-wrap">
      <ul>
        <li class="hasBar" :class="{'active': currentStep === 1 || currentStep === 2}">
          <!-- to change -->
          <span class="stup-num" id="step_1" @click="loginSuccessHandler">1</span>
          <span class="text">登录微博帐号</span>
          <span class="bar">
            <i :class="{'half': currentStep === 1, 'whole': currentStep === 2}"></i>
          </span>
        </li>
        <li class="hasBar" :class="{'active': currentStep === 2}">
          <span class="stup-num" id="step_2">2</span>
          <span class="text">绑定小慧帐号</span>
          <span class="bar">
            <i :class="{'half': currentStep === 2, 'whole': currentStep === 3}"></i>
          </span>
        </li>
        <li>
          <span class="stup-num" id="step_3">3</span>
          <span class="text">在小慧中使用</span>
        </li>
      </ul>
    </div>

    <div class="m-container-frame">
      <div class="tooltips step-1" v-if="currentStep === 1">
        <span class="desc">请在下面网页中登录微博帐号</span> &emsp;
        <el-button @click="nextStep" size="large" class="btn-white">下一步</el-button>
      </div>

      <div class="tooltips step-2" v-if="currentStep === 2">
        <span class="desc">是否把新浪微博帐号绑定到帐号“{{xiaohuiName}}”？ </span> &emsp;
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
import {appUrlMapping} from '../mock/data'

export default {
  name: 'embedded',
  data() {
    return {
      appType: '',
      loading: true,
      pageLoaded: false,
      toolbarShowing: false,
      disableNext: true,
      currentStep: 1,

      driverId: '',
      xiaohuiId: '',
      xiaohuiName: '15899958048',
      loadUrl: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.appType = to.query.appType
      vm.insertUrl(vm.appType)
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
    insertUrl(key) {
      this.loadUrl = ''
      this.loadUrl = appUrlMapping[key]
    },
    /**
     * iframe加载完毕事件
     */
    loaded() {
      console.log('finish loaded')
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
      this.insertUrl(this.appType)
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
.guild-wrap
  color: #fff
  padding: 5px 0 0 0
  ul
    display: flex
    flex-direction: row
    justify-content: center
    li
      &.active
        font-weight: bold
        .stup-num
          background: #ffffff
          border: 1px solid #fff
          color: #26a3a7
        .bar
          i
            display: block
            background: #fff
            height: 100%
          i.half
            width: 50%
          i.whole
            width: 100%


      .stup-num
        font-size: 20px
        border: 1px solid rgba(255,255,255,0.74)
        color: rgba(255,255,255,0.74)
        width: 26px
        height: 26px
        line-height: 26px
        display: inline-block
        border-radius: 50%
        margin: 0 7px 0 0
        text-align: center
      .text
        font-size: 16px
        margin: 0 20px 0 0

      &.hasBar
        padding: 0 230px 0 0
        position: relative
        .bar
          position: absolute
          top: 14px
          right: 37px
          width: 180px
          height: 2px
          border-radius: 10px
          background: rgba(255,255,255,0.4)

.m-container-frame
  min-height: 450px

  .tooltips
    text-align: center
    line-height: 30px
    margin: 40px 0
    color: #fff

    .desc
      font-size: 23px
      margin: 0 10px 0 0

    button
      position: relative
      top: -3px
      padding-top: 10px
      padding-bottom: 10px

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
