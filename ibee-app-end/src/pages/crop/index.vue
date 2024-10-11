<template>
  <tm-app>
    <tm-cropimg @cance="fanhui" @confirm="getImg" url="" :width="150" :height="150"></tm-cropimg>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tmCropimg from '@/tmui/components/tm-cropimg/tm-cropimg.vue'
onShow(() => {
  console.log('onShow')
  uni.hideTabBar()
})
const fanhui = () => {
  uni.navigateBack({
    delta: 1
  })
}
const getImg = (tempFilePath: any) => {
  console.log(tempFilePath)
  // 将图片存储到本地
  uni.setStorageSync('imgUrl', tempFilePath)
  uni.switchTab ({
    url: '/pages/user/index',
  })
}
</script>