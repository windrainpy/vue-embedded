<template>
  <div class="m-container-allapps">
    <div class="app-slider">
      <h4>选择要植入的应用</h4>
      <span class="prev "></span>
      <span class="next"></span>
      <div class="slider-wrap">
        <ul class="slider-list">
          <li v-for="item in list" :key="item.id">
            <div class="icon-wrap">
              <img :src="require('../../assets/images/' + item.icon)"
              :alt="item.name" :width="item.width" :height="item.height">
              <span class="name">
                {{item.name}}
              </span>
            </div>
            <div @click="addApp(item.name)" class="add-icon"></div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default: []
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    addApp(appName) {
      this.$router.push({
        path: '/embedded',
        query: {
          appName: appName
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.m-container-allapps
  width: 1360px
  margin: 0 auto

  .app-slider
    width: 1200px
    margin: 0 auto
    position: relative

    h4
      color: #fff

    .prev, .next
      width: 60px
      height: 240px
      color: #fff
      display: flex
      align-items: center
      justify-content: center
      border-radius: 6px
      position: absolute
      bottom: 0
      cursor: pointer
      transition: all 0.5s

      &.disabled
        opacity: 0.5
        color: #999

    .prev
      background: url('../../assets/images/btn-prev.png') no-repeat center
      left: -80px
      &:hover
        box-shadow: 0 3px 10px rgba(00,00,00,0.5)

    .next
      background: url('../../assets/images/btn-next.png') no-repeat center
      right: -80px
      &:hover
        box-shadow: 0 3px 10px rgba(00,00,00,0.5)

    .slider-wrap
      display: flex

      .slider-list
        width: 100%
        display: flex
        justify-content: space-between
        padding: 0
        margin: 0

        li
          background: #fff
          width: 18%
          height: 240px
          list-style: none
          text-align: center
          border-radius: 6px
          display: flex
          flex-direction: column
          overflow: hidden
          align-items: center
          transition: all 0.5s

          .icon-wrap
            height: 159px
            img
              margin: 30px 0 0 0
              display: block
            .name
              font-size: 16px
              margin: 10px 0
              line-height: 2
              display: block
          .add-icon
            width: 100%
            height: 80px
            color: #ccc
            line-height: 50px
            font-size: 40px
            cursor: pointer
            transition: all 0s
            background: url('../../assets/images/btn-add.png') no-repeat center
            border-top: 1px solid #eee

        li:hover
          box-shadow: 0 3px 20px rgba(00,00,00,0.7)
          .add-icon
            background: #0f8a9a url('../../assets/images/btn-add-hover.png') no-repeat center
            color: #fff

</style>
