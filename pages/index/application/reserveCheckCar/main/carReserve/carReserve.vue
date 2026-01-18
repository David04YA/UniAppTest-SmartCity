<template>
	<view>
		<view style="text-align: center;">已绑定车</view>
		<view v-for="item in bangoCarList" :key="item.id">
			<view>车牌号:{{item.plateNo}}</view>
			<view>车形:{{item.type}}</view>
			<view>发动机型号:{{item.engineNo}}</view>
			<button @click="choiceTime(item)">预约该车</button>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { getRequest , getToken } from '../../../../../../utils/request';
import { ref } from 'vue';

	// onLoad()
	const bangoCarList = ref()
	const getBangoCarList = async() =>{
		const res = await getRequest({
			url:"/prod-api/api/traffic/car/list",
			header:{"Authorization":await getToken(),
				'Content-Type':'application/x-www-form-urlencoded'},
		})
		console.log(res.rows)
		if(res.rows.lenght == 0 ){
			uni.navigateTo({
				url:'/pages/index/application/reserveCheckCar/main/carManager/carManager'
			})
		}
		if(res.code == 200){
			bangoCarList.value = res.rows
		}
	}
	getBangoCarList()
	// async ()=>{
	// 	const res = await getRequest({
	// 		url:"/prod-api/api/traffic/checkCar/apply",
	// 		method:'POST',
	// 		header:{"Authorization":await getToken(),
	// 			'Content-Type':'application/json'},
	// 	})
	// }
	
	const choiceTime = (car)=>{
		// console.log(car)
		uni.redirectTo({
			url:"/pages/index/application/reserveCheckCar/main/carReserve/addCheckCar?carId="+car.id
		})
	} 
</script>

<style>
	       
</style>
