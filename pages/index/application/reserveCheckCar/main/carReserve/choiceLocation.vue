<template>
	<view>
		<view class="" style="text-align: center;">
			你预约的车为：{{carid}}
		</view>
		<radio-group>
			<label class="radio" >
				<radio value="周一" @click="choiceInfo(1 ,'周一')"  name="week"/><text>周一</text>
				<radio value="周二" @click="choiceInfo(1 ,'周二️⃣')"  name="week"/><text>周二</text>
				<radio value="周三" @click="choiceInfo(1 ,'周三')"  name="week"/><text>周三</text>
				<radio value="周四" @click="choiceInfo(1 ,'周四')"  name="week"/><text>周四</text>
				<radio value="周五" @click="choiceInfo(1 ,'周五')"  name="week"/><text>周五</text>
			</label>
		</radio-group>			
		<radio-group>
				<label class="radio" >
					<radio value="上午" @click="choiceInfo(0 ,'上午')" name="day"/><text>上午</text>
					<radio value="下午" @click="choiceInfo(0 ,'下午')" name="day"/><text>下午</text>
				</label>
			</radio-group>
		<view v-for="item in checkCarPoint">
			<view>{{item.placeName}}</view>
			<view>{{item.remarks}}</view>
			<button @click="choice(item)":disabled="actBut" >选择这个</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  getRequest , { getToken } from '../../../../../../utils/request';
import {onLoad , onShow} from '@dcloudio/uni-app'

 	const carid =  ref()
	onLoad((id)=>{
		carid.value = id.carId
	})
	const actBut = ref(true)
	const checkCarPoint = 	ref([])
	const choiceDay = ref()
	const choiceTime = ref()
	const getCheckCarPonit = async()=>{
		const result = await getRequest({
			url:"/prod-api/api/traffic/checkCar/place/list",
			header:{"Context-Type":"application/json",
			"Authorization": await getToken()}
		})
		if(result.code == 200){
			checkCarPoint.value = result.rows
		}
		console.log(result)
	}	
	getCheckCarPonit()
	
	const choiceInfo = ( c , Info) =>{
		if(c == 1){
			choiceDay.value = Info
			console.log("choiceday:"+Info)
		}else{
			choiceTime.value = Info
			console.log("choiceTime:"+Info)
		}
		if(choiceDay.value != undefined && choiceTime.value != undefined){
			actBut.value = false
		}
	}
	
	const  choice =async(item)=>{
		const result = await  getRequest({
			url:"/prod-api/api/traffic/checkCar/apply",
			method:"POST",
			header:{"Context-Type":"application/json",
			"Authorization": await getToken()},
			data:{
				"carId":carid.value,
				"aptTime":"本周的"+choiceDay.value +"的"+choiceTime.value,
				"addressid":item.id
			}
		})
		if(result.code == 200){
			uni.navigateBack(-1)
			uni.showToast({
				title:"添加成功",
				icon:"success"
			})
		}else{
			uni.showToast({
				title:"添加失败",
				icon:"fail"
			})
		}
		console.log(result)
	}
</script>

<style>
	       
</style>
