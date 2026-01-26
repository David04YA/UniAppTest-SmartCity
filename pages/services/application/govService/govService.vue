<template>
	<view>
		<swiper :duration="3000" :autoplay="true" :circular="true" >
			<swiper-item v-for="item in advList" >
				<image :src="getUrl()+item.advImg" style="width: 100%;"></image>
				<view>{{item.advTitle}}</view>
			</swiper-item>
		</swiper>
		<button v-for="item in adviseList" @click="advDetail(item.id)" style="height: 80px;width:25%;display: inline-block;font-size: 10px; padding:20px; ">{{item.type}}</button>
		<button @click="mineAdvice" style="width: 100%;position: absolute;bottom:0">我的投诉</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  getRequest ,{ getUrl } from '../../../../utils/request';
import {onLoad} from '@dcloudio/uni-app'

	const advList = ref([])
	const getAdvList = async()=>{
		const result = await getRequest({
			url:'/prod-api/api/living/rotation/list',
			header:{'Context-Type':'application/x-www-form-urlencoded'}
		})
		// console.log(result)
		advList.value = result.rows
	}
	
	const mineAdvice = ()=>{
		uni.navigateTo({
			url:'/pages/services/application/govService/mineAdvice'
		})
	}
	
	const advDetail = (id) =>{
		uni.navigateTo({
			url:'/pages/services/application/govService/advDetail?id='+id
		})
	}
	
	const adviseList = [
		{id:1,type:"通用投诉"},
		{id:2,type:"停车投诉"},
		{id:3,type:"地铁投诉"},
		{id:4,type:"外卖投诉"},
		{id:5,type:"交管投诉"},
		{id:6,type:"缴费投诉"},
		{id:7,type:"电影投诉"},
	]
	
	
	onLoad((options)=>{
		getAdvList()
	})
</script>

<style>
	       
</style>
