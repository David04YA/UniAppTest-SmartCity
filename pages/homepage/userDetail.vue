<template><!-- 个人信息页 -->
	<view class="userInfo">
		<view class="userImage">
			<image :src="fullUrl" mode="" class="avatar"></image>
			<view class="reviseImage">修改头像</view>
		</view>
		<view class="userContent">
			<view>
				<view class="nickName">原姓名：{{ userInfo.nickName }}</view>
				<input type="text" placeholder="请输入修改后的姓名" v-model="InpName" />
			</view>
			<view>
				<view class="sex">性别：{{userInfo.sex}}</view>
				<input type="text" placeholder="男/女" v-model="InpSex" />
			</view>
			<view>
				<view class="phone">联系电话：{{maskedPhone}}</view>
				<input type="text" placeholder="请输入修改后的11位数字电话" v-model="InpPhone" maxlength="11" />
			</view>
		</view>
		<button class="comfirmBtn" @tap="revise">确认修改</button>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	const urlBase = 'http://121.9.253.236:10001';
	const token = uni.getStorageSync('token')
	const userInfo = ref({})
	const InpSex = ref('')
	const InpPhone = ref('')
	const InpName = ref('')
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
	// 获取用户信息
	uni.request({
		url: urlBase + '/prod-api/api/common/user/getInfo',
		method: 'GET',
		header: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		success: (res) => {
			console.log("登录信息")
			console.log(res)
			if (res.data.code == 200) {
				userInfo.value = res.data.user
			}
		},
	});
	// 修改用户信息
	const revise = () => {
		uni.request({
			url: urlBase + '/prod-api/api/common/user',
			method: 'PUT',
			data: {
				phonenumber: InpPhone.value,
				sex: InpSex.value,
				nickName: InpName.value
			},
			header: {
				'Authorization': token,
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log("修改信息")
				console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success',
						duration: 1500
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/homepage/homepage'
						})
					}, 1500)
				}
			},
		})
	}
	const maskedPhone = computed(() => {
		const phone = userInfo.value.phonenumber
		if (!phone) return '暂无手机号'

		// 确保是11位手机号
		if (phone.length !== 11) {
			return '手机号码格式不规范';
		} else {
			return phone.substring(0, 7) + '****'
		}
	})
</script>

<style scoped>
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border: 1px solid black;
		border-radius: 50%;
	}

	.userImage {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userContent {
		margin: 0 20rpx;
	}

	input {
		border-bottom: 1px solid black;
	}
	.comfirmBtn{
		width: 80%;
		height: 80rpx;
		background-color: #00aaff;
		border-radius: 10rpx;
		color: white;
		font-size: 30rpx;
		margin-top: 20rpx;
	}
</style>