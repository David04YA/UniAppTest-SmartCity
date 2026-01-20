<template>
	<view class="container">
		<view class="inp1">
			<input  class="indexinp"/>
		</view>
		<view class="banner1">
			<swiper :indicator-dots="true" autoplay="true" circular="true">
				<swiper-item v-for="item in bannerList" :key="item.id" @click="handleBanner(item)">
					<image :src="item.image" mode="aspectFill" class="banner-img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="allservice">
			<view v-for="(item,index) in serviceList" :key="index" class="service-item">
				<image :src="item.image" mode="aspectFill" class="serviceimg"></image>
				<text class="servicename">{{item.name}}</text>
			</view>
			<view class="service-item" @click="allser()">
			<image src="/static/logo.png" class="serviceimg" mode="aspectFill" ></image>
			<text class="servicename">更多服务</text>
			</view>
		</view>
		<view class="topic-1">
			<view class="topic-title">热门主题</view>
			<view class="topic-2">
			<view v-for="(item,index) in topicList" :key="index" class="topic-3">
				<image :src="item.image" mode="aspectFill" class="topic-img"></image>
				<text class="servicename ellipsis">{{item.name}}</text>
			</view>
		</view>
		</view>
		<view class="allnews">
			<view class="news-title">新闻列表</view>
			<view class="fullnews">
			<view v-for="(item,index) in newsList" :key="index" class="news-item">
				<text class="newsname">
					{{item.name}}
				</text>
				<view class="newsbit">
				<text class="newslaji">{{item.time}}</text>
				<text class="newslaji">阅读量:{{item.readsum}}</text>
				</view>
				<image :src="item.img" mode="aspectFill" class="newsimg">
				</image>
				<rich-text :nodes="item.content" class="newscontent"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onMounted, ref} from 'vue';
// import request from '@/utils/request.js';

const baseUrl='http://121.9.253.236:10001';
const bannerList = ref([]);
const serviceList=ref([]);
const topicList=ref([]);
const newsList=ref([])
// const getBanners = async () =>{
// 	const data = await request('/banner');
// 	bannerList.value = data;
// }

const getBanners = () => {uni.request({
	url: `${baseUrl}/prod-api/api/rotation/list?type=2`,
	method: 'GET',
	data: {},
	success: (res) => {
		if(res.data.code === 200){
			// console.log(res.data)
			bannerList.value = res.data.rows.map((item,index) =>{
				let targetPath = '/pages/index/index'
				
					if (index === 0){
						targetPath = '/pages/index/index'
					}
					else if (index === 1){
						targetPath = '/pages/services/services'
					}
					else if (index === 2){
						targetPath = '/pages/news/news'
					}
					else if (index === 3){
						targetPath = '/pages/services/services'
					}
				
				// return一个新对象,这个对象我们写了四个属性 id...
				return{
					id:item.id,
					image:baseUrl+item.advImg,
					title:item.advTitle,
					target: targetPath  //实现不同的跳转
				}
			})
		}
	},
	fail: () => {},
	complete: () => {}
});}
const getServices = () => {
	uni.request({
		url: baseUrl+'/prod-api/api/service/list',
		method: 'GET',
		data: {},
		success: res => {
			// console.log(res.data)
			// serviceList.value=res.data.rows.map((item,index) =>{
				const sortedRows = res.data.rows.sort((a,b)=> a.id-b.id);
				// .map() .sort()
				serviceList.value = sortedRows.map(item => {
					return {
						id:item.id,
						image:baseUrl +item.imgUrl,
						name:item.serviceName
					}
				}).slice(0,9);
				
		},
		fail: () => {},
		complete: () => {}
	});
}
const getnews = ()=>{
	uni.request({
		url: baseUrl+'/prod-api/press/press/list',
		method: 'GET',
		data: {},
		success: res => {
			console.log(res.data)
			newsList.value=res.data.rows.map(item =>{
				return{
					img:baseUrl+item.cover,
					name:item.title,
					content:item.content,
					readsum:item.readNum,
					time:item.publishDate
				}
				
			})
			
		},
		fail: () => {},
		complete: () => {}
	});
}

const handleBanner = (item) => {
	// console.log(item.target)
	uni.navigateTo({
		url:item.target,
		fail: () => {
			uni.switchTab({
				url:item.target
			});
		}
	});
}

const thetopic = () => {
	uni.request({
		url: baseUrl+'/prod-api/api/takeout/theme/list',
		method: 'GET',
		data: {},
		success: res => {
			// console.log(res.data)
			topicList.value=res.data.data.map(item => {
				return{
					image:baseUrl+item.imgUrl,
					name:item.themeName,
				}
			})
		},
		fail: () => {},
		complete: () => {}
	});
}

function allser (){
	uni.navigateTo({
		url: '/pages/services/services',
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

const handleTopic=(item) =>{
	uni.navigateTo({
		url: '/pages/topic',
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
};
onMounted(()=> {
		getBanners();
		getServices();
		thetopic();
		getnews();
	});
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		// justify-content: center;
		flex-direction: column;
		align-items: center;
		//display justify-content align-items flex-direction
		min-height: 100vh;
		// min-height vh
	}
	.inp1{
		display: flex;
		justify-content: center;
	}
	.indexinp{
		 background-color: white;
		 border: 1px solid blue;
		 border-radius: 5%;
		 width: 50%;
		 height: 30rpx;
	 }
	.banner1{
		 width: 100%;
		 // height: 100%;
		 height: 350rpx;
		 margin-top: 10rpx;
		 // justify-content: center;
		 swiper{
			 width: 100%;
			 height: 100%;
			 border-radius: 15rpx;
			 overflow: hidden;
		 }
	 }
	.banner-img{
		 width: 100%;
	 }
	.allservice{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;
		background-color: #fff;
		padding: 30rpx 0; 
		// flex:1;
		// flex默认水平 wrap换行 flex1 扩张完剩下的画面
			
			.service-item{
				width: 20%;
				// height: 20%;
				display: flex;
				flex-direction: column;
				//width20%每行5个 direciton 子元素垂直排列
				margin-bottom: 40rpx;
				// /下边距
			}
			
			.serviceimg{
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
				margin-bottom: 10rpx;
			}
			.servicename{
				font-size: 24rpx;
				color: #333;
			}
	}
	.topic-1{
				width: 100%;
				padding: 20rpx;
				background-color: #fff;
					.topic-title{
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 20rpx;
						// left: 50%;
						text-align: center;
											
					}
					.topic-2{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
					}
					.topic-3{
						width: 48%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 30rpx;
						 
						 //当屏幕宽度大于768px时
						 @media screen  and (min-width:768rpx){
						 	width:23% //每行4个
						 }
						 .topic-img{
							 width: 100%;
							 height: 200rpx;
							 border-radius: 40rpx;
						 }
						 .ellipsis{
							 overflow: hidden;
							 white-space: nowrap;
							 text-overflow: ellipsis;
						 }
					}
					}
			.allnews{
				width: 100%;
				padding: 20rpx;
				background-color: #fff;
				.news-title{
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
					text-align: center;
				}
				.fullnews{
					display: flex;
					flex-direction: column;
				}
				.news-item{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					width: 100%;
					margin-bottom: 30rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #eee;
				}
				.newsimg{
					width: 100%;
					height: 400rpx;
					border-radius: 12rpx;
					margin-bottom: 15rpx;
				}
				.newsname{
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
					margin-top: 15rpx;
				}
				
					.newscontent {
					    font-size: 24rpx;
					    color: #666;
					    line-height: 1.5;
					    display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2; 
					    overflow: hidden;
					}
				.newsbit{
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					width: 100%;
				}
				.newslaji{
					font-size: 19rpx;
					margin-left: 20rpx;
					
				}
				}
</style>
