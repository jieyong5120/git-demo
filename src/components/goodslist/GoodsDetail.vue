<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,i) in goodsImageList" :key="i">
        <img v-lazy="item.src" />
      </van-swipe-item>
    </van-swipe>
    <van-panel class="paneltab">
      <div v-for="(item,i) in goodsDescList" :key="i">{{item.title}}</div>
      <div v-for="(item,i) in goodsInfoList" :key="i">
        <span>市场价：￥{{item.market_price}}</span>
        <span>销售价：￥{{item.sell_price}}</span>
      </div>
      <van-stepper v-model="value" integer />
      <van-goods-action>
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsDescList: [],
      goodsInfoList: [],
      goodsImageList: [],
      value: 1
    }
  },
  created() {
    this.getGoodsDesc()
    this.getGoodsInfo()
    this.getGoodsImage()
  },
  methods: {
    async getGoodsDesc() {
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${this.$route.params.id}`)
      console.log(res)
      this.goodsDescList = res.message
    },
    async getGoodsInfo() {
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${this.$route.params.id}`)
      console.log(res)
      this.goodsInfoList = res.message
    },
    async getGoodsImage() {
      const { data: res } = await this.$http.get(`/api/getthumimages/${this.$route.params.id}`)
      console.log(res)
      this.goodsImageList = res.message
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe img {
  width: 100%;
  height: 200px;
  text-align: center;
}

.paneltab {
  border: 1px solid #ccc;
  padding: 0 10px;
}
</style>
