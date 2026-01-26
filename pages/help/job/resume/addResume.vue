<template>
	<view>
		<view>
			<view style="border: 1px solid gray;border-radius: 5px; padding: 10px;">
				<input v-model="address" style="border: 1px solid gray;margin: 3px;border-radius: 5px;" placeholder="请输入居住地址"/>
				<input v-model="education" style="border: 1px solid gray;margin: 3px;border-radius: 5px;" placeholder="请输入学历"/>
				<input v-model="experience" style="border: 1px solid gray;margin: 3px;border-radius: 5px;" placeholder="请输入工作经验"/>
				<input v-model="individualResume" style="border: 1px solid gray;margin: 3px;border-radius: 5px;" placeholder="请输入自我介绍"/>
				<input v-model="money" style="border: 1px solid gray;margin: 3px;border-radius: 5px;" placeholder="请输入期望薪资"/>
			</view>
			<button @click="changeResume()" style="position: absolute;bottom: 0;width: 100%;">添加简历</button>
		</view>
	</view>
</template>

<script setup>
	import  getRequest, { getToken }  from '../../../../utils/request';
	import { reactive, ref } from 'vue';
	
	
	
	const education = ref('')
	const address = ref('')
	const experience = ref('')
	const individualResume = ref('')
	const money = ref('')
	
	
	const changeResume = async ()=>{
		const res = await getRequest({
			url:'/prod-api/api/job/resume',
			method:'POST',
			header:{
				"Content-Type":"application/json",
				"Authorization":await getToken(),
			},
			data:{
				"address":address.value,
				"experience":experience.value,
				"education":education.value,
				"individualResume":individualResume.value,
				"money":money.value
			},
		})
		if(res.code==200){
			uni.showToast({
				title:"修改成功",
			})
			uni.navigateBack(-1)
		}else{
			console.log(res)
			uni.showToast({
				icon:'error',
				title:"似乎出了一些问题"
			})
		}
		console.log(res)
	}
</script>

<style>
	       
</style>
