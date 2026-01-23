<template>
	<view class="page-container">
		<view class="header-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">&lt;</text>
			</view>
			<view class="title">数字图书馆</view>
			<view class="placeholder"></view>
		</view>

		<view class="lib-list">
			<view class="lib-card" v-for="(item, index) in LibraryList" :key="index" @click="goDetail(item)">
				<image :src="item.img" mode="aspectFill" class="lib-img"></image>
				<view class="lib-info">
					<view class="lib-name-row">
						<text class="lib-name">{{ item.name }}</text>
						<text :class="['state-tag', item.state === '1' ? 'open' : 'closed']">
							{{ item.state === '1' ? '营业中' : '休息中' }}
						</text>
					</view>
					<view class="lib-detail"><text class="label">营业时间：</text>{{ item.time }}</view>
					<view class="lib-detail"><text class="label">地址：</text>{{ item.address }}</view>
				</view>
			</view>
		</view>

		<view v-if="showDetail && selectedLibrary" class="detail-overlay">
			<view class="detail-header">
				<text class="close-btn" @click="closeDetail">关闭</text>
				<text class="detail-title">图书馆详情</text>
				<view style="width: 80rpx;"></view>
			</view>
			<scroll-view scroll-y="true" class="detail-content">
				<view class="map-box">
					<movable-area class="movable-area">
						<movable-view class="movable-view" direction="all" scale="true" scale-min="1" scale-max="4">
							<image :src="selectedLibrary.map" mode="widthFix" class="map-img"></image>
						</movable-view>
					</movable-area>
					<view class="zoom-tips">提示：双指捏合可缩放图片</view>
				</view>
				<view class="info-section">
					<view class="action-section">
						<button class="comment-btn" @click="">评论</button>
					</view>
					<view class="name-box">
						<text class="name">{{ selectedLibrary.name }}</text>
						<text :class="['state-tag', selectedLibrary.state === '1' ? 'open' : 'closed']">
							{{ selectedLibrary.state === '1' ? '营业中' : '休息中' }}
						</text>
					</view>
					<view class="info-item">
						<text class="label">📍 地址：</text>
						<text class="text">{{ selectedLibrary.address }}</text>
					</view>
					<view class="info-item">
						<text class="label">⏰ 营业时间：</text>
						<text class="text">{{ selectedLibrary.time }}</text>
					</view>
					<view class="info-item desc-box">
						<text class="label">📖 图书馆介绍：</text>
						<text class="description">{{ selectedLibrary.description }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from '@/utils/request.js';

const LibraryList = ref([]);
const baseUrl = 'http://121.9.253.236:10001';
const showDetail = ref(false);
const selectedLibrary = ref(null);

const getLibrary = async () => {
	try {
		const res = await request({ url: '/prod-api/digital_library/library/list' });
		const sorted = res.rows.sort((a, b) => parseFloat(b.businessState) - parseFloat(a.businessState));
		console.log(res)
		LibraryList.value = sorted.map((item) => ({
			name: item.name,
			address: item.address,
			time: item.businessHours,
			state: item.businessState,
			img: baseUrl + item.imgUrl,
			map: baseUrl + item.mapUrl,
			description: item.description,
		}));
	} catch (err) { console.log(err); }
};

const goBack = () => { uni.navigateBack(); };

const goDetail = (item) => {
	selectedLibrary.value = item;
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
	selectedLibrary.value = null;
};

onMounted(() => { getLibrary(); });
</script>
<style lang="scss" scoped>
	
.header-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 10;
	.back-icon { font-size: 40rpx; }
	.title { font-weight: bold; font-size: 32rpx; }
	.placeholder { width: 40rpx; }
}

.lib-list {
	padding: 20rpx;
	.lib-card {
		display: flex;
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 12rpx;
		
		.lib-img {
			width: 200rpx;
			height: 160rpx;
			border-radius: 8rpx;
			flex-shrink: 0;
		}
		
		.lib-info {
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.lib-name-row {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.lib-name { font-weight: bold; font-size: 28rpx; width: 260rpx; }
			}
			
			.lib-detail {
				font-size: 22rpx;
				color: #666;
				.label { color: #999; }
			}
			
			.state-tag {
				font-size: 20rpx;
				padding: 4rpx 10rpx;
				border-radius: 4rpx;
				&.open { background-color: #e7faf0; color: #13ce66; }
				&.closed { background-color: #fef0f0; color: #f56c6c; }
			}
		}
	}
}
.detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #f8f8f8;
    z-index: 1000;
    display: flex;
    flex-direction: column;

    .detail-header {
        height: 88rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30rpx;
        background-color: #fff;
        border-bottom: 1rpx solid #eee;
        .close-btn { color: #007aff; font-size: 30rpx; }
        .detail-title { font-weight: bold; }
    }

    .detail-content {
        flex: 1;
        overflow: hidden;
    }

    .map-box {
        width: 100%;
        height: 500rpx;
        background-color: #000;
        position: relative;
        
        .movable-area { width: 100%; height: 100%; }
        .movable-view { width: 100%; height: 100%; display: flex; align-items: center; }
        .map-img { width: 100%; }
        
        .zoom-tips {
            position: absolute; bottom: 20rpx; right: 20rpx;
            background: rgba(0,0,0,0.5); color: #fff;
            padding: 4rpx 12rpx; font-size: 20rpx; border-radius: 20rpx;
        }
    }

    .info-section {
        padding: 30rpx;
        background: #fff;
        
        .name-box {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 30rpx;
            .name { font-size: 36rpx; font-weight: bold; }
        }

        .info-item {
            margin-bottom: 20rpx;
            font-size: 28rpx;
            .label { color: #888; display: block; margin-bottom: 10rpx; }
            .text { color: #333; line-height: 1.5; }
            .description { color: #555; line-height: 1.8; text-indent: 2em; display: block;}
        }
		.action-section{
			margin-top: 5rpx;
			padding-bottom: 40rpx;
		.comment-btn{
			// pointer-events: auto; //
			background-color: #007aff;
			color: #fff;
			border-radius: 50rpx;
			font-size: 30rpx;
			height: 88rpx;
			line-height: 88rpx;
			box-shadow: 0 4rpx 12rpx rgba(0,122,255,0.3);
			
			&:active{
				opacity: 0.5;
			}
			}
		}
		
    }
}
</style>