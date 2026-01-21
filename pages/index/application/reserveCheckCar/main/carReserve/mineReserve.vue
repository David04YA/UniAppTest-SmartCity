<template>
	<view>
		<view class="" v-if="mineReserveList.value.length == 0">
			"没有预约车哦"
		</view>
		<view v-for="item in mineReserveList" v-else>
			{{item}}
		</view>
	</view>
</template>

<script setup>
	
import { ref } from 'vue';
import { getRequest , getToken } from '../../../../../../utils/request';

 	const mineReserveList = ref()
	const getList = async()=>{
		const res = await getRequest({
			url:"/prod-api/api/traffic/checkCar/apply/list",
			header:{"Context-Type":"application/json","Authorization": await getToken()}
		})
		mineReserveList.value = res.rows
	}
	getList()
</script> 

<style>
	       
</style>
