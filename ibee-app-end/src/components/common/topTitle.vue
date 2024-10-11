<template>
  <view class="block" :style="{ height: capsuleTop + 'px' }"></view>
  <view class="icon-title" :style="{ height: capsuleHeight + 'px', lineHeight: capsuleHeight + 'px' }">ibee积分小站
  </view>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
const menuButtonObject = uni.getMenuButtonBoundingClientRect()
const capsuleTop = ref(menuButtonObject.top || 30)
const capsuleHeight = ref(menuButtonObject.height || 30)
</script>
<style scoped lang='less'>
.icon-title {
  font-size: 18px;
  font-weight: 600;
  margin-left: 16px;
}
</style>