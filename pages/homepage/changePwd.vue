<template>
	<view class="container">
		<view class="form-item">
			<input type="safe-password" v-model="oldPwd" placeholder="请输入旧密码" />
		</view>
		<view class="form-item">
			<input type="text" v-model="newPwd" placeholder="请输入新密码" />
		</view>
		<view class="form-item">
			<input type="safe-password" v-model="confirmPwd" placeholder="请确认新密码" />
		</view>
		<view class="form-btn">
			<button @tap="confirmBtn" class="confirm">
				确认修改
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'


	const urlBase = 'http://121.9.253.236:10001';
	const newPwd = ref('')
	const oldPwd = ref('')
	const confirmPwd = ref('')
	const token = uni.getStorageSync('token')


	const confirmBtn = async () => {
		if (newPwd.value == '' || confirmPwd.value == '' || oldPwd.value == '') {
			uni.showToast({
				title: '请输入完整信息',
				icon: 'none',
				duration: 2000
			})
			return;
		}

		if (newPwd.value.length < 6) {
			uni.showToast({
				title: '密码长度不能小于6位',
				icon: 'none',
				duration: 2000
			})
			return;
		}

		if (newPwd.value == oldPwd.value) {
			uni.showToast({
				title: '新密码不能与旧密码相同',
				icon: 'none',
				duration: 2000
			})
			return;
		}

		if (newPwd.value !== confirmPwd.value) {
			uni.showToast({
				title: '两次密码不一致',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		try {
			const res = await uni.request({
				url: urlBase + '/prod-api/api/common/user/resetPwd',
				method: 'PUT',
				header: {
					'Content-Type': 'application/json',
					'Authorization': token ? `Bearer ${token}` : ''
				},
				data: {
					oldPassword: oldPwd.value,
					newPassword: newPwd.value,
					success: res => {
						console.log(res.data)
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							duration: 2000
						})
					},
					fail: err => {
						console.error(err)
						uni.showToast({
							title: '修改失败',
							icon: 'fail',
							duration: 2000
						})
					}
				}
			})

			console.log('请求成功:', res);



			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/guide/guide'
				})
			}, 1500)

		} catch (error) {
			console.error('修改密码失败:', error)
			uni.showToast({
				title: '修改失败',
				icon: 'none',
				duration: 2000
			})
		}
	}
</script>

<style>
	.form-item {
		border: 1px solid black;
		margin: 20rpx;
	}
	.confirm {
		background-color: #00aaff;
		width: 80%;
		height: 80rpx;
		border-radius: 10rpx;
		color: white;
		font-size: 30rpx;
		margin: auto;
	}
</style>