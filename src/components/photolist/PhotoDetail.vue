<template>
  <div>
    <van-panel :title="imageInfoList.title">
      <div slot="footer" class="header">
        <span>发表时间：{{imageInfoList.add_time | dataFormat}}</span>
        <span>点击次数：{{imageInfoList.click}}</span>
      </div>
    </van-panel>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    <van-image
      width="33%"
      height="100"
      lazy-load
      :src="item.src"
      v-for="(item,i) in thumImagesList"
      :key="i"
    />
    <van-panel>
      <div v-html="imageInfoList.content"></div>
    </van-panel>
    <van-cell-group>
      <span class="comment">发表评论</span>
      <van-field v-model="comValue" placeholder="请输入留言" border />
    </van-cell-group>
    <van-button type="info" size="large" class="btn" @click="postcomment">发表评论</van-button>
    <van-list>
      <div v-for="(item,i) in commentList" :key="i">
        <div slot="default" class="slotcommit">
          <span>第{{i+1}}楼</span>
          <span>用户：{{item.user_name}}</span>
          <span>发表时间：{{item.add_time | dataFormat}}</span>
        </div>
        <van-cell :title="item.content"></van-cell>
      </div>
    </van-list>
    <van-button size="large" class="btn2" @click="handleChange">发表评论</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageInfoList: {},
      thumImagesList: [],
      comValue: '',
      commentList: [],
      pageindex: 1
    }
  },
  created() {
    this.getImageInfo()
    this.getThumImages()
    this.handleChange()
  },
  methods: {
    async getImageInfo() {
      const { data: res } = await this.$http.get('/api/getimageInfo/' + this.$route.params.id)
      console.log(res)
      this.imageInfoList = res.message[0]
    },
    async getThumImages() {
      const { data: res } = await this.$http.get('/api/getthumimages/' + this.$route.params.id)
      console.log(res)
      this.thumImagesList = res.message
    },
    async handleChange() {
      this.pageindex++
      console.log(this.pageindex)
      const { data: res } = await this.$http.get(`/api/getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`)
      console.log(res)
      for (let i = 0; i < res.message.length; i++) {
        this.commentList.push(res.message[i])
      }
    },
    async postcomment() {
      let params = new URLSearchParams()
      params.append('content', this.comValue)
      const { data: res } = await this.$http.post(`/api/postcomment/${this.$route.params.id}`, params)
      if (res.status === 0) {
        console.log('评论提交成功!')
      }
      console.log(res)
      this.handleChange()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: #ccc;
}
.comment {
  font-size: 16px;
  display: block;
  margin: 20px;
}

.van-field {
  border: 1px solid #ccc;
  height: 200px;
  margin: 10px;
}

.btn {
  margin-bottom: 50px;
  background-color: #1989fa;
}

.slotcommit {
  background-color: #ccc;
}

.btn2 {
  margin-bottom: 50px;
  color: rgb(255, 68, 68);
  border: 1px solid rgb(255, 68, 68);
}
</style>
