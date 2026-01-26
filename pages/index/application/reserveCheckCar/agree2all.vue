<template>
	<view :class="{disp:dispact}">
		<view style="text-align:center; font-size: 32px; ">
			预约须知
		</view>
		<button @click="nextPage" :disabled="activeBut">已读完，下一页</button>
				<!-- 模拟须知下拉,测试下拉到底-->
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<view style="text-align:center; "> 内容</view>
		<button @click="nextPage" :disabled="activeBut">已读完，下一页</button>
	</view>
</template>

<script setup>
	import { onReachBottom } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	
	onReachBottom(()=>{
		activeBut.value = !activeBut.value
	})
	
	const activeBut = ref(true);
	const dispact = ref(false)
	
	const nextPage = ()=>{
		dispact.value = !dispact.value
	}
</script>

<style>
   .disp{
	   display: none;
   }
</style>
