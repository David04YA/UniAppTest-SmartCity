<template>
	<view>
		<view @click="" v-for="item in adviceList" style="overflow: hidden; border: 1px solid gray; ">
			<view>{{item.content}}</view>
			<view style="font-size: 10px;float: right;left: 100%;">{{item.createTime}}</view>
			<view class="" style="font-size: 10px;float: left;left: 100%;">投诉类型:{{item.appType}}</view>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import  getRequest , {getToken}  from '../../../../utils/request'
	import { ref } from 'vue'
	const adviceList = ref([])
	const urlList = [
		"/prod-api/api/common/feedback/list",
		"/prod-api/api/park/feedback/list",
		"/prod-api/api/metro/feedback/list",
		"/prod-api/api/takeout/feedback/list",
		"/prod-api/api/traffic/feedback/list",
		"/prod-api/api/living/feedback/list",
		"/prod-api/api/movie/feedback/list",
	]
	const getAdviceList = async ()=>{
		for(var i = 0;i<urlList.length;i++){
			const res = await getRequest({
				url:urlList[i],
				header:{
					"Content-Type":"application/x-www-form-urlencoded",
					"Authorization":await getToken()
				}
			})
			// console.log(res)
			for(var j = 0;j< res.rows.length;j++){
				adviceList.value.push(res.rows[j])
			}
			// console.log(adviceList.value)
		}
	}
	
	const adviceDetail = (id , type)=>{
		uni.navigateTo({
			url:"/pages/services/application/govService/mineAdviceDetail?id="+id+"&type="+type
		})
	}
	
	onLoad(()=>{
		getAdviceList()
	})
</script>

<style>
	       
</style>
