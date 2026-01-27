<template><!-- 意见反馈页面 -->
	<view class="container">
		<textarea v-model="remark" placeholder="请输入备注（最多150字）" :maxlength="150" class="textarea" />
		<view class="counter">
			<!-- 字数统计显示 -->
			<text class="counter-text">已输入 {{ remark.length }}个字符,最多 150 个字符</text>
			<text class="count">{{ remark.length }}/150</text>
		</view>
	</view>
	<view class="">
		<button class="subBtn" @tap="submit">提交反馈</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const remark = ref('')
	const urlBase = 'http://121.9.253.236:10001';
	const token = uni.getStorageSync('token')
	const submit = () => {
		uni.request({
			url: urlBase + '/prod-api/api/metro/feedback',
			method: 'POST',
			data: {
				content: remark.value.trim()
			},
			header: {
				'Content-Type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : ''
			},
			success: (res) => {
				console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
				} else {
					uni.showToast({
						title: '提交失败',
						icon: 'error'
					})
				}
			},
			fail: (err) => {
				console.log(err)
			}
		})
	}
</script>

<style>
	.container {
		dsiplay: flex;
		flex-direction: column;
		align-items: center;
		margin: 20rpx;
		border: 1px solid black;
		border-bottom: 10rpx solid #7d7f6d;
	}

	.subBtn {
		width: 80%;
		height: 80rpx;
		background-color: #00aaff;
		border-radius: 10rpx;
		color: white;
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.textarea {
		width: 100%;
	}

	.counter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10rpx 20rpx;
	}

</style>