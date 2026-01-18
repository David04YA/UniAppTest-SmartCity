<template>
	<view>
		<view style="text-align: center;s">你要约的车为：{{carid}}</view>
		<button @click ="choiceTime" v-if="!checkTime">选择时间</button>
		<view v-else>你选择的时间：{{checkTime}}</view>
		<button @click ="choiceLocation" v-if="!checkLocation">选择地点</button>
		<view v-else>你选择的地点：{{checkLocation}}</view>
		<button @click ="book" :disabled="!(checkTime || checkLocation)">预约</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad , onShow} from '@dcloudio/uni-app'
 	const carid =  ref()
	onLoad((id)=>{
		carid.value = id.carId
	})
	

	const checkTime = ref()
	const checkLocation = ref()
	
	
	const choiceTime = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carReserve/chocieTimePage'
		})
	}
	
	
	const choiceLocation = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carReserve/choiceLocation'
		})
		
	}
	
	onShow(()=>{
	    checkTime.value = uni.getStorageSync('checkTime')	
		checkLocation.value = uni.getStorageSync('checkLocation')
	})
	
	const book = ()=>{
		uni.removeStorageSync('checkTime')
		uni.removeStorageSync('checkLocation')
	}
	
	
</script>

<style>
	       
</style>
