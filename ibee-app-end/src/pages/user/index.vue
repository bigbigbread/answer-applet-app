<template>
  <topTitle />
  <tm-app style="margin-top: 20px;">
    <view class="mb-32 mx-32 round-3 overflow">
      <tm-cell showAvatar :avatar="userInfo.avatar" rightText="" :margin="[0, 5]" :titleFontSize="40"
        :title="(userInfo as any).name" :height="100" :avatarSize="100" :avatarRound="20">
      </tm-cell>
    </view>
    <view class="btns">
      <!-- <button v-if="!isUser" @click="showWin = true" class="register-btn">注册</button> -->
      <button  @click="showWin = true" class="register-btn">注册</button>
    </view>
    <tm-modal title="注册"  :height="600" text :border="0" v-model:show="showWin" @ok="register">
      <view class="avater-img-wrapper">
        <img class="avater-img" :src="userInfo.avatar" @click="myUpload" mode="HeightFix" />
      </view>
      <view class="username-wrapper">
        <input class="user-input" :value="modelValue" @input="Inputinit" placeholder="输入名字" />
        <!-- <view>{{ modelValue }}</view> -->
      </view>
    </tm-modal>
  </tm-app>
  <tarbar :active=4></tarbar>
</template>

<script setup lang='ts'>
import { ref,onMounted} from 'vue'
import tarbar from '@/components/common/tarbar.vue'
import topTitle from '@/components/common/topTitle.vue'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tmCell from '@/tmui/components/tm-cell/tm-cell.vue'
import tmModal from '@/tmui/components/tm-modal/tm-modal.vue'
import { onShow } from '@dcloudio/uni-app'
import { registerUser } from '@/api/register'
import { getUserInfo } from '@/api/getUserInfo'
import nullAvater from '@/static/user/null.jpeg'
const isUser = ref(uni.getStorageSync('isUser').toString() === 'true')
uni.getSystemInfoSync()
const showWin = ref(false)
const modelValue = ref('')
const Inputinit = (e: any) => {
  var newUserName = e.detail.value;
  modelValue.value = newUserName
}
const userInfo: any = ref({
  avatar: nullAvater,
  name: '请先注册噢~'
})
const register = async () => {
  try {
    await regiterBtn()
    const getUserInfoStro = await getUserInfo();
    uni.setStorageSync('userInfo', getUserInfoStro);
    // 成功后重新刷新页面
    uni.reLaunch({
      url: '/pages/index/index'
    })
  } catch (err) {
    console.log('err', err)
  }
}
const myUpload = () => {
  // 转到裁剪页面 选择图片
  uni.switchTab({
    url: '/pages/crop/index'
  })
}
// 获取图片的二进制数据
const getImgBinary = () => {
  return new Promise((resolve, reject) => {
    // 获取userinfo avatar 的图片 base64
    uni.getFileSystemManager().readFile({
      filePath: userInfo.value.avatar,
      success: (res: any) => {
        resolve(res.data)
      },
      fail: (err: any) => {
        console.log('err', err)
        reject(err)
      }
    })
  })
}
const regiterBtn = async () => {
  const userName: string = modelValue.value
  const userImgBinary: any = await getImgBinary()
  console.log('请求前userName', userName)
  console.log('请求前userImgBinary', new Uint8Array(userImgBinary))
  try {
    const res = await registerUser({
      userName: userName,
    },
    new Uint8Array(userImgBinary)
    )
    console.log('注册请求res', res)
  } catch (err) {
    console.log('注册请求错误err', err)
  }
}
const getProfile = async () => {
  if (isUser.value) {
    const avterUrl = `https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com/head-image/${uni.getStorageSync('userInfo').id}`
    userInfo.value = {
      avatar: avterUrl,
      ...uni.getStorageSync('userInfo')
    }
  } else {
    (userInfo.value as any) = {
      avatar: nullAvater,
      name: '请先注册噢~'
    }
  }
}

onShow(async () => {
  try {
		const value = await uni.getStorageSync('imgUrl')
		if (value) {
      // Do something with return value
      // 取出图片
      console.log('value', value)
      uni.getStorage({
        key: 'imgUrl',
        success: function (res) {
          console.log('res', res)
          userInfo.value.avatar = res.data
        }
      })
      try {
        uni.removeStorageSync('imgUrl')
			} catch (e) {
        console.log('e', e)
        // error
			}
		}
	} catch (e) {
    console.log('e', e)
	}
  await getProfile()
})
</script>
<style scoped lang='less'>
.avater-img-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .avater-img {
    width: 100px;
    height: 100px;
    border: 3px solid #ccc;
    border-radius: 50%;
  }
}

.username-wrapper {
  width: 100%;
  margin-top: 20px;

  .user-input {
    width: 100%;
    border: 1px solid #ccc;
    padding: 6px 2px;
    // box-sizing: border-box;
    font-size: 18px;
    border-radius: 4px;
    padding-left: 5px;

    // 聚焦时改变边框颜色
    &::focus {
      border: 1px solid #409eff;
    }
  }
}

.btns {
  .register-btn {
    width: 50%;
    height: 40px;
    // background-color: #409eff;
    color: black;
    font-size: 22px;
    border: none;
    line-height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 5px 0px;
    box-sizing: border-box;
  }

  .edit-btn {
    width: 50%;
    height: 40px;
    // background-color: #409eff;
    color: black;
    font-size: 22px;
    border: none;
    line-height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 5px 0px;
    box-sizing: border-box;
  }
}
</style>