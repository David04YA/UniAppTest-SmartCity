<template>
	<view>
		<view @click="companyDetail(item.id)" style="border: 1px solid gray;width: 100%;height: 80px; overflow: hidden; border-radius: 15px;" v-for="item in companyList">
			<view style="font-size: 18px;font-weight: bold;text-align: center;">{{item.companyName}}</view>
			<view style="color: gray;">{{item.introductory}}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getRequest } from '../../../utils/request';

	const companyList = ref()
	const getCompanyList = async ()=>{
		const res = await getRequest({
			url:'/prod-api/api/job/company/list',
			header:{'Content-Type':'application/x-www-form-urlencoded'}
		})
		console.log(res)
		companyList.value = res.rows
	}
	getCompanyList()
	
	const companyDetail = (id)=>{
		uni.navigateTo({
			url:'/pages/help/job/companyDetail/companyDetail?id='+id
		})
	}
</script>

<style>
	       
</style>
