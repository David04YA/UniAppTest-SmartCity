<template>
	<view>
		<!-- 线路 -->
		<button class="btn" v-for="item in line.rows" :key="item.id" @click="detailLine(item.id)">{{item.name}}号线</button>
	</view>
</template>

<script setup>
	import { ref , reactive , watch } from 'vue';
	import { getRequest } from '../../../../utils/request';

	const line = ref()

	const getLineList = async()=>{
		try{
			const res = await getRequest({
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
