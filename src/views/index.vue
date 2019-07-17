<template>
  <div>
    <appSlider :list.sync="allApps"></appSlider>
    <myApps :list="myApps"></myApps>
  </div>
</template>

<script>
import appSlider from '../components/index/appSlider'
import myApps from '../components/index/myApps'
import {allApps, myAppList} from '../mock/data' //to delete
import {getAllApps, getMyApps} from '../api/index'

export default {
  name: 'index',
  data() {
    return {
      allApps: [],
      myApps: []
    }
  },
  mounted() {
    this._getAllApps()
    this._getMyApps()
  },
  methods: {
    _getAllApps() {
      // to delete
      this.allApps = allApps

      // to change
      // getAllApps().then((res) => {
      //   if(res.code === 0) {
      //     this.allApps = res.data.list
      //   }
      // })
    },
    _getMyApps() {
      // to delete
      this.myApps = myAppList

      // to change
      // getMyApps().then((res) => {
      //   if(res.code === 0) {
      //     this.myApps = res.data.list
      //   }
      // })
    },
  },
  components: {
    appSlider,
    myApps
  }
}
</script>

<style lang="sass" scoped>
// .m-container-main

//   .m-index
//     max-width: 1200px
//     margin: 0 auto
//     padding: 10px 20px 119px
</style>
