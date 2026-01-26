<template>
	<view>
		<view @click="resumeDetail(resume.id)" style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">
			<view  style="font-size: 10px;" >用户名:{{user.nickName}}</view>
			<view  style="font-size: 10px;" >电话:{{user.phonenumber}}</view>
			<view v-if="resume.address"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >地址:{{resume.address}}</view>
			<view v-else style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">地址未填写</view>
			
			<view v-if="resume.education"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >学历:{{resume.education}}</view>
			<view v-else style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">学历未填写</view>
			
			<view v-if="resume.experience"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >工作经验:{{resume.experience}}</view>
			<view v-else style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">工作经验未填写</view>
			
			<view v-if="resume.money"  style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >工作经验:{{resume.money}}</view>
			<view v-else style="border: 1px solid gray ; padding: 10px; border-radius: 5px;">期望薪资未填写</view>
			
			<view v-if="resume.individualResume" style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >简历简介:{{resume.individualResume}}</view>
			<view v-else style="border: 1px solid gray ; padding: 10px; border-radius: 5px;" >简历简介未填写</view>
		</view>
		
		<button v-if="checkResume" @click="addResume" style="position: absolute; bottom: 0px; width: 100%;">新增简历</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  getRequest, { getToken }  from '../../../../utils/request';
import { getUserInfo } from '../../../../utils/userInfo';

	const resume = ref()
	const user = ref()
	const hasResume = ref(false)
	const getResume = async ()=>{
		user.value = await getUserInfo();
		
		const res = await getRequest({
			url:"/prod-api/api/job/resume/queryResumeByUserId/" + user.value.userId,
			header:{"Content-Type":"application/x-www-form-urlencoded",
					"Authorization": await getToken()}
		})
		console.log(res)
		resume.value = res.data
	}
	getResume()
	// console.log(getUserInfo())
	
	const resumeDetail = (id)=>{
		console.log(id)
		uni.navigateTo({
			url:'/pages/help/job/resume/resumeDetail?id='+id
		})
	}
	
	const checkResume = (id)=>{
		if(id == undefined){
			hasResume.value = false
		}
	}
</script>

<style>
	       
</style>
