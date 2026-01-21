<template>
	<view>
	<view class="allservice">
		<view v-for="(item,index) in serviceList" :key="index" @click="handleServiceClick(item,index)" class="service-item">
			<image :src="item.image" mode="aspectFill" class="serviceimg"></image>
			<text class="servicename">{{item.name}}</text>
		</view>
		</view>
		</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import request from '@/utils/request.js';
	const serviceList=ref([])
	const baseUrl = 'http://121.9.253.236:10001';
	const getServices = async () => {
	    try {
			
	        const res = await request({ url: '/prod-api/api/service/list' });
			// console.log(res)
	        const sortedRows = res.rows.sort((a, b) => a.id - b.id);
	        serviceList.value = sortedRows.map(item => ({
	            id: item.id,
	            image: baseUrl + item.imgUrl,
	            name: item.serviceName
	        }));
	    } catch (err) { console.error("服务列表加载失败", err); }
	}
	
	const handleServiceClick = (item, index) => {
	    if (index === 18) {
	        // 这里就是第 19 个服务的逻辑
	        console.log('你点击了第 19 个服务：', item.name);
	        uni.navigateTo({
	            url: '/pages/services/services2/library' // 跳转到特定页面
	        });
	    }
		}	
	onMounted(()=>{
		getServices();
	})
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

</style>