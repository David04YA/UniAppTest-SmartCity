<template>
	<view class="pageContainer">
		<view class="overviewBtn" @tap="lineMessage">总览</view>
		<view class="headerContainner">
			<view class="position">
				{{ positionName }}
			</view>
			<view class="linePic" v-for="(item,index) in lineContent" :key="index" @tap="clickIndex(index,item)">
				<view>{{item.lineName}}</view>
				<view>下一站：{{item.nextStep.name}}</view>
				<view>{{item.reachTime}}分钟后</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const positionName = ref('')
	const lineContent = ref([])
	const lineMessage = () => {
		uni.navigateTo({
			url: '/pages/services/subwayService/lineMessage'
		})
	}
	const urlBase = 'http://121.9.253.236:10001';
	const head = () => {
		uni.request({
			url: urlBase + '/prod-api/api/metro/list?currentName=建国门',
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
			},
			success: (res) => {
				console.log(res)
				lineContent.value = res.data.data
				positionName.value = res.data.data[0].currentName
			},
			fail: (err) => {
				console.log(err)
			}
		})
	}
	const lineIds = '31,33,35,38'
	const currentName = positionName.value || '建国门'
	const clickIndex = (index,item) => {
		uni.navigateTo({
				url:`/pages/services/subwayService/subwayDetail?lineIds=${lineIds}&name=${currentName}&index=${index}`
		})
	}
		
	head()

</script>


<style scoped>
	/* 📌 最外层容器，作为绝对定位的参考 */
	.pageContainer {
		position: relative;
		/* 关键！ */
		min-height: 100vh;
		background-color: #f8f9fa;
		/* 页面背景色 */
	}

	/* ✅ 右上角【总览】按钮 —— 美化版 */
	.overviewBtn {
		position: absolute;
		top: 2rem;
		right: 30rpx;
		background: linear-gradient(135deg, #007aff, #0056cc);
		/* 渐变色，更现代 */
		color: #ffffff;
		padding: 16rpx 24rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
		font-weight: 600;
		box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.4);
		/* 柔和阴影 */
		z-index: 10;
		/* 可选：增加点击反馈（小程序中可以用 :active 伪类） */
	}

	/* 🎯 点击反馈效果（小程序支持 :active） */
	.overviewBtn:active {
		transform: scale(0.95);
		transition: transform 0.1s ease;
	}

	/* ===== 页面主内容区域 ===== */

	.headerContainner {
		padding: 40rpx 30rpx;
		background-color: #ffffff;
		margin-top: 60rpx;
		/* 避免被右上角按钮遮挡，留出空间 */
		border-radius: 20rpx;
		/* 可选：整体内容区域圆角 */
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	/* 当前站点名称，比如 "建国门" */
	.position {
		font-size: 40rpx;
		font-weight: bold;
		color: #1a1a1a;
		text-align: center;
		margin-bottom: 40rpx;
		padding: 24rpx;
		background-color: #f8f9fa;
		border-radius: 16rpx;
		border-left: 8rpx solid #007aff;
	}

	/* 每条地铁线路信息卡片 */
	.linePic {
		padding: 32rpx;
		margin-top: 24rpx;
		background-color: #ffffff;
		border: 1rpx solid #e9ecef;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		transition: shadow 0.2s ease;
	}

	.linePic:hover {
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
		/* 非小程序环境可去掉 */
	}

	/* 每个 linePic 内部的子 view 样式 */
	.linePic view:first-child {
		font-size: 36rpx;
		font-weight: 600;
		color: #007aff;
		margin-bottom: 16rpx;
	}

	.linePic view:nth-child(2) {
		font-size: 32rpx;
		color: #666666;
		margin-bottom: 12rpx;
	}

	.linePic view:nth-child(3) {
		font-size: 30rpx;
		color: #ff6b35;
		/* 橙色突出时间 */
		font-weight: 500;
	}
</style>