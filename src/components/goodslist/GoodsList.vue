<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getgoods">
      <van-card
        v-for="(item,i) in goodsList"
        :price="item.sell_price"
        :origin-price="item.market_price"
        :title="item.title"
        :thumb="item.img_url"
        :key="i"
        @click="goodsDetails(item.id)"
      >
        <div slot="tags">
          <div class="goodsnum">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </div>
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
      goodsList: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.getgoods()
  },
  methods: {
    async getgoods() {
      this.number++
      console.log(this.number)
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=${this.number}`)
      console.log(res)
      setTimeout(() => {
        for (let i = 0; i < res.message.length; i++) {
          this.goodsList.push(res.message[i])
        }
        this.loading = false
        if (res.message.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    // 点击进入详情页面
    goodsDetails(id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.goodsnum {
  display: flex;
  justify-content: space-between;
}
</style>
