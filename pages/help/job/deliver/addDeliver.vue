<template>
	<view>
		<view style="text-align: center;font-weight: bold;font-size: 30px;">{{companyName}}</view>
		<view style="border: 1px solid gray;border-radius: 5px; padding: 10px;">
			<input v-model="money" style="height: 50px;border: 1px solid gray; margin: 3px; border-radius: 5px;font-size: 20px;" placeholder="请输入期望薪资"/>
			<view style="text-align: center;height: 50px;font-size: 20px;">你选择了:{{postList[selectIndex].professionName}}</view>
			<picker-view @change="onChange" style="height: 100px; background-size: 1px;" indicator-style="height: 50px;" :value="[selectIndex]" >
				<picker-view-column   >
					<view v-for="(item , index ) in postList" :key="index" style="text-align: center;line-height: 50px;">
						{{item.professionName}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
	<view class="">
		{{selectPostName}}
	</view>
	<button @click="addDeliver">提交</button>
</template>

<script setup>
// http://localhost:5173/#/pages/help/job/deliver/addDeliver?id=1&name=%E6%96%B0%E5%9E%8B%E6%8A%80%E6%9C%AF%E5%85%AC%E5%8F%B8
	import {onLoad} from '@dcloudio/uni-app'
	import  getRequest  , {getToken} from '../../../../utils/request';
	import { ref } from 'vue';

	var id ;
	var companyName ;
	const money = ref('3000')
	const selectIndex = ref(0)
	
	const postList = ref([])
	onLoad((options)=>{
		id = options.id
		companyName = decodeURIComponent(options.name)
		console.log(id)
		console.log(companyName)
	})
	
	const getPostList = async()=>{
		const result = await getRequest({
			url:'/prod-api/api/job/profession/list',
			header:{"Content-Type":"application/x-www-form-urlencoded",
					"Authorization": await getToken()
			}
		})
		postList.value = result.rows
		console.log(postList.value)
	}
	getPostList()
	
	const selectJob = (name,job)=>{
		selectPostId.value = job
		selectPostName.value = name
	}
	
	const onChange = (e)=>{
		selectIndex.value = e.detail.value[0]
	}
	
	const addDeliver = async ()=>{
		const time = new Date()
		console.log(time)
		// console.log(`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`)
		
		const result = await getRequest({
			url:'/prod-api/api/job/deliver',
			method:"POST",
			header:{"Content-Type":"application/json",
					"Authorization": await getToken()},
			data:{
				"companyId": id,
				"companyName": companyName,
				"money": money.value,
				"postName":postList.value[selectIndex.value].professionName,
				"postId": postList.value[selectIndex.value].id,
				"satrTime": `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
			}
		})
		if(result.code == 200){
			uni.showToast({
				icon:'none',
				title:result.msg
			})
		}else{
			uni.showToast({
				icon:'error',
				title:'遇到奇怪错误'
			})
		}
	}
</script>

<style>
	       
</style>
