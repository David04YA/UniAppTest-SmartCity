<template>
	<view class="">
		<!-- <button @click="searchService">搜索</button> -->
		<input v-model="searchText" placeholder="请输入你要搜索的任务" style="text-align: center;"></input>
		<p v-for="(item , key) in  serviceArr" style="display: flow-root;">
			<view class="" style="border-bottom:1px gray solid; text-align: center; font-size: 20px; font-weight: bold; ">
				{{key}}
			</view>
			<p v-for="it in item">
				<p style="float: left;">
					<image style="height: 100px; width: 100px;" :src="'http://121.9.253.236:10001'+it.imgUrl"/>
					<p style="text-align: center;">{{it.serviceName}}</p>
				</p>
			</p>
		</p>
	</view>
</template>

<script setup>
import { ref ,watch } from 'vue';
import { getRequest } from '../../utils/request';

const serviceArr = ref({})
let list = ref([])
let originList = ref([])
const searchText = ref('')

		const searchService = ()=>{
			uni.navigateTo({
				url:'/pages/services/searchService/searchService'
			})
		}

		const Type = (list)=>{
			serviceArr.value = {}
			for(let i = 0;i<list.length;i++){
				if(serviceArr.value[list[i].serviceType] == undefined){
					serviceArr.value[list[i].serviceType]=[]
				}
				serviceArr.value[list[i].serviceType].push(list[i])
			}
		}

		const serviceList = async ()=>{
			const result = await getRequest({
				url:'/prod-api/api/service/list',
				header:{'Context-Type':'application/x-www-form-urlencoded'}
			})
			// console.log(result.rows)
			originList.value = result.rows
			list.value = result.rows
			Type(list.value)
		}
		
		serviceList()

		watch(searchText , (newValue)=>{
			if (searchText.value.trim() == ''){
				Type(originList)
			}else{
				list.value = originList.value.filter(item => item.serviceName == searchText.value)
				Type(list.value)
				console.log(serviceArr.value)
			}
		},50)

		
		
</script>

<style lang="scss" scoped>

</style>