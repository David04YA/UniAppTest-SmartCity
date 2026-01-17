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
		<view class="bus mission16">
			
		</view>
	</view>
</template>

<script setup>
import {onMounted, ref} from 'vue';
// import request from '@/utils/request.js';

const baseUrl='http://121.9.253.236:10001';
const bannerList = ref([]);

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
			console.log(res.data)
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
const handleBanner = (item) => {
	console.log(item.target)
	uni.navigateTo({
		url:item.target,
		fail: () => {
			uni.switchTab({
				url:item.target
			});
		}
	});
}
onMounted(()=> {
		getBanners();
	});
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		// justify-content: center;
		flex-direction: column;
		align-items: center;
		//display justify-content align-items flex-direction
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
</style>
