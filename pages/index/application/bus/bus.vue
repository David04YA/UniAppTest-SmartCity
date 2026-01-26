<template>
	<view>
		<!-- 线路 -->
		<button class="btn" v-for="item in line.rows" :key="item.id" @click="detailLine(item.id)">{{item.name}}号线</button>
	</view>
</template>

<script setup>
	import { ref , reactive , watch } from 'vue';
	import getrequest from '../../../../utils/request';

	const line = ref()

	const getLineList = async()=>{
		try{
			const res = await getrequest({
				url:"/prod-api/api/bus/line/list"
			})
			line.value = res
			console.log(res)
		}catch(error){
			throw error 
		}
	}
	getLineList()
	
	const detailLine = (id)=>{
		uni.navigateTo({
			url:'/pages/index/application/bus/DetailLine?id='+id,
		})
	}
	

	
	

	
</script>

<style>
	       
</style>
