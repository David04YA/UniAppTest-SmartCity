<!-- 废弃 -->
<template>
	<view>
		<button @click="addTime">设置时间</button>
	</view>
</template>

<script setup>
	const addTime = ()=>{
		uni.setStorageSync('checkTime',Date.now(1000*60*60*24))
		uni.navigateBack(-1)
	}
</script>

<style>
	       
</style>
