<template>
  <div>
    <van-panel :title="newsList.title">
      <div slot="footer" class="header">
        <span>{{newsList.add_time | dataFormat}}</span>
        <span>点击次数：{{newsList.click}}</span>
      </div>
    </van-panel>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    <div v-html="newsList.content"></div>
    <van-cell-group>
      <span>发表评论</span>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
      <van-field
        v-model="content"
        rows="5"
        border
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
    <van-button size="large" class="btn" @click="postComment">发表评论</van-button>
    <!-- 评论列表 -->
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
      newsList: {},
      content: '',
      commentList: [],
      loading: false,
      finished: false,
      pageindex: 1
    }
  },
  created() {
    this.getNew()
    this.handleChange()
  },
  methods: {
    // 获取详情
    async getNew() {
      const { data: res } = await this.$http.get('/api/getnew/' + this.$route.params.id)
      this.newsList = res.message[0]
      console.log(res)
      console.log(this.newsList)
    },
    // 提交评论
    async postComment() {
      var params = new URLSearchParams()
      params.append('content', this.content)
      const { data: res } = await this.$http.post('/api/postcomment/' + this.$route.params.id, params)
      if (res.status === 0) {
        console.log('评论提交成功!')
      }
      console.log(res)
    },
    // 获取评论
    async handleChange() {
      this.pageindex++
      console.log(this.pageindex)
      const { data: res } = await this.$http.get(`/api/getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`)
      console.log(res)
      for (let i = 0; i < res.message.length; i++) {
        this.commentList.push(res.message[i])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: #1989fa;
}

.van-cell-group span {
  font-size: 16px;
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
