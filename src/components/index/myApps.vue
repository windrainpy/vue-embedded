<template>
  <div class="m-container-allapps">
    <div class="my-apps">
      <h4>植入应用列表</h4>
      <ul class="app-list">
        <li v-for="item in list" :key="item.id">
          <img :src="require('../../assets/images/' + item.icon)"
              :alt="item.email" :width="item.width" :height="item.height">
          <span class="name">
            {{item.email}}
          </span>
        </li>
      </ul>
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
    
  }
}
</script>

<style lang="sass" scoped>
.m-container-allapps
  width: 1360px
  margin: 0 auto

  .my-apps
    width: 1200px
    margin: 0 auto
    padding: 20px 0 0 0
    h4
      color: #fff

    .app-list
      display: flex
      padding: 0
      margin: 0
      justify-content: flex-start

    li
      background: #fff
      width: 18%
      margin: 0 1.5% 0 0
      height: 160px
      border-radius: 6px
      text-align: center
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      cursor: pointer
      transition: all 0.5s

      &:hover
        box-shadow: 0 3px 20px rgba(00,00,00,0.7)

      img
        display: block
        font-size: 12px

      .name
        display: block
        margin: 10px 0
        font-size: 14px
</style>
