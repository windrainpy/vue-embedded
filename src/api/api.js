const baseurl = 'http://localhost:8080'

const api = {
  // index
  getAllApps: baseurl + '/agent/allApps',
  getMyApps: baseurl + '/agent/myApps',

  // embedded
  openWebDriver: '/agent/info/open', //webdriver打来页面
  loginStatus: '/agent/info/statelogin', //检测登录状态
  getXiaohuiName: '/agent/info/xiaohuiname', //获取用户帐号
  getXiaohuiId: '/agent/info/xiaohuiid', //获取小慧ID
  binding: '/agent/info/binding', //绑定小慧帐号

  // finish
  getAccount: '/agent/info/account', //获取已绑定的小慧帐号
}

export default api