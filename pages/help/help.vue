<template>
	<view class="" style="text-align: center;">
		<swiper>
			<swiper-item v-for="item in advList">
				<image style="width: 100%;" :src="getUrl() + item.advImg"></image>
			</swiper-item>
		</swiper>
		<view style="display: flex; justify-content: center;">
			<view @click="job" style="float: left ; margin: 10px;">
				<image src="/static/images/公司.svg" style="height: 60px;width: 60px;"></image>
				<view style="color: gray;">去找工作</view>
			</view>
			<view @click="resume" style="float: left ; margin: 10px;">
				<image src="/static/images/简历.svg" style="height: 60px;width: 60px;"></image>
				<view style="color: gray;">我的简历</view>
			</view>
			<view @click="deliver" style="float: left ; margin: 10px;">
				<image src="/static/images/快速发信息.svg" style="height: 60px;width: 60px;"></image>
				<view style="color: gray;">投的简历</view>
			</view>
			<view style="float: left ; margin: 10px;">
				<image src="/static/images/扶贫.svg" style="height: 60px;width: 60px;"></image>
				<view @click="nothing()" style="color: gray;">招募消息</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  getRequest , {getUrl} from '../../utils/request';
import {onLoad} from '@dcloudio/uni-app'

	const advList = ref()
	const getAdvList = async()=>{
		const result = await getRequest({
			url:"/prod-api/api/takeout/rotation/list",
			header:"application/x-www-form-urlencoded"
		})
		advList.value = result.rows
		console.log(advList.value)
	} 
	
	const job = ()=>{
		uni.navigateTo({
			url:'/pages/help/job/job'
		})
	}
	const resume = ()=>{
		uni.navigateTo({
			url:'/pages/help/job/resume/resume'
		})
	}
	const deliver = ()=>{
		uni.navigateTo({
			url:'/pages/help/job/deliver/deliver'
		})
	}
	
	const nothing = () =>{
		uni.showToast({
			icon:"fail",
			title:"还没有人想要你"
		})
	}

	
	onLoad(()=>{
		getAdvList()
	})
	
		
</script>

<style lang="scss" scoped>

</style>