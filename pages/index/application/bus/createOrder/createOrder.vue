<template>
	<view>
		<view style="text-align: center; font-weight: bold;">{{lineDetail.name}}</view>
		<view style="text-align: center; font-weight: bold;"> {{lineDetail.startTime}} - {{lineDetail.endTime}}</view>
		<view style="text-align: center; font-weight: bold;"> 全程价格:{{lineDetail.price}}</view>
		<view v-if="!selectStop">
			<view style="text-align: center;">请选择你的上车点</view>
			<button @click="setSelectStop(stopDetail[item].name , item)" v-for="item in itStopList(0,stopDetail.length-1)">{{stopDetail[item].name}}</button>
		</view>
		<view v-else >
			<view style="text-align: center;">您选择的上车点为:{{selectStop}}</view>
			<view v-if="!selectDownStop">
				<view style="text-align: center;">请选择你的下车点</view>
				<button @click="setSelectDownStop(stopDetail[item].name , item)" v-for="item in itStopList(startIndex+1,stopDetail.length) ">{{stopDetail[item].name}}</button>
			</view>
			<view v-else style="text-align: center;">您选择的下车点为:{{selectDownStop}}</view>
		</view>
		<button @click="sureCreateOrder" style="height: 50px ;position: absolute; bottom: 0; width: 100%;"  :disabled="!(selectStatus && selectDownStatus)">确定下单</button>
	</view>
</template>

<script setup>
	
	import {onLoad , } from '@dcloudio/uni-app'
	import { ref , onMounted  } from 'vue';
	import getrequest , { getToken } from '../../../../../utils/request';
	
	let busLineId;
	const stopDetail = ref()
	const lineDetail = ref()
	const selectStop = ref('')
	const selectDownStop = ref('')
	const selectStatus = ref(false)
	const selectDownStatus = ref(false)
	const stopTotal = ref()
	const price = ref()
	let startIndex;
	let endIndex;
	
	const getStopDetail = async() =>{
		const result = await getrequest({
			url:'/prod-api/api/bus/stop/list?linesId='+busLineId,
			header:{'Content-Type':"application/x-www-form-urlencoded"},
		})
		if(result.code == 200){
			stopDetail.value = result.rows
			// console.log(result)
			stopTotal.value = result.total
		}
	}
	
	const getLineDetail = async() =>{
		const result = await getrequest({
			url:"/prod-api/api/bus/line/"+busLineId,
			header:{"Content-Type":"application/x-www-form-urlencoded"}
		})
		// console.log(result)
		if(result.code == 200){
			lineDetail.value = result.data
		}
		console.log(lineDetail.value)
	}
	
	const setSelectStop = (stopName , startStop) => {
		selectStop.value = stopName
		startIndex = startStop
		selectStatus.value = true
	}
	
	const setSelectDownStop = (stopName , endStop) =>{
		selectDownStop.value = stopName
		endIndex = endStop
		selectDownStatus.value = true
	}
	
	const itStopList = (start , end)=>{
		let list = []
		for (var i=(start) ; i < end ; i++){
			list.push(i)
		}
		return list
	}
	
	const sureCreateOrder = ()=>{
		price.value = Math.floor((lineDetail.value.price / (stopTotal.value-1))*(endIndex - startIndex) ,2)
		uni.showModal({
			title:"确定下单吗?",
			content:"计算的价格为:"+ price.value,
			showCancel:true,
			cancelText:'我在考虑一下',
			confirmText:'确定下单',
			success(res) {
				if(selectStop.value != '' && selectDownStop.value != '' && !(price.value.isNaN)){
					const res = createOrders()
					console.log(res)
				}else{
					uni.showToast({
						icon:'error',
						title:'未选择站点下单',
					})
				}
			},
			fail() {
				uni.showToast({
					icon:'error',
					title:"请返回重新下单"
				})
			}
		
		})
	}
	
	const createOrders = async ()=>{
		const result = await getrequest({
			url:'/prod-api/api/bus/order',
			method:'POST',
			header:{'Content-Type': "application/json" ,
					"Authorization": await getToken() },
			data:{
				"start":selectStop.value,
				"end":selectDownStop.value,
				"path":lineDetail.value.name,
				"price":price.value
			}
		})
		console.log(result)
	}
		
		
	onLoad((options)=>{
		busLineId = options.id
	})
	
	onMounted(()=>{
		getStopDetail()
		getLineDetail()
	})
	
</script>

<style>
	       
</style>
