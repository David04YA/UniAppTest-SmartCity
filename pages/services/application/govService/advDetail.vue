<template>
	<view>
		<input v-model="title" placeholder="请输入你要反馈的标题" style="text-align: center;height: 50px;"/>
		<textarea v-model="content" placeholder="请输入你要反馈内容" style="border: 1px solid gray; width: 100%;"></textarea>
		<label>
			<checkbox @click="onChangeStatus">保证上述如实</checkbox>
		</label>
		<button @click="addAdvice()" :disabled="act">提交</button>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import  getRequest,{ getToken } from '../../../../utils/request';
import { ref } from 'vue';
	
	let typeId ;
	const title = ref('')
	const content = ref('')
	const act = ref(true)
	const addAdvice = async()=>{
		const result = await getRequest({
			url:advUrlList[typeId-1],
			method:'POST',
			header:{
				"Content-Type":"application/json",
				"Authorization": await getToken(),
			},
			data:{
				"content":content.value,
				"title":title.value,
			}
		})
		if(result.code == 200){
			uni.showToast({
				title:result.msg
			})
		}
	}
	
	const onChangeStatus = ()=>{
		act.value = !act.value
	}
	
	const advUrlList=[
		"/prod-api/api/common/feedback",
		"/prod-api/api/park/feedback",
		"/prod-api/api/metro/feedback",
		"/prod-api/api/takeout/feedback",
		"/prod-api/api/traffic/feedback",
		"/prod-api/api/living/feedback",
		"/prod-api/api/movie/feedback"
	]
	
	onLoad((options)=>{
		typeId = options.id
		// console.log(typeId)
	})
</script>

<style>
	       
</style>
