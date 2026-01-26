<template>
	<view>
		<!-- <input placeholder="请输入要搜索的服务" v-model="searchText"/> -->
		<textarea name="" id="" cols="30" rows="10"  v-model="searchText" style="height: 80px; font-size: 50px;" maxlength="20"></textarea>
		<p v-for="it in list">
			<p style="float: left;">
				<image style="height: 100px; width: 100px;" :src="'http://121.9.253.236:10001'+it.imgUrl"/>
				<p style="text-align: center;">{{it.serviceName}}</p>
			</p>
		</p>
	</view>
</template>

<script setup>
import { computed, ref ,watch } from 'vue';
import  getRequest  from '../../../utils/request';

	const list = ref([])
	let resultList = []
	const searchText = ref('')
	
	
	const serviceList = async ()=>{
		const result = await getRequest({
			url:'/prod-api/api/service/list',
			header:{'Context-Type':'application/x-www-form-urlencoded'} 
		})
		resultList = result.rows
		list.value = resultList
	}
	serviceList()
	
	watch(searchText,()=>{
		if(searchText.value.trim() == ''){
			list.value = resultList
			return 1;
		}
		// for (var index = 0; index < list.value.length; index++) {
		// 	if(!list.value[index].serviceName.includes(searchText.value)
		// 	 // || list.value[index].serviceType.includes(searchText.value) || list.value[index].serviceDesc.includes(searchText.value)
		// 	 ){
		// 		list.value.splice(index,1)
		// 	}
		// }
		list.value = list.value.filter(item => item.serviceName == searchText.value)
	},50)

</script>

<style>
	       
</style>
