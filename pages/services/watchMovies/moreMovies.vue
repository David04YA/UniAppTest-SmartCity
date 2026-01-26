<template>
	<view>
		<view class="moviesDetail">
			<view class="detaliGrid">
				<view class="imageItem" v-for="(item, index) in imageList" :key="item.id" @tap="clickMore(item)">
					<image :src="urlBase + item.cover" mode="" class="imgContent"></image>
					<text class="imageName">{{item.name}}</text>
					<text>时长：{{item.duration}}分钟</text>
					<text class="duration">上映时间：{{item.playDate}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const urlBase = 'http://121.9.253.236:10001';
	const imageList = ref([])
	const moviesDetail = () => {
		uni.request({
			url: urlBase + '/prod-api/api/movie/film/list',
			method: 'GET',
			success(res) {
				console.log("电影信息");
				console.log(res)
				imageList.value = res.data.rows
				console.log("电影表格");
				console.log(imageList.value)
			},
			fail(err) {
				console.log('请求失败')
			}

		})
	}
	const clickMore = (item) => {
		console.log('点击了id为',item.id, '的电影图标')
		console.log('点击了id为',item.id, '的电影图标,执行特殊跳转')
		uni.navigateTo({
			url: `/pages/services/watchMovies/comcreteMovies?id=${item.id}`
		})
	}
	moviesDetail()
</script>

<style>
	.moviesDetail {
		padding: 20rpx;
	}

	/* 网格容器 - 核心：实现网状布局 */
	.detaliGrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* 2 列网格，推荐手机端；可改 3 或 4 列 */
		gap: 20rpx;
		/* 图片之间的间距，可根据需求调整 */
	}

	.duration {
		font-size: 10rpx;
	}

	.more {
		font-size: 50rpx;
		align-items: center;
		/* 图片和文字居中对齐 */
		background: #fff;
		border-radius: 12rpx;
		padding: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		writing-mode: vertical-lr;
		/* 垂直排列，从左到右（上→下） */
		text-orientation: mixed;
		/* 保持文字正向（不旋转） */
		letter-spacing: 10rpx;
	}

	/* 每个电影项 */
	.imageItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 图片和文字居中对齐 */
		background: #fff;
		border-radius: 12rpx;
		padding: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	/* 电影封面图片 */
	.imgContent {
		width: 100%;
		height: 200rpx;
		/* 可根据需求调整高度，比如 240rpx */
		border-radius: 8rpx;
	}

	/* 电影名称文字 */
	.imageName {
		margin-top: 12rpx;
		font-size: 28rpx;
		color: #333;
		text-align: center;
		word-break: break-all;
	}
</style>