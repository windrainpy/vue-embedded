<template>
  <div class="my-apps">
    <h4>植入应用列表</h4>
    <ul class="app-list">
      <li v-for="item in list" :key="item.id">
        <img :src="require('../../../static/images/' + item.icon)"
            :alt="item.email" :width="item.width" :height="item.height">
        <span class="name">
          {{item.email}}
        </span>
      </li>
    </ul>
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
.my-apps
  padding: 20px 0 0 0

  .app-list
    display: flex
    padding: 0
    margin: 0
    justify-content: flex-start

  li
    background: #fff
    width: 18%
    margin: 0 1.5% 0 0
    height: 140px
    border-radius: 6px
    text-align: center
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    img
      display: block
      font-size: 12px

    .name
      display: block
      margin: 10px 0
      font-size: 14px
</style>
