<!-- 线路详情 -->
<template>
	<!-- 始发站到终末站的实现 -->
	<view v-if="currentLine">
		<view class="header">
			<view class="firstStation">{{currentLine.first}}</view>
			<view class="arrow">----------> </view>
			<view class="finallStation">{{currentLine.end}}</view>
		</view>
		<view>
			<view class="arrive">
				<view class="startTime">首班出发时间{{currentLine.startTime}}</view>
				<view class="endTime">末班出发时间{{currentLine.endTime}}</view>
			</view>
			<view class="speed">
			</view>
		</view>
		<view class="passStation">

		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		computed
	} from 'vue'
	const headerDetail = ref([])
	const urlBase = 'http://121.9.253.236:10001';
	const subwayDetail = () => {
		uni.request({
			url: urlBase + '/prod-api/api/metro/line?name=建国门&lineIds=31,33,35,38',
			success: (res) => {
				console.log("点击后的值");
				console.log(res)
				headerDetail.value = res.data.data
				console.log("获取的接口的值");
				console.log(headerDetail.value)
			},
			fail(err) {
				console.log(err);

			}
		})
	}
	// <!-- 始发站到终末站的实现 -->
	const currentLine = computed(() => {
		if (!headerDetail.value || !headerDetail.value.lineList) return null

		const index = parseInt(pageIndex.value)
		if (isNaN(index) || index < 0 || index >= headerDetail.value.lineList.length) {
			return null
		}

		return headerDetail.value.lineList[index]
	})
	const stationPass = () => {
		uni.request({
			url: urlBase + '/prod-api/api/metro/step/list?name=建国门',
			success: (ress) => {
				console.log("经过的站点");
				console.log(ress)
			},
			fail(err) {
				console.log(err);

			}
		})
	}
	// 用于接收传递过来的 index
	const pageIndex = ref('')

	// 页面加载时触发，获取 URL 参数
	onLoad((options) => {
		console.log(options)
		pageIndex.value = options.index
	})
	subwayDetail()
	stationPass()
</script>

<style>
	.header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border: 1px solid black;
		margin: 20rpx;
	}

	.arrive {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 80rpx;
		color: #55aaff;
		margin-top: 100rpx;
	}
</style>