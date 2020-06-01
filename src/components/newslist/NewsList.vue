<template>
  <div>
    <van-loading type="spinner" color="#1989fa" vertical />
    <van-card
      v-for="(item,i) in newsList"
      :title="item.title"
      :thumb="item.img_url"
      :key="i"
      @click="newsDetails(item.id)"
    >
      <div slot="tags">
        <span>发表时间：{{item.add_time | dataFormat}}</span>
      </div>
      <div slot="footer">
        <span>点击{{item.click}}</span>
      </div>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getnewslist()
  },
  methods: {
    async getnewslist() {
      const { data: res } = await this.$http.get('/api/getnewslist')
      console.log(res)
      this.newsList = res.message
    },
    async newsDetails(id) {
      // console.log(id)
      this.$router.push('/news/detail/' + id)
      // const { data: res } = await this.$http.get('/api/getnew/' + id)
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.van-card span {
  color: #226aff;
}
</style>
