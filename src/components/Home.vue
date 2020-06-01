<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="黑马商城" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" />
    <!-- 占位符 -->
    <router-view />
    <!-- 底部 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      images: []
    }
  },
  created() {
    this.getlunbo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getlunbo() {
      const { data: res } = await this.$http.get('/api/getlunbo')
      // console.log(res)
      this.images = res.message
      // console.log(this.images)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  i,
  span {
    color: #fff;
  }
}
</style>
