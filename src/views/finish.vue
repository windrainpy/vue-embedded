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

    <div class="m-container-finish">
      <!-- 已登录 -->
      <div v-if="logined">
        <div class="alert-msg" v-show="showAlert">
          <span>打开小慧APP，进入聊天列表找到联系人 “新浪微博” 点击进行使用！<i class="btn-close" @click="showAlert = false">✕</i></span>
        </div>

        <div class="text-wrap app-status">
          <h4>应用状态</h4>
          <div class="">
            <ul>
              <li>• 已登录支付宝（{{accountName}}）
                <a @click="showModel_1">Chatlet功能</a>
              </li>
              <li>• 已绑定【企业用户】{{xiaohuiName}}
                <a @click="showModel_2">去解绑</a>
              </li>
              <li>• 小慧在线</li>
              <li>• 已连接服务器（当前云桌面名称：支付宝硬植入Agent001）</li>
            </ul>
          </div>
        </div>

        <div class="text-wrap app-log">
          <h4>应用日志
            <a href="/" class="fl-right">查看更多 >></a>
          </h4>
          <div class="">

            <!-- 测试环境用: -->
            <ul>
              <li>2018/12/24 14:02:50 成功发送支付宝账单。</li>
              <li>2018/12/24 14:02:50 成功发送支付宝账单。</li>
              <li>2018/12/24 14:02:50 成功发送支付宝账单。</li>
              <li>2018/12/24 14:02:50 成功发送支付宝账单。</li>
              <li>2018/12/24 14:02:50 成功发送支付宝账单。</li>
            </ul>

            <!-- 正式环境用: -->
            <!-- <ul>
              <li v-for="item in logList">
                {{item}}
              </li>
            </ul> -->

          </div>
        </div>
      </div>

      <!-- 未登录 -->
      <div v-else>
        <div class="alert-msg">
          未登录 <router-link to="/index">重新登录</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {checkLoginStatus, getXiaohuiName} from '../api/embedded'
import {getAccount, getLogList} from '../api/finish'

export default {
  name: 'finish',
  data() {
    return {
      logList: [],

      // 测试环境用:
      logined: true, //是否已登录
      // 正式环境用:
      // logined: false, //是否已登录

      accountName: 'zhangcanwen@onecloud.cn',
      xiaohuiName: 'zhangcanwen（13800138000）',
      showAlert: true
    }
  },
  mounted() {
    // to change
    // let driverId = window.localStorage.getItem('driverId')
    // if(driverId) {
    //   this.params = {driverid: driverId}
    //   this._checkLoginStatus()
    //   this._getAccount()
    //   this._getXiaohuiName()
    //   this._getLogList()
    // }
  },
  methods: {
    /**
     * 检测用户的登录状态
     */
    _checkLoginStatus() {
      checkLoginStatus(this.params).then((data) => {
        if(data.entity) {
          this.logined = true
        }
      })
    },
    /**
     * 获取已绑定的小慧帐号
     */
    _getAccount() {
      getAccount(this.params).then((data) => {
        this.accountName = data.entity
      })
    },
    /**
     * 获取小慧帐号
     */
    _getXiaohuiName() {
      getXiaohuiName(this.params).then((data) => {
        this.xiaohuiName = data.entity
      })
    },
    _getLogList() {
      let params = Object.assign({}, this.params, {
        latest: true
      })
      getLogList(params).then((data) => {
        this.logList = data.entity
      })
    },
    back() {
      this.$router.push({
        path: '/'
      })
    },
    showModel_1() {
      this.$alert(
        '目前已开放的 Chatlet 功能，请在小慧中操作使用：一键发文',
        'Chatlet 功能',
        {
          confirmButtonText: '确定'
        }
      )
    },
    showModel_2() {
      this.$alert(
        '目前只可以在小慧中进行解绑，请在手机端操作。',
        '解绑',
        {
          confirmButtonText: '确定'
        }
      )
    },
  }
}
</script>

<style lang="sass" scope>
.m-container-finish
  > div
    width: 1200px
    margin: 0 auto

  .alert-msg
    font-size: 14px
    text-align: center
    margin: 20px 0 0 0

    span
      display: inline-block
      background: #f1fffb
      border: 1px solid #bdf1e5
      padding: 13px 150px 13px 20px
      border-radius: 6px
      color: #000
      position: relative

      .btn-close
        color: red
        font-weight: bold
        font-style: normal
        position: absolute
        right: 15px
        cursor: pointer

  h4
    font-size: 18px
    margin: 0
    font-weight: normal
    padding: 13px 25px
    background: #ffffff63
    a
      font-size: 16px
  


  .text-wrap
    background: #ffffff9e
    border-radius: 6px
    font-size: 14px
    ul
      padding: 10px 25px
      line-height: 3

  .app-status
    background: #ffffff9e
    border-radius: 6px
    margin-top: 50px
    margin-bottom: 40px

    ul
      margin: 0
      li
        color: #124631

  .app-log
    ul
      margin: 0
      padding: 0 20px
      li
        border-bottom: 1px dotted #868686
        color: #124631

</style>