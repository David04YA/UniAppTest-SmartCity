<template>
	<view>

		<button @click="carManager()">车辆管理</button>
		<!-- <button @click="bangoCar()">车辆绑定</button> -->
	</view>
</template>

<script setup>
	const carManager = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carManager/carManager'
		})
	}
	
	const bangoCar = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carManager/bangcar'
		})
	}
</script>

<style>
	       
</style>
