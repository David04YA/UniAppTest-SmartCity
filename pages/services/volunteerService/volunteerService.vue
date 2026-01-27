<template>
	<view class="newsContainner">
		<!-- 轮播图 -->
		<view class="bannerList">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
				<swiper-item v-for="(item, index) in bannerList" key="item.index">
					<image :src="baseUrl + item.cover" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新闻列表 -->
		<view class="newsList" v-for="(item, index) in newsListAll" key="item.index">
			<image :src="baseUrl + item.cover" mode="aspectFill"></image>
			<view class="">
				{{item.title}}
			</view>
			<view class="">
				{{item.updateTime}}
			</view>
		</view>
		<view class="btmLabel">
			<button @tap="volunteerBtn">志愿活动</button>
			<button @tap="myActiveBtn">我的活动</button>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue'
	const baseUrl = 'http://121.9.253.236:10001';
	const newsListAll = ref([])
	const bannerList = ref([])
	const volunteerBtn = () => {
		uni.navigateTo({
			url: '/pages/services/volunteerService/volunteerActivity'
		})
	}
	const myActiveBtn = () => {
		uni.navigateTo({
			url: '/pages/services/volunteerService/myActivity'
		})
	}
	const newsContainner = () => {
		uni.request({
			url: baseUrl + '/prod-api/press/press/list',
			method: 'GET',
			success: (res) => {
				console.log(res)
				newsListAll.value = res.data.rows
				bannerList.value = res.data.rows.slice(0, 5)
			},
			fail: (err) => {
				console.log(err)
			}
		});
	}
	newsContainner()
	
</script>

<style>
	.newsContainner {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	.bannerList {
		height: 320rpx;
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.bannerList swiper {
		width: 100%;
		height: 100%;
	}

	.bannerImage {
		width: 100%;
		height: 100%;
	}

	.newsList {
		display: flex;
		padding: 24rpx;
		margin-bottom: 20rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
	}

	.newsList image {
		width: 140rpx;
		height: 96rpx;
		border-radius: 8rpx;
		margin-right: 24rpx;
		flex-shrink: 0;
		background-color: #f0f0f0;
	}

	.newsContent {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.newsContent view:first-child {
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 1.4;
		margin-bottom: 12rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.newsContent view:last-child {
		font-size: 24rpx;
		color: #999999;
	}

	.btmLabel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		padding: 30rpx 0;
		color: #666666;
		font-size: 28rpx;
		background-color: #ffffff;
		border-top: 1rpx solid #eeeeee;
		z-index: 999;
	}
</style>