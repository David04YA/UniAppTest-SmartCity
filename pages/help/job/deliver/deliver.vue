<template>
	<view>
		<view v-for="item in deliverList" style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">
			
			<view v-if="item.companyName"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">公司:{{item.companyName}}</view>
			<view v-else  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">公司名未填写</view>
			
			<view v-if="item.postName"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">岗位:{{item.postName}}</view>
			<view v-else  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">岗位未填写</view>
			
			<view v-if="item.satrTime"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">投递时间:{{item.satrTime}}</view>
			<view v-else  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">???</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  getRequest, {getToken } from '../../../../utils/request';
import { getUserInfo } from '../../../../utils/userInfo';

	
	const deliverList = ref([])
	
	const getDeliverList = async()=>{
		const result = await getRequest({
			url:"/prod-api/api/job/deliver/list",
			header:{"Content-Type":"application/x-www-form-urlencoded",
					"Authorization":await getToken()},
		})
		// console.log(result)
		var id = await getUserInfo()
		// console.log(id)
		for(let i =0; i<result.rows.length;i++){
			if(result.rows[i].userId == id.userId){
				deliverList.value.push(result.rows[i])
			}
		}
		console.log(deliverList.value)
	}
	getDeliverList()
	
	
</script>

<style>
	       
</style>
