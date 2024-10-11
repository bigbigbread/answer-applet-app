<template></template>
<script  lang="ts" setup>
import { onShow, onHide, onLaunch, onReady, onLoad } from '@dcloudio/uni-app';
import { loginInit } from '@/api/login'
import { getUserInfo } from '@/api/getUserInfo'
import { refreshLogin } from '@/api/refreshLogin';
import {getHeadImgUrl} from '@/utils'
onShow(async () => {
	// await loginInit();
  uni.hideTabBar();
});
onReady(async () => {
	// uni.hideTabBar();
	console.log('App Ready');
});
onHide(() => {
	// uni.hideTabBar();
	console.log('App Hide');
});
onLaunch(async () => {
	uni.setStorageSync('isUser',false);
	await loginInit();
	const userInfo = await getUserInfo();
	// 如果有用户信息则说明已经注册过了
	if (userInfo) {
		// uni.setStorageSync('userInfo', userInfo.data);
		// 将用户头像添加到userInfo中
		const headImgUrl = await getHeadImgUrl(userInfo.data.id);
		uni.setStorageSync('userInfo', { ...userInfo.data, headImgUrl });
		uni.setStorageSync('isUser',true);
		// 刷新登录天数
		const loginDay = await refreshLogin();
		uni.setStorageSync('loginDay', loginDay);
	} else {
		isUsered();
	}
});
onLoad(async () => {
})
const isUsered = () => {
	const userInfo = uni.getStorageSync('userInfo') || '';
	if (userInfo.userId) {
		return true;
	} else {
		// 则说明没有注册过 提示用户注册
		uni.showModal({
			title: '提示',
			content: '您还没有注册，请先注册',
			success: function (res) {
				if (res.confirm) {
					uni.switchTab({
						url: '/pages/user/index'
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
};
</script>
<style>
/* #ifdef APP-PLUS-NVUE */
/* @import './tmui/scss/nvue.css'; */
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */
</style>