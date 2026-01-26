<template>
	<!-- 轮播图 -->
	<view class="">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item class="moviesBanner" v-for="(item, index) in bannerActive" :key="item.index">
				<image mode="aspectFill" :src="urlBase + item.advImg" style="width: 100%; height: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- 搜索框的骨架 -->
		<view class="moviesSearch">
			<input type="text" placeholder="请输入电影名称" v-model="searchKeyword" />
			<button class="searchBtn" @tap="handleSearch">搜索</button>
		</view>
		<!-- 电影信息的骨架 -->
		<view class="moviesDetail">
			<view class="detaliGrid">
				<view class="imageItem" v-for="(item, index) in displayList" :key="item.id" @tap="detailBtn(item)">
					<image :src="urlBase + item.cover" mode="" class="imgContent"></image>
					<text class="imageName">{{item.name}}</text>
					<text>时长：{{item.duration}}分钟</text>
					<text class="duration">上映时间：{{item.playDate}}</text>
				</view>
				<view class="more" @tap="moreBtn">
					查看更多
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	const imageList = ref([])
	const bannerActive = ref([])
	const searchKeyword = ref('')
	const imageListAll = ref([])
	const token = uni.getStorageSync('token')
	const urlBase = 'http://121.9.253.236:10001';
	const moreBtn = () => {
		uni.navigateTo({
			url: "/pages/services/watchMovies/moreMovies"
		})
	}
	// 电影轮播图接口的调用
	const moviesBanner = () => {
		uni.request({
			url: urlBase + '/prod-api/api/movie/rotation/list',
			method: 'GET',
			success(res) {
				console.log(res)
				bannerActive.value = res.data.rows
				console.log("rows数组");
				console.log(bannerActive.value)

			},
			fail(err) {
				console.log('请求失败')
			}

		})
	}
	// 电影信息
	const moviesDetail = () => {
		uni.request({
			url: urlBase + '/prod-api/api/movie/film/list',
			method: 'GET',
			success(res) {
				console.log("电影信息");
				console.log(res)
				imageListAll.value = res.data.rows
				console.log("电影表格");
				console.log(imageList.value)
			},
			fail(err) {
				console.log('请求失败')
			}

		})
	}
	// 使用ai完成搜索框的实现
	const handleSearch = () => {
		console.log('搜索关键词：', searchKeyword.value)
	}
	const displayList = computed(() => {
		if (!searchKeyword.value.trim()) {
			return imageListAll.value.slice(0, 5)
		}
		const keyword = searchKeyword.value.trim().toLowerCase()
		return imageListAll.value.filter(item => {
			// 假设按电影名称搜索（name 字段）
			return item.name && item.name.toLowerCase().includes(keyword)
		})
	})
	// 点击电影图标,跳转到信息详情页
	const detailBtn = (item) => {
		console.log('点击了id为',item.id, '的电影图标')
		console.log('点击了id为',item.id, '的电影图标,执行特殊跳转')
		uni.navigateTo({
			url: `/pages/services/watchMovies/comcreteMovies?id=${item.id}`
		})
	}
	moviesBanner()
	moviesDetail()
</script>

<style>
	/* 搜索框样式（已有） */
	.moviesSearch {
		border: 1px black solid;
		margin: 15px 15px 0 15px;
	}

	/* 电影详情区域 */
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