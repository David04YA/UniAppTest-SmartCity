<template>
	<view class="">
		<view class="userBox">
			<view class="userContent">
				<view class="userImage">
					<image :src="fullUrl" mode="" class="avatar"></image>
				</view>
				<view class="username">
					{{ userInfo.nickName }}
				</view>
			</view>
		</view>
		<view class="textContainner">
			<view class="userDetail" @tap="userMain">个人信息页</view>
			<view class="orderList" @tap="listMain">订单列表页</view>
			<view class="changePwd" @tap="changeMain">修改密码</view>
			<view class="feedback" @tap="backMain">意见反馈页面</view>
			<button class="out" @tap="outMain">退出</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	const userInfo = ref({});
	const urlBase = 'http://121.9.253.236:10001';
	const userImafe = ref('')
	const userMain = () => {
		uni.navigateTo({
			url: '/pages/homepage/userDetail'
		})
	}
	const listMain = () => {
		uni.navigateTo({
			url: '/pages/homepage/orderList'
		})
	}
	const changeMain = () => {
		uni.navigateTo({
			url: '/pages/homepage/changePwd'
		})
	}
	const backMain = () => {
		uni.navigateTo({
			url: '/pages/homepage/feedback'
		})
	}
	const token = uni.getStorageSync('token')
	const update = () => {
		uni.request({
			url: urlBase + '/prod-api/api/common/user/getInfo',
			method: 'GET',
			header: {
				'Authorization': token,
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
				if (res.data.code == 200) {
					userInfo.value = res.data.user
				}
			},
		});
	}
	const fullUrl = computed(() => {
		if (!userInfo.value || !userInfo.value.avatar) {
			return '/static/default-avatar.png' // 返回默认头像
		}
		// 检查avatar是否已经是完整URL
		if (userInfo.value.avatar.startsWith('http')) {
			return userInfo.value.avatar
		}
		return urlBase + userInfo.value.avatar
	})
	const outMain = () => {
		uni.showModal({
			title: '提示',
			content: '确定要退出登录吗？',
			success: (res) => {
				if (res.confirm) {
					uni.showToast({
						title: '已退出'
					});
					// 返回登录页
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/guide/guide'
						});
					}, 500);
				}
			}
		});
	}
	update()
</script>

<style lang="scss" scoped>


	/* 用户信息卡片 */
	.userBox {
		background: #55aaff;
		border-radius: 24rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 40rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
		border: 1rpx solid rgba(255, 255, 255, 0.2);
	}

	/* 用户内容区域 - 左侧头像 + 右侧信息 */
	.userContent {
		display: flex;
		align-items: center;
		position: relative;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
	}

	/* 左侧头像区域 */
	.userImage {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
		position: relative;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
		border: 4rpx solid #ffffff;
		background-color: #ffffff;
		font-size: 24rpx;
		font-weight: bold;
		text-align: center;
		line-height: 1.2;
	}

	/* 右侧用户信息区域 */
	.userInfo {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.textContainner {
		height: 500rpx;
		margin: 0 30rpx;
	}

	.textContainner * {
		border: 1px solid;
		border-radius: 20rpx;
		width: 690rpx;
		height: 65rpx;
		background-color: #f1f1f1;
		margin: 40rpx 0 40rpx 0;
		
	}
	.out{
		background-color: #ffc2cd;
		line-height: 65rpx;
		text-align: center;
		
	}
</style>