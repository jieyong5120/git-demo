<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <van-grid :column-num="3">
      <van-grid-item v-for="(item,index) in indexlist" :key="index" icon="photo-o" :to="item.path">
        <van-image :src="item.img" />
        <span>{{item.text}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      indexlist: [
        { path: '/newslist', img: require('../../assets/imgs/menu1.png'), text: '新闻资讯' },
        { path: '/photo/list', img: require('../../assets/imgs/menu2.png'), text: '图片分享' },
        { path: '/goods/list', img: require('../../assets/imgs/menu3.png'), text: '商品购买' },
        { path: '/home', img: require('../../assets/imgs/menu4.png'), text: '留言反馈' },
        { path: '/home', img: require('../../assets/imgs/menu5.png'), text: '视频专区' },
        { path: '/home', img: require('../../assets/imgs/menu6.png'), text: '联系我们' }
      ]
    }
  },
  created() {
    this.getlunbo()
  },
  methods: {
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
.van-swipe {
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 200px;
}

.van-image {
  width: 60px;
}

.van-swipe img {
  width: 100%;
  height: 200px;
}
</style>
