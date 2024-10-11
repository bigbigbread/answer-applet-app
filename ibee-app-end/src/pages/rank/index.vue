<template>
  <topTitle />
  <view class="rank-type">
    <view class="rank-btn" @click="operate('day')" :class="{ active: current == 'day' }">日榜 </view>
    <view view class="rank-btn" @click="operate('month')" :class="{ active: current == 'month' }">月榜
    </view>
    <view class="rank-btn" @click="operate('total')" :class="{ active: current == 'total' }">总榜</view>
  </view>
  <view class="rank-content">
    <view class="rank-content-top">
      <view class="rank-title">排名</view>
      <view class="rank-title">昵称</view>
      <view class="rank-title speci">刷题数</view>
    </view>
    <view class="rank-content-middle">
      <view v-for="(item, index) in 10" class="rank-content-middle-item">
        <view class="rank-icon">
          <img v-if="index == 0" :src="gold" alt="" class="medel-img">
          <img v-if="index == 1" :src="silver" alt="" class="medel-img">
          <img v-if="index == 2" :src="copper" alt="" class="medel-img">
          <!-- 占位符 -->
          <view v-if="index > 2" class="medel-img"></view>
        </view>
        <view class="rank-user">
          <img :src="rankData.avter" alt="" class="rank-user-img">
          <view class="rank-user-detail">
            <view class="rank-user-name">{{ rankData.userName }}</view>
            <view class="rank-user-leve">{{ rankData.userLeve }}</view>
          </view>
        </view>
        <view class="rank-bushquestions">
          {{ rankData.userBushQuetions }}
        </view>
      </view>
    </view>
    <view class="rank-content-user">
      <img :src="rankData.avter" alt="" class="rank-user-img">
      <view class="rank-user-detail">
        <view class="rank-user-name">{{ rankData.userName }}</view>
        <view class="rank-user-leve">{{ rankData.userLeve }}</view>
      </view>
    </view>
  </view>
  <tarbar :active="3"></tarbar>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import tarbar from '@/components/common/tarbar.vue'
import nullAvater from '@/static/user/null.jpeg'
import topTitle from '@/components/common/topTitle.vue'
import gold from "@/static/rank/gold.png"
import silver from "@/static/rank/silver.png"
import copper from "@/static/rank/copper.png"
const current = ref('day')
const rankData = ref({
  avter: nullAvater,
  userName: 'toki',
  userLeve: '最强积霸',
  userBushQuetions: "13",
},
)
const operate = (type: string) => {
  current.value = type
}
</script>
<style scoped lang='less'>
.rank-type {
  width: 375px;
  display: flex;
  height: 25px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;

  .rank-btn {
    width: 68px;
    height: 22px;
    border-radius: 10px;
    background: rgba(220, 189, 113, 0.8);
    text-align: center;
    font-size: 16px;
  }
}

.rank-content {
  margin-left: 18px;
  margin-top: 18px;
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .rank-content-top {
    display: flex;
    width: 300px;
    // margin-left: 25px;
    justify-content: space-evenly;

    .rank-title {
      width: 42px;
      height: 20px;
      font-size: 16px;
      text-align: center;
      margin-left: 15px;
    }

    .speci {
      width: 88px;
      text-align: center;
      // flex: 1;
    }
  }

  .rank-content-middle {
    width: 375px;
    // background-color: #ccc;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(216, 216, 216, 1);
    display: flex;
    flex-direction: column;
    align-items: center;

    .rank-content-middle-item {
      border-bottom: 1px solid rgba(216, 216, 216, 1);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 46px;
      padding: 3px 0;
      box-sizing: border-box;
      width: 300px;
      margin-left: -22px;

      .rank-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        .medel-img {
          width: 36px;
          height: 36px;
        }
      }

      .rank-user {
        width: 92px;
        height: 37px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .rank-user-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .rank-user-detail {
          width: 50px;
          height: 37px;
          margin-left: 8px;
          display: flex;
          flex-direction: column;

          .rank-user-name {
            font-size: 14px;
          }

          .rank-user-leve {
            width: 50px;
            height: 16px;
            font-size: 12px;
            background: rgba(220, 189, 113, 1);
            border-radius: 4px;
          }
        }
      }

      .rank-bushquestions {
        width: 110px;
        height: 18px;
        font-size: 14px;
      }
    }
  }

  .rank-content-user {
    display: flex;
    align-items: center;
    height: 50px;

    .rank-user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .rank-user-detail {
      width: 60px;
      height: 47px;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .rank-user-name {
        font-size: 18px;
      }

      .rank-user-leve {
        width: 65px;
        text-align: center;
        height: 20px;
        font-size: 14px;
        background: rgba(220, 189, 113, 1);
        border-radius: 4px;
      }
    }
  }
}

.active {
  color: rgba(39, 84, 200, 1);
}
</style>