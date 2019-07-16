<template>
  <div class="app-slider">
    <h4>选择要植入的应用</h4>
    <div class="slider-wrap">
      <span class="prev "></span>
      <ul class="slider-list">
        <li v-for="item in list" :key="item.id">
          <div class="icon-wrap">
            <img :src="require('../../../static/images/' + item.icon)"
            :alt="item.name" :width="item.width" :height="item.height">
            <span class="name">
              {{item.name}}
            </span>
          </div>
          <div @click="addApp(item.name)" class="add-icon"></div></li>
      </ul>
      <span class="next"></span>
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
.slider-wrap
  display: flex

  .prev, .next
    width: 5%
    height: 200px
    color: #fff
    display: flex
    align-items: center
    justify-content: center
    border-radius: 6px

    &.disabled
      background: #f7f9fa
      color: #999

  .prev
    background: #f7f9fa url('../../../static/images/btn-prev.png') no-repeat center
    &:hover
      background: #36c5bf url('../../../static/images/btn-prev-hover.png') no-repeat center

  .next
    background: #f7f9fa url('../../../static/images/btn-next.png') no-repeat center
    &:hover
      background: #36c5bf url('../../../static/images/btn-next-hover.png') no-repeat center

  .slider-list
    width: 90%
    display: flex
    justify-content: space-around
    padding: 0
    margin: 0

    li
      background: #fff
      width: 18%
      height: 200px
      list-style: none
      text-align: center
      border-radius: 6px
      display: flex
      flex-direction: column
      overflow: hidden
      align-items: center

      .icon-wrap
        height: 130px
        img
          margin: 20px 0 0 0
          display: block
        .name
          font-size: 14px
          margin: 10px 0
          line-height: 34px
      .add-icon
        width: 100%
        height: 72px
        color: #ccc
        line-height: 50px
        font-size: 40px
        cursor: pointer
        background: #fafbfc url('../../../static/images/btn-add.png') no-repeat center

    li:hover
      .add-icon
        background: #36c5bf url('../../../static/images/btn-add-hover.png') no-repeat center
        color: #fff

</style>
