<template>
  <div>
    <video ref="videoElement" class="video-js">
      <!-- <source :src="src" :type="type"> -->
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'MVideo',
  props: {
    src: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'video/mp4'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      video: null
    }
  },
  mounted() {
    this._initVideo()
  },
  methods: {
    _initVideo() {
      console.log(222, this.options)
      this.video = videojs(this.$refs.videoElement, this.options, function onPlayerReady() {
        console.log('onPlayerReady', this)
      })
    }
  },
  beforeDestroy() {
    if(this.video) {
      this.video.dispose()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
