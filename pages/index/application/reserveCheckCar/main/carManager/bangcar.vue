<template>
	<view>
		<input v-model="engineNo" placeholder="请输入发动机型号" ></input>
		<input v-model="plateNo" placeholder="请输入车牌号码" ></input>
		<input v-model="type" placeholder="请输入车型" ></input>
		<button @click="addCar">提交</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getRequest , getToken } from '../../../../../../utils/request';

	const engineNo = ref('')
	const plateNo = ref('')
	const type = ref('')
	
    const addCar =  async()=>{
		if(engineNo.value !== '' || plateNo.value !== '' || type.value !== ''){
			const res = await getRequest({
				url:'/prod-api/api/traffic/car',
				method:'POST',
				header:{"Authorization":await getToken()},
				data:{
					'engineNo':engineNo.value,
					'plateNo':plateNo.value,
					'type':type.value
				}
			})
		}else{
			uni.showToast({
				title:'请输入完整'
			})
		}
	}
</script>

<style>
	       
</style>
