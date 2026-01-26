<template>
	<view>

		<button @click="carManager()">车辆管理</button>
		<button @click="reserveCar()">立即预约</button>
	</view>
</template>

<script setup>
	const carManager = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carManager/carManager'
		})
	}
	
	const reserveCar = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carReserve/carReserve'
		})
	}
</script>

<style>
	       
</style>
