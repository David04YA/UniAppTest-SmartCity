<template>
	<view>
		<button @click="bangcar">车辆绑定</button>
		<view>已绑定名单</view>
		<view v-for="item in carList" :key="item.id">
			<view>车牌号:{{item.plateNo}}</view>
			<view>车形:{{item.type}}</view>
			<view>发动机型号:{{item.engineNo}}</view>
			<button @click="deleteBangoCar(item.id)">删除</button>
			<button @click="changeBangoCar(item.id)">修改</button>
		</view>
	</view>
</template>
	
<script setup>
import { ref } from 'vue';
import { getRequest , getToken } from '../../../../../../utils/request';
import {onShow} from '@dcloudio/uni-app'

	const carList = ref();
	// const token = await getToken();


	const bangcar = ()=>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carManager/bangcar'
		})
	}
	
	const deleteBangoCar = (id)=>{
		const res =  getRequest({
			url:"/prod-api/api/traffic/car/"+id,
			method:'DELETE',
			header:{"Authorization": uni.getStorageSync('token') ,
					"Content-Type":"application/x-www-form-urlencoded"}
		})
		console.log(res)
		if(res.code == 200){
			uni.showToast({
				title:'删除成功',
			})
			getBangCarList()
		}
	}
	
	const getBangCarList = async ()=>{
		const res = await getRequest({
			url:"/prod-api/api/traffic/car/list",
			header:{"Authorization": await getToken(),
					"Content-Type":"application/x-www-form-urlencoded"}
		})
		// console.log(res)
		if(res.code == 200){
			carList.value = res.rows
			// console.log(carList.value)
		}
	}
	getBangCarList()
	
	const changeBangoCar = (id) =>{
		uni.navigateTo({
			url:'/pages/index/application/reserveCheckCar/main/carManager/changeCar?id='+id
		})
	}
	
	onShow(()=>{
		getBangCarList()
	})
</script>

<style>
	       
</style>
