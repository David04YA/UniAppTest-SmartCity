<template>
	<view>
		<!-- （十八）任务 18：预约检车功能实现 -->
		<view style="text-align:center; font-size: 32px; ">
			预约须知
		<!-- 模拟须知下拉,测试下拉到底-->
		</view>
		<button @click="nextPage" :disabled="activeBut">已读完，下一页</button>
		<view style="text-align:center; "> 内容</view>
		<button @click="nextPage">已读完，下一页</button>
	</view>
</template>

<script setup>
	import { onReachBottom } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import  getRequest ,{ getToken } from '../../../../utils/request';
	
	
	onReachBottom(()=>{
		activeBut.value = true;
	})
	
	const activeBut = ref(true);
	const context = ref('');
	

	
	const start = async() =>{
		// 接口有问题
		const res = getRequest({
			url:'/prod-api/api/traffic/checkCar/grt',
			header:{"Authorization":await getToken()}
		}) 
		console.log(getToken())
		console.log(res)
	} 
	start()
	
	const nextPage = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/main'
		})
	}
</script>

<style>
	       
</style>
