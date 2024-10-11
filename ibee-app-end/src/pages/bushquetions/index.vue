<template>
  <topTitle />
  <view class="go-superior" @click="goSuperior">
    <img :src="arrowLeft" alt="" class="superior-img">
  </view>
  <view class="quetions-content">
    <loading :isLoading="load"></loading>
    <img v-if="!load" :src="problemInfo.contentPic" alt="可爱捏" class="question-img">
  </view>
  <view class="operate-btns">
    <view class=" bush-btn" @click="operate('answer')" :class="{ active: current == 'answer' }">查看答案 </view>
    <view view class="bush-btn" @click="operate('analy')" :class="{ active: current == 'analy' }">查看解析
    </view>
    <view class="bush-btn" @click="operate('master')" :class="{ active: current == 'master' }">已经掌握</view>
    <view class="next-quetion bush-btn" @click="operate('next')" :class="{ active: current == 'next' }">下一道题</view>
  </view>
  <view v-if="current == 'answer'" class="view-answer">
    <img :src="problemInfo.answerPic" class="answer-img" mode="widthFix ">
    <view class="tips">
      对于答案和解析有任何疑问，欢迎加入用户交流群反馈
    </view>
  </view>
  <view v-if="current == 'analy'" class="view-analysis">
    <img :src="problemInfo.analyzePic" class="analysis-img">
    <view class="tips">
      对于答案和解析有任何疑问，欢迎加入用户交流群反馈
    </view>
  </view>
  <tarbar :active="-1"></tarbar>
</template>

<script setup lang='ts'>
import { ref, onUnmounted,onMounted } from 'vue'
import arrowLeft from '@/static/arrowleft.png'
import tarbar from '@/components/common/tarbar.vue'
import topTitle from '@/components/common/topTitle.vue'
import loading from '@/components/common/loading.vue'
import {getRandomProblem} from '@/api/problem'
import { getProblemImgUrl } from '@/utils'
const load = ref(true)
const problemInfo = ref({
  id: '',
  contentPic: '',
  analyzePic: '',
  answerPic: '',
})
onMounted(async () => {
  await getProblem()
})
const getProblem = async () => {
  try {
    const res = await getRandomProblem()
    load.value = false
    // console.log(res)
    problemInfo.value.id = res.id
    problemInfo.value.contentPic = getProblemImgUrl(res.id, 0)
    problemInfo.value.analyzePic = getProblemImgUrl(res.id, 1)
    problemInfo.value.answerPic = getProblemImgUrl(res.id, 2)
  } catch (error) {
    console.log(error)
  }
}
const goSuperior = () => {
  uni.navigateBack({
    delta: 1
  })
}
const current = ref('')
const operate = async (type: string) => {
  current.value = type
  if (type == 'answer') {
    // 查看答案逻辑

  } else if (type == 'analy') {
    // 查看解析逻辑

  } else if (type == 'master') {
    // 已经掌握逻辑
    console.log('已经掌握逻辑')

  } else if (type == 'next') {
    // 下一道题逻辑
    load.value = true
    await getProblem()
    load.value = false
  }
}
// 页面销毁
onUnmounted(() => {
  current.value = ''
})
</script>
<style scoped lang='less'>
.go-superior {
  width: 24px;
  height: 24px;
  margin-top: 15px;
  margin-left: 16px;

  // background-color: red;
  .superior-img {
    width: 7.69272518157959px;
    height: 13.36579704284668px;
  }
}

.quetions-content {
  width: 356px;
  height: 208px;
  margin-left: 10px;
  border-radius: 10px;
  overflow: hidden;

  .question-img {
    border-radius: 10px;
    width: 356px;
  }
}

.operate-btns {
  width: 356px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .bush-btn {
    width: 67px;
    height: 25px;
    font-size: 12px;
    text-align: center;
    border-radius: 10px;
    background: rgba(227, 202, 141, 1);
    line-height: 25px;
  }
}

.active {
  color: rgba(39, 84, 200, 1) !important;
}

.view-answer {
  width: 356px;
  margin-left: 10px;
  border-radius: 10px;
  // display: flex;
  margin-top: 10px;

  .answer-img {
    width: 356px;
    height: 160px;
    border-radius: 10px;
  }

  .tips {
    margin-top: 5px;
    width: 288px;
    height: 17px;
    font-size: 12px;
    color: rgba(119, 118, 118, 1);
  }
}

.view-analysis {
  width: 356px;
  margin-left: 10px;
  border-radius: 10px;
  margin-top: 10px;

  .analysis-img {
    width: 356px;
    height: 160px;
    border-radius: 10px;
  }

  .tips {
    margin-top: 5px;
    width: 288px;
    height: 17px;
    font-size: 12px;
    color: rgba(119, 118, 118, 1);
  }
}
</style>