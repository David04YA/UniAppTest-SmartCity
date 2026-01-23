<template>
	<view class="container"> <!-- 垂直排列 -->
	
	<view class="rotation">
	<swiper :indicator-dots="true" autoplay="true" circular="true">
		<swiper-item v-for="(item,index) in rotationList" :key="index">
			<image :src="item.img" mode="aspectFill" class="banner-img"></image>
			<view class="name-card">
			<text class="rotationName">{{item.title}}</text>
			</view>
		</swiper-item>
	</swiper>
	</view> <!-- 轮播图 -->
	
	<view class="activity-area"><!-- 两个活动区域 水平排列 -->
	
	<view class="activity-type"></view> <!-- 活动分类 垂直排列 -->
	<view class="activity-list"></view>
	
	</view>
	
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import request from '@/utils/request.js';
const baseUrl='http://121.9.253.236:10001';
const CompaignList =ref([]);
const rotationList=ref([]);

const getactivity = async ()=>{
	try{
		const res1 = await request({url:'/prod-api/api/activity/category/list'})
		console.log(res1)
		CompaignList.value=res1.data.map((item) =>({
			name:item.name,
			img:item.imgUrl || ""
		}
		
		))
	}catch(err){
		console.log(err)
	}
}
const getRotation=async ()=>{
	try{
		const res2 = await request({url:'/prod-api/api/activity/rotation/list'})
		// console.log(res2)	
		rotationList.value=res2.rows.map((item)=>({
			img:baseUrl+item.advImg,
			title:item.advTitle,
			
		}))
	}catch(err){
		console.log(err)
	}
}
onMounted(()=>{
	getactivity();
	getRotation()
})
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-direction: column;
	
	
	.rotation{
		width: 100%;
		swiper{
			height: 350rpx;
		}
		.banner-img{
			width: 100%;
			height: 100%; 
			//图片全部显示
		}
		.name-card{
			position: absolute;
			bottom: 0;
			left: 0%;
			width: 100%;
			background-color: rgba(179, 255, 255, 0.5);
			// border-radius: 10rpx;
			.rotationName{
				font-size: 24rpx;
				font-weight: bold;
				// text-align: center;
			}
		}
	}
}
</style>