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
	<view>
	<view class="type-title">活动分类</view>	
	<view class="activity-type"><!-- 水平排列 -->
	<view v-for="(item,index) in CompaignList" :key="index" class="type-card"> <!-- 垂直排列 -->
		<image :src="item.img" class="type-img"></image>
		<view class="name">
		<text class="type-name">{{item.name}}</text></view>	
	</view>
	</view> <!-- 活动分类 垂直排列 -->
	</view>
	<view>
	<view class="type-title">活动列表</view>
	<view class="activity-list"> <!-- 垂直 -->
		<view class="activity-vfor" v-for="(item,index) in activityList" :key="index" @click="goDetail(item)"> <!-- 垂直 -->
			<view class="list-name">{{item.name}}</view>
			<view class="list-img">
				<image :src="item.img"></image>
			</view>
			<!-- <text></text> -->
		</view>
	</view>
	</view>
	</view>
	
<view class="detail-overlay" v-if="showDetail && selectedDetail.name">
    <view class="detail-header">
        <view class="back-btn" @click.stop="showDetail = false">
            <text class="icon"><</text>
            <text class="text">返回</text>
        </view>
        <view class="title">{{selectedDetail.name}}</view>
    </view>
		
		<!-- <view></view> -->
		<view class="detail-content">
			<rich-text :nodes="String(selectedDetail.content)"></rich-text>
			<view class="detail-img">
				<img :src="selectedDetail.img" alt="" />
			</view>
		</view>
	</view>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import request from '@/utils/request.js';
// import { act } from 'react';
const baseUrl='http://121.9.253.236:10001';
const CompaignList =ref([]);
const rotationList=ref([]);
const activityList=ref([]);
const showDetail=ref(false);
const selectedDetail=ref(null);
const svgList=[{name:'商务',img:'/static/images/shangwu.svg'},
{name:'生活',img:'/static/images/shenghuo.svg'},
{name:'亲子',img:'/static/images/qinzi.svg'},
{name:'校园',img:'/static/images/xiaoyuan.svg'},
{name:'行业',img:'/static/images/hangye.svg'},
{name:'学习',img:'/static/images/xuexi.svg'}
]

const getactivity = async ()=>{
	try{
		const res1 = await request({url:'/prod-api/api/activity/category/list'})
		// console.log(res1);
		CompaignList.value=res1.data.map((item) =>{
			const localIcon=svgList.find(svg =>svg.name===item.name);
			const imgSource = item.imgUrl ? (baseUrl + item.imgUrl) : (localIcon ? localIcon.img : '');	
			return{
				name:item.name,
				img:imgSource,
				
			}
		}
		)
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
const getactivitylist =async ()=>{
	try{
		const res2=await request({url:'/prod-api/api/activity/activity/list'})
		// console.log(res2)
		activityList.value=res2.rows.map((item) =>{
			return{
				name:item.name,
				content:item.content,
				img:baseUrl+item.imgUrl
			}
			
		})
		// console.log(activityList.value)
		// console.log(activityList)
	}catch(err){
		console.log(err)
	}
}

const goDetail=(item)=>{
	selectedDetail.value=item
	showDetail.value=true;
}
onMounted(()=>{
	getactivity();
	getRotation();
	getactivitylist();
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
	.activity-area{
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.type-title{
			display: flex;
			text-align: center;
			flex-direction: column;
			width: 100%;
			// justify-content: center;
			align-items: center;
			// text-align: center;   // 文字水平居中
			font-size: 32rpx;     
			font-weight: bold;
			padding: 20rpx 0;     
			color: #333;
		}
		.activity-type{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			height: auto;
			.type-card{
				display: flex;
				flex-direction: column;
				width: 48%;
				padding: 20rpx 0; 
				background-color: #f8f8f8;
				margin-bottom: 20rpx;   
				padding: 20rpx 0;
				border-radius: 12rpx;
				align-items: center;
				.type-img{
					width: 100rpx;
					height: 80rpx;
					margin-bottom:-10rpx;
					
				}
				.name{
					display: flex;
					justify-content: center;
					.type-name{
						font-size: 30rpx;
						// font-weight: bold;
						color: #ccc;
					}
				}
				
			}
		}
	}
		.activity-list{
			display: flex;
			flex-direction: column;
			height: auto;
			margin-top: 30rpx;
			.activity-vfor{
				margin-bottom: 30rpx;
				box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
				background-color: rgba(224, 224, 255, 0.2);
				display: flex;
				flex-direction: column;
				.list-name{
					font-size: 30rpx;
					    color: #333;
					    margin-bottom: 10rpx;
						text-align: center;	
				}
				.list-img{
					display: flex;
					// flex-direction: row;
					// align-items: center;
					justify-content: center;
					margin-top: 10rpx;
					left: 0;
					width: 100%;
					image{
						width: 50%;
						height: 350rpx;
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
	    background-color: #ffffff; // 设为纯白
	    z-index: 9999; // 提高层级，确保在最顶层
	    overflow-y: auto;
	    display: block; // 避开 flex 可能导致的递归布局问题
	
	    .detail-header {
	        position: sticky; // 固定在顶部
	        top: 0;
	        display: flex;
	        align-items: center;
	        background-color: #ffffff;
	        padding-top: var(--status-bar-height); // 关键：留出手机状态栏高度
	        height: 100rpx;
	        border-bottom: 1px solid #eee;
	        z-index: 10000;
	
	        .back-btn {
	            display: flex;
	            align-items: center;
	            padding: 0 30rpx;
	            color: #007aff; // 蓝色文字更显眼
	            
	            .icon {
	                font-size: 40rpx;
	                margin-right: 10rpx;
	            }
	            .text {
	                font-size: 30rpx;
	            }
	        }
	
	        .title {
	            flex: 1;
	            text-align: center;
	            padding-right: 120rpx; // 偏移补差，让文字居中
	            font-weight: bold;
	            font-size: 32rpx;
	            /* 防止标题过长溢出 */
	            white-space: nowrap;
	            overflow: hidden;
	            text-overflow: ellipsis;
	        }
	    }
	
	    .detail-content {
	        padding: 30rpx;
	        line-height: 1.6;
	    }
	}
		
}
</style>