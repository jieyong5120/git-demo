<template>
  <div>
    <van-tabs v-model="activeId" @click="onClick">
      <van-tab v-for="(item,i) in imgCategory" :title="item.title" :key="i" :name="i">
        <div v-for="(itemImg,i) in imagesList" :key="i" class="imagetab">
          <van-image
            width="100%"
            height="300"
            :src="itemImg.img_url"
            @click="photoDetails(itemImg.id)"
          ></van-image>
          <div class="imageItem">
            <p>{{itemImg.seo_keywords}}</p>
            <p>{{itemImg.zhaiyao}}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgCategory: [],
      activeId: 0,
      imagesList: []
    }
  },
  created() {
    this.getImgCategory()
  },
  methods: {
    async getImgCategory() {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      console.log(res)
      res.message.unshift({ title: '全部', id: 0 })
      this.imgCategory = res.message
      this.getImages()
    },
    async getImages() {
      const { data: res } = await this.$http.get(`/api/getimages/${this.imgCategory[this.activeId].id}`)
      console.log(res)
      this.imagesList = res.message
    },
    onClick() {
      this.getImgCategory()
    },
    photoDetails(id) {
      this.$router.push('Info/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.imagetab {
  position: relative;
}

.imageItem {
  position: absolute;
  left: 0;
  bottom: 2px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  border-radius: 0 10px 0 10px;
}
</style>
