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
	import { onLoad , onShow } from '@dcloudio/uni-app';
	import  getRequest ,{ getToken } from '../../../../../../utils/request';
	
	
		const engineNo = ref('')
		const plateNo = ref('')
		const type = ref('')
		const itemid = ref()
		
	    const addCar =  async()=>{
			if(engineNo.value !== '' || plateNo.value !== '' || type.value !== ''){
				const res = await getRequest({
					url:'/prod-api/api/traffic/car',
					method:'PUT',
					header:{"Authorization":await getToken()},
					data:{
						'engineNo':engineNo.value,
						'plateNo':plateNo.value,
						'type':type.value,
						'id':itemid.value.id
					}
				})
				if(res.code==200){
					uni.navigateBack(-1)
				}else{
				uni.showToast({
					title:'请求失败'
				})
			}
			}else{
				uni.showToast({
					title:'请输入完整'
				})
			}
		}
		
		onLoad(id =>{
			// console.log(id)
			itemid.value = id
			console.log(itemid.value)
		})
		

</script>

<style>
	       
</style>
