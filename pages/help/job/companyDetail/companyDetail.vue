<template>
	<view>
		<view style="text-align: center;font-weight: bold;font-size: 25px;" >{{companyDetail.companyName}}</view>
		<view>{{companyDetail.introductory}}</view>
		<button @click="send(companyDetail.id,companyDetail.companyName)" style="position: absolute;bottom: 0;width: 100%;">发送简历</button>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { getRequest } from '../../../../utils/request';

	const companyDetail = ref()

	
	onLoad((options)=>{
		getCompanyDetail(options.id)
	})
	
	const getCompanyDetail = async(id)=>{
		const result = await getRequest({
			url:"/prod-api/api/job/company/"+id,
			header:{"Content-Type":"application/x-www-form-urlencoded"}
		})
		// console.log(result)
		companyDetail.value = result.data
	}
	
	const send = (id,name)=>{
		uni.navigateTo({
			url:"/pages/help/job/deliver/addDeliver?id="+id+"&name="+name
		})
	}
</script>

<style>
	       
</style>
