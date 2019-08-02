<template>
  <div class="m-header">
    <el-row>
      <el-col :span="15">
        <div class="logo" @click="tohome">
          <img src="../assets/images/logo.png" alt="小慧硬植入" width="40" height="42">
          小慧硬植入
        </div>
      </el-col>
      <el-col :span="3">
        <span class="video-link">
          <i class="icon-video"></i>植入演示
        </span>
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

    <div class="video-wrap">
      <m-video :options="videoOptions"></m-video>
    </div>
  </div>
</template>

<script>
import MVideo from './MVideo'

export default {
  data() {
    return {
      keyword: '',
      videoOptions: {
        autoPlay: true,
        controls: true,
        sources: [
          {
            src: "/assets/video/example-2.mp4",
            type: "video/mp4"
          }
        ]
      },
      video: null
    }
  },
  mounted() {
  },
  methods: {
    tohome() {
      this.$router.push({
        path: '/'
      })
    },
    // _initVideo() {
    //   this.options = {
    //     autoplay: false,
    //     controls: true,
    //     sources: [
    //       {
    //         src: "../assets/video/example-2.mp4",
    //         type: "video/mp4"
    //       }
    //     ]
    //   }
    //   this.video = videojs(this.$refs.videoElement, this.options, function onPlayerReady() {
    //     console.log('onPlayerReady', this)
    //   })
    // }
  },
  components: {
    MVideo
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

  .video-link
    color: #047c91
    font-size: 14px
    line-height: 40px
    text-decoration: underline
    cursor: pointer
    .icon-video
      background: url('../assets/images/icon-video.png') no-repeat
      width: 30px
      height: 26px
      display: inline-block
      background-size: contain
      vertical-align: middle
      position: relative
      top: -1px

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
  
  .video-wrap
    width: 600px
    height: 500px
    position: fixed
    left: 50%
    top: 50%
    margin: -250px 0 0 -300px
    z-index: 9
</style>